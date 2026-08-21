# Runbook — Deploy e Infraestrutura

Site: `andersonrafhael.requiemcompany.com.br` · VPS compartilhada com `sigma` e `unipass`,
via Docker + Traefik. Repositório **público** (`andersonrafhael/about-me`) — nenhum IP ou
segredo literal deve entrar em `infra/`, `.github/` ou aqui. Use `<IP_DO_VPS>` como
placeholder em qualquer exemplo.

## Estado atual (2026-08-21)

O site **nunca esteve no ar publicamente**: o registro DNS
`andersonrafhael.requiemcompany.com.br` não existe na zona Cloudflare (NS
`ainsley.ns.cloudflare.com` / `chase.ns.cloudflare.com`). O VPS já responde HTTP 200
quando se força a resolução para o IP (`curl --resolve`) — ou seja, **o app está saudável,
falta só o registro DNS**. `sigma` e `unipass`, no mesmo VPS, já são registros A
_proxied_ (nuvem laranja) e funcionam.

---

## (a) DNS — criar o registro na Cloudflare

1. Acesse o painel Cloudflare do domínio `requiemcompany.com.br`.
2. **DNS → Records → Add record**:
   - Tipo: `A`
   - Nome: `andersonrafhael`
   - Conteúdo: `<IP_DO_VPS>`
   - Proxy status: **Proxied** (nuvem laranja) — mesmo padrão de `sigma` e `unipass`.
   - TTL: Auto
3. **SSL/TLS → Overview**: modo **Full (strict)**.
   - "Full (strict)" exige certificado válido no origin (o Let's Encrypt do Traefik cobre
     isso) — não use "Flexible", que quebra o redirect HTTPS do Traefik.
4. **Importante — HTTP-01 challenge**: o Traefik emite o certificado Let's Encrypt via
   desafio HTTP-01, que precisa da **porta 80 aberta e respondendo no origin** durante a
   emissão/renovação. Com o proxy da Cloudflare ativo, a porta 80 do VPS ainda precisa
   estar liberada no firewall para o desafio funcionar (a Cloudflare repassa a validação).
5. Validar propagação:
   ```
   dig @one.one.one.one andersonrafhael.requiemcompany.com.br
   ```
   Deve retornar o IP anycast da Cloudflare (proxy ativo) em minutos, não o `<IP_DO_VPS>`
   diretamente — isso é esperado com proxy ligado.

---

## (b) Deploy manual (`infra/deploy.sh`)

```bash
VPS_HOST=usuario@<IP_DO_VPS> \
APP_DOMAIN=andersonrafhael.requiemcompany.com.br \
bash infra/deploy.sh
```

Variáveis opcionais: `VPS_IP` (para diagnosticar "DNS ausente" vs "app fora" via
`--resolve`, sem depender do DNS público), `REMOTE_DIR` (default `/opt/andersonrafhael`),
`GIT_REF` (default `main`).

O script: checa DNS → checa pré-condições na VPS (rede `infra_sigma-network` e Traefik
`running`) → `git fetch --all && git reset --hard origin/$GIT_REF` (tolera force-push e
rebase, diferente de `git pull`) → `docker compose up --build -d` → healthcheck (6
tentativas × 5s) → imprime o commit implantado.

## (c) Deploy por GitHub Action (`.github/workflows/deploy.yml`)

Dispara em push para `main` ou manualmente (`workflow_dispatch`, input `ref`).

**Secrets a criar** (Settings → Secrets and variables → Actions):

| Secret            | Conteúdo                                 | Obrigatório |
| ----------------- | ---------------------------------------- | ----------- |
| `VPS_HOST`        | `usuario@<IP_DO_VPS>`                    | Sim         |
| `VPS_SSH_KEY`     | Chave privada ed25519 dedicada ao deploy | Sim         |
| `VPS_KNOWN_HOSTS` | Saída de `ssh-keyscan -H <IP_DO_VPS>`    | Sim         |

`VPS_KNOWN_HOSTS` é obrigatório e **não tem fallback**: o workflow não roda mais
`ssh-keyscan` durante o deploy (isso equivaleria a confiar cegamente na primeira conexão
— TOFU sem verificação, o próprio risco que `StrictHostKeyChecking=yes` existe para
evitar). Gerar o valor uma única vez, fora do CI, e conferir a fingerprint por um canal
independente (ex.: console da VPS) antes de colar no secret:

```bash
ssh-keyscan -H <IP_DO_VPS>
```

Gerar e autorizar a chave dedicada:

```bash
ssh-keygen -t ed25519 -C deploy-andersonrafhael -f ~/.ssh/deploy-andersonrafhael
# cole o conteúdo de deploy-andersonrafhael.pub em ~/.ssh/authorized_keys do usuário
# de deploy na VPS; cole o conteúdo de deploy-andersonrafhael (chave privada) no
# secret VPS_SSH_KEY do GitHub.
```

Sem `VPS_HOST`/`VPS_SSH_KEY`/`VPS_KNOWN_HOSTS`, o job falha logo no primeiro step com
mensagem explícita (não falha silenciosamente nem tenta conectar sem credencial).

O job roda o gate de qualidade (`npm run quality` = `tsc --noEmit && eslint . --max-warnings 0 &&
next build`) **antes** de qualquer passo SSH — build quebrado nunca chega a tocar a VPS.
`concurrency: deploy-production` com `cancel-in-progress: false` garante que dois deploys
não se sobrepõem (a fila espera, não cancela um deploy em andamento). O workflow declara
`permissions: contents: read` no topo (o job só precisa ler o repositório).

Depois de configurar SSH (chave + `known_hosts` fixado via `~/.ssh/config`, sempre
`StrictHostKeyChecking yes`), o job chama `bash infra/deploy.sh` diretamente — o mesmo
script do deploy manual (seção b), com `VPS_HOST`/`VPS_IP`/`APP_DOMAIN`/`REMOTE_DIR`/
`GIT_REF` passados como variáveis de ambiente. Isso elimina a duplicação que existia
antes (pré-voo, deploy e healthcheck reimplementados em heredocs no workflow): a lógica
de DNS-aviso-vs-app-fora e o healthcheck só existem uma vez, no script.

## (d) Rollback

Manual:

```bash
VPS_HOST=usuario@<IP_DO_VPS> bash infra/deploy.sh --rollback
```

Via Action (sem precisar de acesso SSH local): Actions → workflow **Deploy** → **Run
workflow** → marcar o input `rollback` como `true`. O job monta o mesmo SSH já usado no
deploy normal e roda `bash infra/deploy.sh --rollback` — é o mesmo caminho de código do
rollback manual, sem lógica duplicada no workflow.

Lê `/opt/andersonrafhael/.last-deploy` (gravado a cada deploy bem-sucedido, com o commit
que estava em produção **antes** do deploy atual), faz checkout desse commit e reconstrói
o container. Se `.last-deploy` não existir, o script falha com mensagem clara — não há
commit anterior registrado para reverter.

Todo deploy (manual ou via Action) imprime o commit anteriormente em produção antes de
sobrescrever — é a linha de log a consultar em caso de incidente.

## (e) Checklist pós-incidente de reboot

Registrado o incidente de 2026-06-08: após reboot do VPS, o `nginx` do host (systemd)
tomou a porta `:80` antes do Traefik subir, derrubando `sigma`, `unipass` e (quando
existir) `andersonrafhael` com HTTP 522. Fix aplicado na hora:
`systemctl stop nginx && docker start traefik`.

Checklist a rodar sempre que a VPS reiniciar:

```bash
systemctl is-enabled nginx   # deve ser: disabled
docker ps                    # deve listar 'traefik' com status Up
```

Se `nginx` aparecer como `enabled`, rodar `systemctl disable nginx` para eliminar a
recorrência — o risco só existe enquanto o serviço concorrente estiver habilitado no
boot.

## (f) Verificação pós-deploy

```bash
curl -sI https://andersonrafhael.requiemcompany.com.br            # esperado: HTTP/2 200
curl -sI https://andersonrafhael.requiemcompany.com.br/sitemap.xml # esperado: HTTP/2 200
node scripts/gauntlet/check.mjs                                    # barra local (E2E/gauntlet)
```

Enquanto o DNS não existir (seção a), os dois primeiros comandos falham por resolução de
nome, não por o app estar fora — para confirmar a distinção, use
`curl --resolve andersonrafhael.requiemcompany.com.br:443:<IP_DO_VPS> ...` ou
`VPS_IP=<IP_DO_VPS>` no `deploy.sh` (seção b), que faz esse diagnóstico automaticamente.

---

## Nota de arquitetura — por que o Dockerfile copia `src/content`

`src/lib/posts.ts` lê os arquivos MDX de `src/content/posts/` via `fs.readdirSync` /
`fs.readFileSync` em tempo de execução (não só em build) — consumido por
`src/app/escrita/page.tsx`, `src/app/escrita/[slug]/page.tsx` e `src/app/sitemap.ts`. Mesmo
com páginas geradas estaticamente no build, manter a cópia
`COPY --from=builder /app/src/content ./src/content` no estágio `runner` do Dockerfile
evita quebra em runtime (ISR, revalidação futura, ou qualquer rota que passe a ler o
conteúdo sob demanda). Removê-la é uma otimização de tamanho de imagem que só é segura se
todo o acesso a `src/content` for auditado e comprovadamente build-time only.
