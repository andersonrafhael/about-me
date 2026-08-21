# MEMORY — andersonrafhael.requiemcompany.com.br

> Atualizado: 2026-08-21 · Branch: `redesign/2026-08-vitrine` (PR #1 → main: https://github.com/andersonrafhael/about-me/pull/1) · Forge 6.8.0 (starter pack local, gitignored — repo público)

## Estado

Redesign completo entregue em 2026-08-21 (task L, design doc em `docs/plans/2026-08-21-redesign/`).
Site buildado, gauntlet de qualidade como contrato de terminação Classe A (`scripts/gauntlet/check.mjs`,
thresholds em `scripts/gauntlet/thresholds.json`, contrato em `docs/plans/2026-08-21-redesign/loop-contract.json`).

**Infra — estado em 2026-08-21 (noite): migração para Cloudflare Workers PRONTA, deploy pendente de permissão.**

- Branch `feat/cloudflare-workers-export` (10 commits sobre `0bb34d9`): `output: "export"`, `wrangler.jsonc`
  (`andersonrafhael-site`, assets `./out`, `auto-trailing-slash`, `404-page`, custom domain, `workers_dev: false`),
  `public/_headers` (CSP/HSTS/etc. + `immutable` em `/_next/static/*` + `image/png` nos metadata routes sem extensão)
  e `public/_redirects` (308 sgtu→unipass, 307 tela-brasil→/projetos, com e sem barra final). Todo metadata route
  exporta `dynamic = "force-static"` (Turbopack exige) e os `opengraph-image.tsx` de `[slug]` têm `generateStaticParams`
  próprio. VPS removido (`infra/`, Dockerfile); Action = job `quality` (PR/main) + job `deploy` que só roda com
  `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` (senão `::notice`, sem falhar). Runbook reescrito para Workers.
- Gate na branch: `npm run quality` exit 0 · export 230 arquivos · Playwright 38/38 sobre `wrangler dev` ·
  `wrangler deploy --dry-run` ok · 2 revisores APPROVE, 0 bloqueadores. Gauntlet local (wrangler dev): tudo verde
  exceto Lighthouse mobile `/projetos/sigma` = **89** (LCP 3,6 s; `images.unoptimized` serve WebP de 1440 px ao
  mobile). Decidir só com medição em produção (Brotli/HTTP3 da borda). Se persistir: variantes menores das duas
  capturas do Sigma (ou loader `/cdn-cgi/image/` se Transformations estiver ativo na zona) — nunca subir threshold.
- Desvio deliberado de CSP: `upgrade-insecure-requests` removido (quebrava o 307 de prefetch `$d$slug` no
  `wrangler dev` http); origem é HTTPS-only com HSTS, sem subresource http — documentado em `public/_headers`.
- **Deploy bloqueado pelo classificador de permissões do auto mode** (`wrangler deploy` = publicação externa).
  A sessão `wrangler` OAuth deste Mac está válida (conta do Anderson, escopos workers/routes/ssl_certs write).
  **Próximo passo (1 comando, ~1 min):** `npm run deploy` na `main` (ou liberar `Bash(./node_modules/.bin/wrangler deploy*)`
  nas permissões e pedir para continuar). O deploy cria o DNS `andersonrafhael` + certificado (custom domain).
- **Depois do deploy (próxima sessão):** `dig +short andersonrafhael.requiemcompany.com.br` · sonda https
  (CSP/HSTS em 200/307/404, `/projetos/sgtu/` 308, OG `image/png`, `/_headers` 404) ·
  `node scripts/gauntlet/check.mjs --base=https://andersonrafhael.requiemcompany.com.br` · flip de
  `docs/plans/2026-08-21-redesign/verify.md` (status PARTIAL → PASS, linhas 4/45/111/113) com evidência ·
  daily note no vault. `npm audit`: 13 vulns pré-existentes (transitivas de next/eslint), fora de escopo.

## Arquitetura do site (pós-redesign)

- Next.js 16.2 App Router (Turbopack), React 19.2, Tailwind v4 tokens em `src/app/globals.css`,
  `experimental.viewTransition` ligado, sem framer-motion, sem WebGL (`@ybouane/liquidglass` removido — D1).
- Conteúdo: `src/data/site.ts` (identidade, hero, métricas, instituições, agora, manifesto, timeline, canais),
  `src/data/projects.ts` (9 projetos + `concepts`; grupos `requiem`/`infra`/`nees`), `src/data/research.ts`
  (publicações com DOI, pipeline DEC-002), `src/data/media.ts` (capturas com proveniência), MDX em `src/content/posts/`.
- Motion: `Reveal` (IO, só esconde em `html.js`, marca `data-observed` para ferramentas), hero com `.rise` CSS puro; `prefers-reduced-motion` zera tudo.
- Fontes: Inter variável (wght 400–700, subset) e Space Grotesk 500/700 **embutidas em data-URI** em `src/app/fonts.css` (zero swap → sem CLS, LCP = primeiro paint); JetBrains Mono via `next/font` com `display: optional`; Dune Rise só no monograma. Não voltar a `next/font` para Inter sem medir LCP móvel (o swap re-emitia o LCP para ~3 s).
- SEO: `src/lib/seo.ts` (`pageMetadata`), `src/lib/json-ld.ts` (Person+Organization+WebSite no layout;
  Breadcrumb/CollectionPage/BlogPosting/CreativeWork/ProfilePage por rota), OG por rota, `feed.xml`,
  `manifest`, `llms.txt`, `icon.tsx`/`apple-icon.tsx` (Satori só lê TTF — fontes `.ttf` em `src/assets/fonts`).
- Imagens: `src/assets/products/*.webp` (capturas de 21/08/2026 + espécimes Sigma + demos sem PII).

## Regras de conteúdo que o site obedece (não regredir)

- Papéis: Sigma/UniPass/SGDI/MicroRED/Synapse/RHEMA/Forge = fundador; CultBR/SPTE = **gerente de produto (NEES/UFAL)**.
- **Tela Brasil fora do site** até checagem jurídica (trava TED/Serpro, mar/2027). Redirect 307 para `/projetos`.
- CIRIS = em concepção (DEC-018), sem página. `sgtu` → `unipass` (308, DEC-011).
- X = 0: nenhum município nomeado como implantado; HCA é "hospital parceiro do piloto", não cliente.
- Sem links para `requiemcompany.com.br` (apex morto, DEC-017) nem `rhema.requiemcompany.com.br` (morto).
- Métricas do hero com papel: "4 artigos em coautoria · NEES/UFAL". NEES = Núcleo de Excelência em
  **Tecnologias Sociais** (não "Engenharia de Software").
- Contraste: texto ≥ `text-foreground/60`; violeta em texto = `text-primary-text` (#a78bfa); `muted-2/3` só decorativo.
- JSON-LD: projetos `nees` emitem `contributor` + `sourceOrganization`, nunca `creator`; `Organization` sem `url` (DEC-017). Artigos MDX também obedecem (HCA não nomeado; UniPass; CultBR = NEES/UFAL).
- Barra do gauntlet: Lighthouse mobile ≥ 90/100/95/100, desktop ≥ 95/100/95/100, **duas medições por rota ficando a pior**, CLS ≤ 0,1, TBT ≤ 300 ms, axe zero, `contentinfo` = 1. Rodar em máquina ociosa — build Docker/outra sessão em paralelo inflou TBT para 2 s numa rodada.

## Pendências para o Anderson ratificar

1. Ano de fundação da Requiem: site diz **2024** (correção explícita de mai/2026); perfil consolidado diz 2022. Sem fonte pública.
2. Paper SBCAS 2025 (ECG sintético, DOI 10.5753/sbcas.2025.7861) listado como coautoria — confirmar que é dele.
3. ID do Currículo Lattes (não localizado por máquina) — quando existir, entra em `/pesquisa` e no `sameAs`.
4. DEC-022 (vault) registra o descongelamento do site; ratificar a redação.
5. `docs/runbook.md` §(e): confirmar `systemctl is-enabled nginx` = disabled no VPS.

## Validação da task L (2026-08-21)

`docs/plans/2026-08-21-redesign/`: `design.md`, `plan.md`, `ui-spec.md` (contrato dos subagents), `outcomes.md`, `loop-contract.json`,
`fresh-review.md` (Opus, REQUEST_CHANGES → 8 bloqueadores tratados; `PageShell` ficou como follow-up), `ux-verify.md` (PASS, 8 fluxos, evidências WebP),
`verify.md` (PARTIAL só pelo "site no ar"), `change-retro.md`.

## Comandos

`npm run quality` · `npm run gauntlet` (build + Lighthouse + axe + HTML + teclado + links) ·
`npm run gauntlet:fast` · `npm run build && npm test` (Playwright contra `next start -p 3001`) ·
`node scripts/gauntlet/shoot.mjs <base> <dir> /rotas…` (capturas com rolagem; dev server via `localhost`, não `127.0.0.1`).

## Histórico

- 2026-05-13/14 — site construído (v1), nunca publicado.
- 2026-06-08 — sitemap/robots; incidente nginx×Traefik no VPS (runbook).
- 2026-07 — WIP Liquid Glass (WebGL) não commitado; descartado em 2026-08-21 (D1).
- 2026-08-21 — redesign L: conteúdo reconciliado com decisions.md, design "instrumento editorial", SEO estrutural,
  gauntlet, deploy hardening (deploy.sh sem IP, Action, runbook).
