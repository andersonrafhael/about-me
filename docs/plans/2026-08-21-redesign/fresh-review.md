# Fresh-Context Review — Redesign completo (andersonrafhael.requiemcompany.com.br)

**Data:** 2026-08-21
**Diff:** working tree vs `HEAD` (`8b7c594`) — 90 arquivos, ~10,7k linhas (`/tmp/feature-diff.txt`)
**Revisado por:** Claude (sessão fresh, sem contexto de implementação)
**Âncora de evidência:**

| Âncora                                  | Comando                                       | Resultado                                                             |
| --------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------- |
| Gate mecânico                           | `npm run quality` (tsc + eslint + next build) | **EXIT=0** · 29 rotas geradas, zero erro/warning                      |
| Gauntlet (Classe A do contrato de loop) | `node scripts/gauntlet/check.mjs --no-build`  | **RESULT: PASS · EXIT=0** · 19 rotas, 0 falhas, 2 warnings (rodada 3) |
| Gauntlet rodada anterior                | idem                                          | **FAIL · EXIT=1** · 8 falhas de Lighthouse mobile                     |
| Playwright                              | `npx playwright test`                         | **EXIT=1** · 36 passaram, 2 falharam, 2 skipped                       |
| Outcomes 5–9 (grep/git)                 | reexecutados nesta sessão                     | todos **PASS**                                                        |
| Outcome 10 (push)                       | `git rev-parse HEAD` vs `origin/main`         | **FAIL** — `8b7c594` ≠ `2cc8c9f`                                      |

**Classe de gate:** B (probabilístico) — todo achado abaixo é **WARNING**, nunca BLOCKER.
"Bloqueador" na seção final significa _o humano deve olhar antes do merge_, não _impede o build_.

> Cada achado carrega `[CONFIRMED]` (sustentado por âncora externa à minha leitura) ou
> `[PLAUSIBLE]` (só leitura de código).

---

## 1. Spec Compliance

**Veredicto: PASS com 4 divergências.** O grosso da spec foi entregue e verificado
mecanicamente. As constraints §3 estão implementadas no data layer com rigor incomum — papéis
por grupo (`requiem` → fundador/arquiteto, `nees` → gerente de produto + `institution`), nenhum
município nomeado como implantado ("uma capital do Nordeste", e o texto explicita _"sem contrato
publicado, o número honesto é zero"_), CIRIS só em `otherWork` como "em concepção", Lattes
removido em vez de inventado, `research.ts` com ICSE-SEIP 2027 no lugar do SBES.

### Outcomes machine-checkable (reexecutados)

| #   | Critério                                                           | Resultado                                                               |
| --- | ------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| 1   | `npm run quality`                                                  | **PASS** (EXIT=0)                                                       |
| 2   | Gauntlet                                                           | **PASS** (EXIT=0, rodada 3)                                             |
| 3   | Contrato de loop                                                   | não reexecutado nesta sessão — `verify.md` registra `LOOP CONTRACT: OK` |
| 4   | Playwright                                                         | **FAIL** (EXIT=1) — ver §Silent Errors / footer                         |
| 5   | Sem IP literal em `infra`/`.github`                                | **PASS**                                                                |
| 6   | `@ybouane/liquidglass`, `framer-motion`, `patch-package` removidos | **PASS**                                                                |
| 7   | Tela Brasil ausente                                                | **PASS** (zero ocorrências em `src/data`, `src/app`, `src/components`)  |
| 8   | Domínios mortos não linkados                                       | **PASS**                                                                |
| 9   | `sgtu` → `unipass`                                                 | **PASS** (308 permanente)                                               |
| 10  | Push feito                                                         | **FAIL** — a feature inteira está **não-commitada** na working tree     |

### Divergências

**1.1 [CONFIRMED] `src/content/posts/rag-em-sistemas-com-compliance.mdx` nomeia o HCA.**
Duas ocorrências de **"Hospital do Coração Alagoano"**, uma delas descrevendo o SGDI como
_"desenvolvido com o Hospital do Coração Alagoano"_. A constraint §3.5 é explícita: _"HCA não é
cliente — 'hospital público parceiro do piloto'"_. O `src/data/projects.ts` cumpre a regra
("Piloto com hospital público parceiro, em Maceió · arranjo via IC/UFAL"); o artigo publicado
não. O artigo está no `sitemap.xml`, no `feed.xml` e é uma das 4 peças em destaque — é superfície
viva, não rascunho. `src/content/posts/` não foi tocado pelo redesign, o que explica como
sobreviveu, mas §9 põe fora de escopo _escrever novos ensaios_, não _deixar uma constraint
violada num ensaio existente_.

**1.2 [CONFIRMED] `src/data/metrics.ts` ainda contém as duas strings que §7 mandou remover.**
O arquivo tem `{ value: "R$2,98bi", label: "em políticas culturais geridas" }` e
`{ value: "4", label: "papers publicados" }` — literalmente as duas linhas da tabela de correções
obrigatórias. **Zero consumidores** (grep por `data/metrics` em todo `src/` retorna vazio), então
nada disso é renderizado. Mas o arquivo permanece no repositório **público**, sem consumidor e
sem correção — dívida sem função. O correto é deletar o arquivo, não corrigi-lo: as duas
afirmações já vivem, com fonte e papel, em `projects.ts` (CultBR) e `research.ts`.

**1.3 [CONFIRMED] Decisão D5 não entregue: as imagens OG por rota são código morto.**
`src/app/projetos/[slug]/opengraph-image.tsx` (4.563 B) e
`src/app/escrita/[slug]/opengraph-image.tsx` (3.019 B) existem, compilam e aparecem na árvore de
build (`ƒ /projetos/-/opengraph-image`), mas **nenhuma página as referencia**. Evidência no HTML
construído:

```
.next/server/app/projetos/sigma.html   → og:image = .../opengraph-image
.next/server/app/escrita/cultbr-....html → og:image = .../opengraph-image
.next/server/app/index.html            → og:image = .../opengraph-image?ccac167edf33da65
```

Causa: `pageMetadata()` (`src/lib/seo.ts:35`) sempre injeta
`images: [{ url: "/opengraph-image", ... }]`, e no Next metadata declarada no objeto **vence** a
convenção de arquivo. A home é a única rota que não passa por `pageMetadata()` — por isso é a
única com o hash da convenção de arquivo. Resultado: todo projeto e todo artigo compartilha a
mesma imagem social genérica. D5 prometia "OG por rota (+ por projeto e por artigo)".

**1.4 [CONFIRMED] Outcome 10 pendente e Playwright vermelho.** A feature está inteiramente
não-commitada (`git status` mostra 90 caminhos modificados/adicionados) e `origin/main` está dois
commits atrás. Isso é estado esperado de um review pré-commit — registro só para que o
`verify.md` não seja fechado como PASS antes de os dois critérios virarem verdes.

**YAGNI:** nada implementado fora da spec, exceto os dois `opengraph-image.tsx` do item 1.3 —
que são escopo da spec, apenas não conectados.

---

## 2. Silent Errors

**2.1 [CONFIRMED] `posts.ts` faz cast sem validação; data malformada vira `Invalid Date` em
silêncio.** `getAllPosts()` retorna `data as Post` direto do frontmatter, sem checar campo algum.
Consequências em cadeia, todas silenciosas:

- `feed.xml/route.ts:17` → `new Date(\`${date}T00:00:00Z\`).toUTCString()`→`"Invalid Date"`dentro de`<pubDate>`, gerando RSS sintaticamente válido e semanticamente quebrado;
- `sitemap.ts:32` → `lastModified: new Date(post.date)` → mesma coisa;
- `getAllPosts().sort()` compara `NaN` → ordem indefinida, e `getAdjacentPosts` navega errado.

Nenhum teste exercita frontmatter inválido. Um `zod` de 8 linhas no boundary, ou um `throw` com
o nome do arquivo, converte quatro falhas silenciosas numa falha de build legível.

**2.2 [CONFIRMED] O diagnóstico de falha de Lighthouse do gauntlet é sempre vazio.**
`check.mjs:345-348` monta a lista `failing` filtrando `x.scoreDisplayMode === "binary"`, mas as
auditorias de performance são `numeric`. O log da rodada 2 prova:

```
✗ [lighthouse / [mobile]] performance 86 < 90 (failing: )
```

Oito falhas, zero pistas. Quem for depurar a próxima regressão de performance vai olhar para uma
lista vazia. Trocar o filtro por `score !== null && score < 0.9` (sem a cláusula de
`scoreDisplayMode`) resolve.

**2.3 [CONFIRMED] O retry de Lighthouse enviesa o gate para cima.** `check.mjs:363-367` só
reexecuta quando a primeira medição fica **abaixo** do threshold, e então **fica com a melhor das
duas**. Nunca reexecuta quando passa. Isso é best-of-2 assimétrico dentro do
`exit_predicate` declarado como Classe A. Um `/` que oscila entre 88 e 91 passa quase sempre.
O honesto é mediana de N execuções, ou retry simétrico. (Registro para calibrar expectativa: a
diferença entre a rodada 2 FAIL e a rodada 3 PASS **não** é ruído — `src/app/layout.tsx` e
`src/assets/fonts/Inter-Variable.woff2` mudaram entre as duas, e `.next/BUILD_ID` é posterior ao
`layout.tsx`, então o PASS da rodada 3 atesta o código atual. O viés do retry é um defeito de
desenho do gate, não uma acusação contra esta rodada.)

**2.4 [PLAUSIBLE] `infra/deploy.sh` reporta sucesso com o app fora do ar, sempre que o DNS
falta.** Linhas 147-149: se o healthcheck não devolve 200 **e** `DNS_OK == false`, o script
imprime _"não é falha de deploy"_ e sai com 0. O `verify.md` registra que o DNS **não existe hoje**
("NÃO OBSERVÁVEL nesta sessão: registro DNS inexistente") — ou seja, esse é o caminho vivo, não
o hipotético. A sonda que separaria "DNS ausente" de "app fora" (`curl --resolve` com `VPS_IP`)
existe, mas roda no **passo 1, antes do deploy**, e só quando `VPS_IP` é passado. Correção
barata: repetir a sonda `--resolve` no passo 4 quando `DNS_OK == false`, e falhar se ela não
responder.

**2.5 [PLAUSIBLE] `deploy.sh:133` mata o script antes do healthcheck se o marcador sumir.**
`DEPLOYED_COMMIT="$(echo "$DEPLOY_OUTPUT" | grep '^COMMIT_IMPLANTADO=' | cut -d= -f2)"` sob
`set -euo pipefail`: se o `grep` não casar, a substituição falha, o `set -e` derruba o script — e
o fallback defensivo `${DEPLOYED_COMMIT:-desconhecido}` da linha 158 é **inalcançável**. O autor
escreveu a defesa certa no lugar que nunca executa. Sufixar `|| true` na atribuição faz a defesa
funcionar.

**2.6 [PLAUSIBLE] A Action vai ficar vermelha em todo push enquanto o DNS não existir.**
`deploy.yml:124-126` faz `exit 1` quando o healthcheck não devolve 200 — inclusive quando a
própria mensagem de erro reconhece que _"se o DNS ainda não aponta para a VPS, isso é esperado"_.
As duas camadas do D6 divergem sobre a mesma condição: `deploy.sh` tolera, a Action falha. Na
prática, `main` nasce vermelha e a equipe (de um) aprende a ignorar o ❌ — que é como um gate
morre. Escolher um comportamento e aplicar aos dois.

**2.7 [PLAUSIBLE] `ssh-keyscan` neutraliza o `StrictHostKeyChecking=yes`.**
`deploy.yml:72-76`: sem o secret `VPS_KNOWN_HOSTS`, o workflow faz `ssh-keyscan -H "$VPS_HOSTNAME"`
e confia em quem responder — TOFU a cada execução, o oposto do que `StrictHostKeyChecking=yes`
promete duas linhas adiante. Pior: o `2>/dev/null` engole a falha do keyscan, então um DNS
sequestrado ou um host fora do ar produz um `known_hosts` vazio e um erro de SSH confuso lá na
frente. Repositório é público e a chave de deploy é real. `VPS_KNOWN_HOSTS` deveria ser
obrigatório junto com `VPS_HOST`/`VPS_SSH_KEY` no passo "Checar secrets".

**2.8 [PLAUSIBLE] `check.mjs` não tem `try/finally` em torno do laço Playwright.** Uma exceção
em `page.evaluate` (linha 161, o scroll) ou no `addScriptTag` do axe aborta o processo sem
escrever `reports/latest.json`. A rodada some sem deixar evidência, e o `process.on("exit")` só
mata o servidor. Envolver o laço num `finally` que escreve o relatório parcial preserva o
diagnóstico do caso mais interessante — o que quebrou.

**2.9 [PLAUSIBLE] `clampDescription` (`seo.ts:53-57`) corta um caractere a mais no pior caso.**
Se o recorte não contém espaço, `cut.lastIndexOf(" ")` devolve `-1` e `cut.slice(0, -1)` remove o
último caractere em vez de devolver o recorte inteiro. Só afeta descrição de palavra única com
+158 caracteres. Cosmético, mas o `-1` está lá sem guarda.

**2.10 [PLAUSIBLE] `Reveal` usa `ref={ref as never}` (`reveal.tsx:66`).** O `ui-spec.md` proíbe
`any`; `never` é a mesma válvula de escape com outro nome, e silencia uma incompatibilidade real
entre `RefObject<HTMLElement>` e o ref polimórfico de `ElementType`. Sem risco em runtime hoje —
registro porque é o tipo de cast que sobrevive a um refactor e passa a mentir.

---

## 3. Invented Relationships

**3.1 [CONFIRMED] O JSON-LD declara Anderson como `creator` dos projetos do NEES.** Extraído do
HTML construído:

```
/projetos/cultbr      creator = {@id: .../#person}   additionalProperty = "Gerente de produto do módulo de Gestão…"
/projetos/spte-iafree creator = {@id: .../#person}   additionalProperty = "Gerente de produto"
/projetos/sigma       creator = {@id: .../#person}   additionalProperty = "Fundador, arquiteto e product owner"
```

O grafo estruturado é **idêntico** para o Sigma (onde ele é criador) e para o CultBR (onde não
é). A prosa visível cumpre a DEC-009; a camada legível por máquina — a que o Google, um agregador
ou uma checagem automatizada de jornalista consome — afirma autoria. `creativeWork()`
(`json-ld.ts:143-144`) emite `creator` **e** `contributor` apontando para a mesma pessoa em todos
os 9 projetos, incondicionalmente.

Esta é a inconsistência exata que o redesign existe para eliminar (§1: _"atribui ao autor
métricas de projetos em que ele é gerente de produto"_), sobrevivendo num canal que a revisão de
prosa não alcança. Correção: ramificar por `project.group` — `nees` emite
`contributor` + `sourceOrganization: institution`, sem `creator`; `requiem`/`infra` emitem
`creator`.

**3.2 [CONFIRMED] JSON-LD e `og:image` discordam sobre a imagem do artigo.**
`blogPosting()` (`json-ld.ts:124`) declara
`image: "${site.url}/escrita/${slug}/opengraph-image"` — a imagem por artigo, que existe e
resolve. A meta tag `og:image` da mesma página aponta para `/opengraph-image` (raiz). Dois canais
de metadado, duas respostas. Some junto com o item 1.3.

**3.3 [PLAUSIBLE] `rootGraph()` dá ao site pessoal a `url` da Requiem Company.**
`json-ld.ts:58` emite `Organization.url = site.url`. A DEC-017 diz que **não há** site
institucional canônico — e a constraint §6 tirou `requiemcompany.com.br` de todos os links
justamente por isso. Declarar em schema.org que o site pessoal _é_ o site da organização
reintroduz por metadado a afirmação que a prosa removeu. Omitir `url` da `Organization` é mais
honesto que apontá-la para o perfil pessoal.

---

## 4. Repeated Logic

**4.1 [CONFIRMED] Sete páginas repetem breadcrumb + trilha + dois blocos JSON-LD à mão.**
`pesquisa`, `sobre`, `escrita`, `escrita/[slug]`, `projetos`, `projetos/[slug]` e `contato` cada
uma contém: dois `<script type="application/ld+json">` inline, um `<nav aria-label="Trilha">` com
markup idêntico (mesmas classes, mesmo `<span className="text-muted-2" aria-hidden>/</span>`), e
um `<header>` com a mesma grade `md:grid-cols-[1fr_auto]`. Sete consumidores é muito além do
limiar de dois.

O agravante é que o `ui-spec.md` **prescreve** o bloco como esqueleto de copiar-e-colar. A
duplicação não é descuido dos subagents — é o contrato que a institucionalizou. Um
`<PageShell breadcrumb={[…]} title=… lede=… jsonLd={[…]} />` remove ~40 linhas por página,
elimina sete lugares onde o `aria-hidden` do separador pode ser esquecido, e transforma o §Esqueleto
do ui-spec numa importação em vez de um transplante.

**4.2 [CONFIRMED] `posts.ts` tem o mesmo laço de leitura três vezes.** `getAllPosts`,
`getPostBySlug` e `getPostContent` cada uma faz `readdirSync` → ler todos os arquivos →
`matter()`. `escrita/[slug]/page.tsx` chama quatro dessas funções por render
(`getPostBySlug`, `getPostContent`, `getAdjacentPosts`, `getAllPosts`) → ~16 leituras de disco
por página. É build-time, então o custo é irrelevante; o problema é que a regra de parsing existe
em três cópias que podem divergir, e `getPostContent(slug)` relê tudo para pegar um campo que
`getPostBySlug` já tinha em mãos. Um `readPosts()` com cache de módulo e um `getPost(slug)` que
devolve `{ data, content }` colapsa os três.

**4.3 [PLAUSIBLE] O pré-voo do Traefik existe duplicado em `deploy.sh` e `deploy.yml`.**
`deploy.sh:84-98` e `deploy.yml:83-95` são quase byte a byte o mesmo heredoc (checar
`infra_sigma-network`, checar `traefik` running). Uma correção num não chega no outro. Como a
Action já faz `checkout` do repo, ela poderia chamar `bash infra/deploy.sh` e ficar com uma única
implementação — que também resolveria a divergência de comportamento do item 2.6.

---

## 5. Last-20% Gaps

Priorizado — o que muda decisão primeiro.

**5.1 [CONFIRMED] Seis scripts de rascunho vão entrar no repositório público.**
`nav.mjs`, `net.mjs`, `post.mjs`, `scroll.mjs`, `scroll2.mjs`, `shot.mjs` (116 linhas somadas) na
raiz. `git status --porcelain` mostra os seis como ` A` (intent-to-add) e `git check-ignore` não
casa com nenhum — então um `git commit -a` os publica. São sondas de depuração com
`localhost:3001` cravado e escrita em `process.env.TMPDIR`. A constraint §7 abre com
_"Repositório é público"_. Deletar, ou mover para `scripts/gauntlet/` (que já está no
`.gitignore` junto com `debug-reveal.mjs`, `debug-reveal2.mjs` e `debug-sigma.mjs`, corretamente
ignorados dentro de `reports/`).

**5.2 [CONFIRMED] CLS acima do limiar de "bom" passa pelo gauntlet sem ser notado.** Rodada 3:
`/escrita/sdd-spec-driven-development` mobile **CLS 0.134** e `/projetos/sigma` mobile
**CLS 0.102** — os dois acima de 0,1, a fronteira do "good" em Core Web Vitals. O
`thresholds.json` só gateia as quatro notas de categoria; nenhum limite de LCP/CLS/TBT. Como a
nota de performance agrega tudo, um CLS ruim é absorvido por um TBT ótimo e o gate fica verde. O
`design.md` §3.9 definiu a barra assim, então é lacuna de spec, não bug — mas o campo (CrUX) vai
medir CLS diretamente, e o `verify.md` já declara o risco "Lighthouse de laboratório ≠ campo".
Adicionar `"metrics": { "cls": 0.1, "lcp": 2500 }` ao `thresholds.json` fecha a lacuna com três
linhas.

**5.3 [CONFIRMED] Dois títulos acima de 65 caracteres seguem sem correção.** Warnings da rodada
3, idênticos aos da rodada 2: `/escrita/multitenancy-governo-vs-saas` (69) e
`/escrita/sdd-spec-driven-development` (78). O `ui-spec.md` fixa "título ≤ 60". O Google trunca
por volta de 60. São dois `title:` de frontmatter — ou um `ogTitle`/`title` curto no
`pageMetadata` do artigo.

**5.4 [PLAUSIBLE] Nenhum `Content-Security-Policy`.** `next.config.ts` define cinco cabeçalhos de
segurança (nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS) e nenhum CSP. O
layout injeta dois `<script>` inline (o marcador `.js` e o JSON-LD raiz), então adicionar CSP
depois vai exigir nonce ou hash — mais barato decidir agora. Para um site estático sem terceiros,
um CSP restritivo é quase gratuito. (Nota menor: `Strict-Transport-Security` com `preload` num
subdomínio não tem efeito de preload — a lista exige o apex. Inofensivo.)

**5.5 [PLAUSIBLE] A Action implanta mas não sabe reverter.** `deploy.yml` grava `.last-deploy`
mas não oferece rollback; quando o healthcheck falha, a build quebrada fica no ar e o job só
morre. `deploy.sh --rollback` existe, porém exige alguém no terminal — exatamente o gargalo que a
D6 diz remover. Um `workflow_dispatch` com input `rollback: true` que chama o script já existente
fecha o laço.

**5.6 [PLAUSIBLE] Sem `permissions:` no workflow.** Sem o bloco, o `GITHUB_TOKEN` recebe o padrão
do repositório. `permissions: contents: read` no topo é uma linha e reduz o alcance de um
comprometimento de Action num repo público.

**5.7 [PLAUSIBLE] `Dockerfile` sem `HEALTHCHECK`.** Com `restart: unless-stopped` e roteamento
por Traefik, um container que sobe e trava responde à porta sem servir. Um
`HEALTHCHECK CMD wget -qO- http://127.0.0.1:3000/ || exit 1` dá ao Docker e ao Traefik um sinal
de prontidão de verdade. (No mais, o par `Dockerfile`/`.dockerignore` está coerente com
`output: "standalone"`: `standalone` + `static` + `public` copiados, usuário não-root, e o
`src/content` incluído — necessário porque `/escrita/[slug]/opengraph-image` é rota dinâmica e lê
o MDX em runtime. O `.dockerignore` exclui `.claude`, `docs` e `*.md` sem alcançar
`src/content/posts/*.mdx`.)

**5.8 [PLAUSIBLE] `role="progressbar"` na barra de leitura é ruído para leitor de tela.**
`reading-progress.tsx:66-70` expõe um `progressbar` com `aria-valuenow` que muda a cada 1% de
rolagem — ~100 atualizações por artigo. Indicador decorativo de progresso costuma ser
`aria-hidden`; um `progressbar` anunciável sugere uma operação em curso que o usuário deveria
acompanhar. O axe não pega (o ARIA está formalmente correto). De quebra, cada 1% dispara um
re-render do React só para atualizar um atributo — o `--progress` já é escrito
imperativamente e o `aria-valuenow` poderia seguir o mesmo caminho, zerando os re-renders.

**5.9 [PLAUSIBLE] Sem teste para frontmatter inválido.** O item 2.1 não tem rede: nenhum teste
Playwright ou unitário exercita post sem `date`, sem `tags` ou com `slug` divergente do nome do
arquivo. É o caso que quebra `feed.xml` e `sitemap.xml` ao mesmo tempo, em silêncio.

### Não são achados — verificado e correto

Registro explícito do que investiguei e passou, para que a ausência não seja confundida com falta
de checagem:

- **Textos alternativos.** `src/data/media.ts` descreve de fato cada captura ("mapa escuro com
  dispositivos de sinalização georreferenciados e painel lateral de uma placa R-19…"), com
  legenda de proveniência e taxonomia `captura`/`demo`/`estudo`. É o padrão que quase nunca se
  encontra na prática.
- **Um `<h1>` por página** — gateado pelo gauntlet (`singleH1`) em 19 rotas, verde.
- **`aria-hidden` em separadores** — varredura por `>·<`, `>/<`, `>—<` sem `aria-hidden` retornou
  vazio.
- **Canonical em rota dinâmica** — correto e específico por rota
  (`/escrita/cultbr-plataforma-federativa-dgo2026`, `/projetos/sigma`, `/projetos/cultbr`).
- **`nav.tsx`** — `aria-current="page"`, `aria-expanded`/`aria-controls` com `useId`, Escape
  devolve o foco ao botão, fechamento por troca de rota via ajuste de estado durante o render
  (padrão canônico do React, não efeito), relógio com `suppressHydrationWarning`. Sem achado.
- **`serializeJsonLd`** escapa `<`, suficiente contra fuga de `</script>`.
- **Sem IP literal, sem segredo literal** em `infra/` e `.github/` — `set -euo pipefail` presente
  nos dois scripts e em todos os heredocs remotos; heredocs corretamente terminados após o
  desaninhamento do bloco YAML.

### Sobre o `<footer>` duplicado do Playwright — causa raiz **aceitável**

`escrita/[slug]/page.tsx:244` renderiza um `<footer>` (navegação entre artigos) que é **irmão**
de `</article>`, não filho — confirmado no HTML construído. Como ele é descendente do `<main>` do
layout, a especificação HTML-AAM **não** o mapeia para `contentinfo`: um `<footer>` só vira
`contentinfo` quando não é descendente de `article`, `aside`, `main`, `nav` ou `section`. Existe,
portanto, exatamente **um** `contentinfo` na página (o rodapé do site) — que é por que o axe passou
em 19 rotas com zero violações e por que o gauntlet, que conta `h1` e `main` mas não `footer`,
não viu nada.

Retargetar o teste de `footer` para `contentinfo` é a **correção certa**, não um afrouxamento: o
teste media o elemento quando queria medir o landmark. Duas observações menores: (a) o `<footer>`
do artigo é hoje um elemento `generic` — pô-lo dentro do `<article>` a que pertence recuperaria a
semântica e teria evitado a confusão; (b) o gauntlet ganharia com um
`contentinfoCount === 1` ao lado de `singleH1`, já que foi o Playwright, e não a barra mecânica,
que levantou a questão.

---

## 6. Comprehension Check

**Passou, com três pontos obscuros.**

Consegui explicar cada módulo do diff sem abrir arquivo fora dele: o data layer tipado alimenta
sitemap/OG/JSON-LD a partir de um objeto só (D4, cumprido), `Reveal` substitui o framer-motion
com IO + CSS e `html.js` para não esconder conteúdo sem JS (D2, cumprido e comprovado pelo teste
"sem JavaScript o conteúdo continua visível"), e o gauntlet é um exit predicate honesto em cinco
dimensões. A arquitetura está clara.

**6.1 O comentário de `seo.ts:34` afirma o oposto do que o código faz.**
`// fallback: rotas sem opengraph-image.tsx próprio usam a imagem raiz` — o código não é fallback,
é override incondicional, e atinge justamente as rotas que **têm** `opengraph-image.tsx` próprio.
Este comentário é, muito provavelmente, o motivo de o achado 1.3 ter sobrevivido a todas as
revisões anteriores: quem leu confiou nele. Comentário que descreve a intenção em vez do
comportamento é pior que nenhum.

**6.2 `check.mjs:42` carrega uma nota específica de uma máquina.**
`const PORT = Number(args.port ?? 3377); // 3100 is taken by Docker Desktop on this machine` —
"this machine" não existe em CI nem na próxima máquina do autor.

**6.3 `Reveal` escreve `el.dataset.observed` para o gauntlet.** `reveal.tsx:60` existe só para o
`page.waitForFunction` de `check.mjs:160`. Está comentado, então não é armadilha — registro
porque é um acoplamento de produção→ferramenta de teste que um refactor futuro pode remover sem
perceber que quebra o gauntlet inteiro (o `.catch(() => {})` na linha 160 faria a espera falhar
**em silêncio**, e as capturas passariam a medir a página antes dos reveals).

---

## Veredicto

**REQUEST_CHANGES**

Gate mecânico verde, gauntlet verde, conteúdo reconciliado com as decisões em quase toda a
superfície — o trabalho é sólido e a disciplina de verificabilidade aparece no código, não só na
spec. O que segura o merge são dois achados que atingem exatamente a tese do redesign (papéis e
verificabilidade) por canais que a revisão de prosa não cobre, mais uma decisão da spec (D5) que
foi codificada mas não conectada.

Nenhum item abaixo impede build. Classe B: são pontos que **o humano deve olhar antes do merge**.

## Itens Bloqueadores

- [ ] **1.1** Remover "Hospital do Coração Alagoano" de
      `src/content/posts/rag-em-sistemas-com-compliance.mdx` (2 ocorrências) — constraint §3.5.
      Substituir por "hospital público parceiro", como já está em `projects.ts`. `[CONFIRMED]`
- [ ] **3.1** Ramificar `creativeWork()` por `project.group`: `nees` não pode emitir `creator`.
      Hoje o JSON-LD do CultBR e do SPTE/IAFREE é indistinguível do Sigma. DEC-009. `[CONFIRMED]`
- [ ] **1.3 / 3.2** Decidir D5: ou remover `images` de `pageMetadata()` para a convenção de
      arquivo voltar a valer (e as OG por rota funcionarem), ou apagar os dois
      `opengraph-image.tsx` de `[slug]` e alinhar `blogPosting.image`. Hoje há 7,5 KB de código
      que nenhum consumidor alcança e dois canais de metadado discordando. `[CONFIRMED]`
- [ ] **5.1** Deletar (ou mover para diretório ignorado) `nav.mjs`, `net.mjs`, `post.mjs`,
      `scroll.mjs`, `scroll2.mjs`, `shot.mjs` antes do commit — repositório público, §7.
      `[CONFIRMED]`
- [ ] **1.2** Deletar `src/data/metrics.ts` — sem consumidor, e contém as duas strings exatas que
      §7 mandou remover. `[CONFIRMED]`
- [ ] **2.4 / 2.6** Reconciliar o comportamento das duas camadas de deploy quando falta DNS:
      `deploy.sh` sai 0 mesmo com o app fora, `deploy.yml` sai 1 mesmo com o deploy bom.
      `[PLAUSIBLE]`
- [ ] **2.7** Tornar `VPS_KNOWN_HOSTS` obrigatório e remover o fallback `ssh-keyscan`, que anula o
      `StrictHostKeyChecking=yes`. `[PLAUSIBLE]`
- [ ] **1.4** Fechar os outcomes 4 e 10: rodar `npx playwright test` de novo com o teste
      retargetado para `contentinfo` e registrar EXIT=0; commitar e dar push. Só então preencher o
      `verify.md` como PASS. `[CONFIRMED]`

## Recomendado (não bloqueia)

- [ ] **2.1 + 5.9** Validar frontmatter no boundary de `posts.ts` (zod ou `throw` nomeando o
      arquivo) e cobrir com um teste.
- [ ] **2.2 + 2.3** Corrigir o filtro de `failing` e o retry assimétrico do Lighthouse em
      `check.mjs`; adicionar `contentinfoCount === 1` e limiares de CLS/LCP ao `thresholds.json`
      (**5.2**).
- [ ] **4.1** Extrair `<PageShell>` com breadcrumb + JSON-LD e trocar o §Esqueleto do `ui-spec.md`
      de transplante por importação.
- [ ] **4.2** Colapsar as três leituras de `posts.ts` numa função com cache.
- [ ] **5.3** Encurtar os dois títulos acima de 65 caracteres.
- [ ] **5.4** Definir CSP enquanto os scripts inline ainda são dois.
- [ ] **6.1** Corrigir o comentário de `seo.ts:34` — foi ele que escondeu o achado 1.3.

---

> **Limites deste review (Classe B).** Achados marcados `[PLAUSIBLE]` vêm só de leitura de código
> e podem ser falso-positivos. Ausência de achado numa dimensão **não** é evidência de ausência
> de defeito. As âncoras usadas foram: saída do `npm run quality` (EXIT=0), logs do gauntlet
> rodadas 2 e 3, log do Playwright, HTML de `.next/server/app/**`, `git status`/`ls-remote`, e a
> reexecução dos outcomes 5–10. Nenhum arquivo do projeto foi editado além deste relatório.
