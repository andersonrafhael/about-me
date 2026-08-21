# Runbook — Deploy e Infraestrutura

Site: `andersonrafhael.requiemcompany.com.br` · **Cloudflare Workers (static assets)**, mesmo
padrão de `sigma-site` e `requiem-company-site`. Repositório **público** — nenhum IP, token,
`account_id` ou segredo literal entra em `wrangler.jsonc`, `.github/` ou aqui. Use placeholders
(`<ACCOUNT_ID>`, `<TOKEN>`) em qualquer exemplo.

## Arquitetura

- `next build` com `output: "export"` gera o site inteiro em `out/` (HTML por rota, payloads RSC
  `.txt`, `_next/static/*` com hash, `feed.xml`, `llms.txt`, `sitemap.xml`, `robots.txt`,
  `manifest.webmanifest`, ícones e imagens Open Graph pré-renderizadas por projeto/artigo).
- `wrangler.jsonc` declara um Worker **sem script** (`andersonrafhael-site`): só `assets.directory:
  ./out`. Requisições a assets não invocam Worker — não contam para o limite de invocações do
  plano gratuito e não geram Workers Logs.
- `html_handling: auto-trailing-slash` serve `/projetos` → `projetos.html` e `/projetos/sigma` →
  `projetos/sigma.html`; formas com barra final ou `.html` redirecionam (307) para a canônica — a
  mesma que `src/lib/seo.ts` emite em `<link rel="canonical">` (sem barra final).
- `not_found_handling: 404-page` serve `out/404.html` (vindo de `src/app/not-found.tsx`) com
  status 404.
- O export não aplica `headers()`/`redirects()` do `next.config.ts`. Eles vivem em
  `public/_headers` (CSP, HSTS, nosniff, DENY, Referrer-Policy, Permissions-Policy; cache imutável
  em `/_next/static/*`; `Content-Type: image/png` nas rotas de imagem sem extensão; `Content-Type`
  do RSS) e `public/_redirects` (`/projetos/sgtu` → `/projetos/unipass` 308, DEC-011;
  `/projetos/tela-brasil` → `/projetos` 307). O build copia os dois para `out/`; o wrangler os
  interpreta e **não** os publica como arquivos.
- **DNS e certificado são criados pelo deploy**: `routes: [{ pattern, custom_domain: true }]`
  faz o `wrangler deploy` registrar o hostname na zona `requiemcompany.com.br` e emitir o
  certificado. Não há registro A, origin, Traefik nem porta 80 para cuidar.

## (a) Deploy manual (`npm run deploy`)

Pré-requisitos: sessão `npx wrangler login` válida na máquina (conta Anderson; escopos padrão do
login cobrem Workers, rotas, zona e certificados — não existe escopo de DNS separado no OAuth do
wrangler) e gate verde:

```bash
npm run quality                       # tsc + eslint + next build (gera out/)
npm test                              # Playwright contra `wrangler dev` em :3001
node scripts/gauntlet/check.mjs       # Lighthouse + axe + contrato HTML + teclado + links
npm run deploy                        # = next build && wrangler deploy
```

Na **primeira publicação**, se o hostname já tiver um registro DNS (ex.: o antigo A para o VPS),
o wrangler pergunta `You already have DNS records that conflict for these Custom Domains …
Update them?`. Responder **sim** é o cutover — o registro antigo é substituído pelo Custom
Domain. Em terminal não interativo (CI) a substituição acontece **sem perguntar**. Anote o valor
do registro anterior fora do repositório (vault) antes do primeiro deploy, para reverter o DNS
manualmente se precisar.

Checagem sem publicar: `npm run cf:check` (`wrangler deploy --dry-run` — valida config e lê o
diretório de assets, não exige login). Pré-visualização local fiel à produção: `npm run preview`
(`wrangler dev --port 3001`).

## (b) Deploy por GitHub Action (`.github/workflows/deploy.yml`)

- Job `quality` (`npm ci && npm run quality`): roda em todo `pull_request` e em push na `main`.
- Job `deploy`: só em push na `main`, depois de `quality`. Se os secrets não existirem, o job
  termina com um `::notice` **sem falhar** — o deploy manual continua sendo o caminho válido.

**Secrets** (Settings → Secrets and variables → Actions):

| Secret                  | Conteúdo                                                                 |
| ----------------------- | ------------------------------------------------------------------------ |
| `CLOUDFLARE_API_TOKEN`  | Token de API escopado (abaixo)                                           |
| `CLOUDFLARE_ACCOUNT_ID` | ID da conta Cloudflare (Workers & Pages → Overview, coluna direita)      |

Token (Cloudflare → My Profile → API Tokens → Create Token → Custom):

| Escopo  | Permissão               | Motivo                                             |
| ------- | ----------------------- | -------------------------------------------------- |
| Account | Workers Scripts — Edit  | publicar versões do Worker e os assets             |
| Zone    | DNS — Edit              | criar/atualizar o Custom Domain na zona            |
| Account | Account Settings — Read | o wrangler resolve a conta e valida o token        |

Restringir o token à conta e à zona `requiemcompany.com.br`. `permissions: contents: read` no
workflow; `concurrency: deploy-production` evita dois deploys simultâneos.

## (c) Rollback

Cada `wrangler deploy` cria uma versão (assets incluídos). Reverter:

```bash
npx wrangler versions list                 # ids e datas das versões publicadas
npx wrangler rollback <VERSION_ID>         # ou sem id: volta à versão anterior à atual
npx wrangler deployments status            # confirma a versão ativa
```

Alternativa por Git: `git revert` na `main` + novo deploy (manual ou pela Action).

## (d) Verificação pós-deploy

```bash
dig +short andersonrafhael.requiemcompany.com.br      # resolve para anycast Cloudflare
curl -sI https://andersonrafhael.requiemcompany.com.br                      # HTTP/2 200 + CSP/HSTS/nosniff/DENY
curl -sI https://andersonrafhael.requiemcompany.com.br/projetos/sgtu        # 308 → /projetos/unipass
curl -sI https://andersonrafhael.requiemcompany.com.br/projetos/sigma/opengraph-image  # 200 image/png
curl -sI https://andersonrafhael.requiemcompany.com.br/nao-existe           # 404 (página própria)
node scripts/gauntlet/check.mjs --base=https://andersonrafhael.requiemcompany.com.br   # barra completa na URL pública
```

Depois do primeiro deploy, remover o Custom Domain não apaga o certificado emitido
(SSL/TLS → Edge Certificates) — limpeza manual se o domínio for desativado um dia.
