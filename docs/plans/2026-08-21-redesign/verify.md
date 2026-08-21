---
change: "redesign-2026-08"
date: "2026-08-21"
status: "PARTIAL"
plan-ref: "docs/plans/2026-08-21-redesign/plan.md"
---

# Verificação — redesign-2026-08

## Pré-condições

| Check                     | Resultado                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Commits no branch         | 9 commits temáticos em `redesign/2026-08-vitrine` (`git log --oneline main..HEAD \| wc -l` = 9); PR #1 para `main`                                |
| Fases do plano concluídas | 0–6 concluídas; 7 (validate) concluída com este arquivo + `fresh-review.md` + `ux-verify.md`; 8 (ship) até o `push` — deploy depende do Anderson |

## Quality Gate

```bash
npm run quality   # tsc --noEmit && eslint . --max-warnings 0 && next build
```

| Check              | Status | Detalhe                                                                                                                                                                                      |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript / tipos | PASS   | `tsc --noEmit` sem erros (`/tmp/gate-output.txt`, EXIT=0, 2026-08-21)                                                                                                                        |
| ESLint / lint      | PASS   | `eslint . --max-warnings 0` — zero erros, zero warnings                                                                                                                                      |
| Build              | PASS   | Next.js 16.2.6 (Turbopack), 29 rotas; `experimental.viewTransition` ativo                                                                                                                    |
| Testes             | PASS   | Playwright `tests/site.spec.ts`: **38 passed, 2 skipped** (skips são os casos desktop-only/mobile-only do outro projeto), desktop Chrome + Pixel 7, contra `next start` do build de produção |

**Keep Rate (≥30% código AI-gerado):**

- Linhas AI-geradas: ~8.200 inserções no diff (`git diff HEAD --stat`: 115 arquivos, +8.173/−2.604)
- Linhas mantidas após revisão do orquestrador: ≈ 8.000 (ajustes pontuais: headings em `/sobre` e `/pesquisa`, `dl` de fatos, descrições, título de projeto, label-in-name no logo, fontes)
- Keep Rate: ≈ 97% — [x] ≥85% bem orientado

## Verificação Funcional

| Critério                               | Como observar (`do`)              | Comando exato                                                                   | Condição de passagem       | Se não for produzível                                                                                           |
| -------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Barra mecânica do gauntlet             | executar o contrato de terminação | `node scripts/gauntlet/check.mjs`                                               | exit 0                     | Lighthouse de laboratório ≠ campo (CrUX) — risco declarado no contrato                                          |
| Conteúdo reconciliado com decisions.md | conferir na fonte                 | `grep -ril 'tela brasil' src/data src/app src/components` vazio                 | zero ocorrências proibidas | —                                                                                                               |
| Domínios mortos fora do site           | conferir na fonte                 | `grep -rE 'https://(www\.)?requiemcompany\.com\.br\|rhema\.requiemcompany' src` | vazio                      | —                                                                                                               |
| Redirects                              | requisição HTTP                   | Playwright `site.spec.ts` (308 `/projetos/sgtu`, 307 `/projetos/tela-brasil`)   | status + `location`        | —                                                                                                               |
| Sem IP literal                         | conferir na fonte                 | `git grep -nE '([0-9]{1,3}\.){3}[0-9]{1,3}' -- infra .github`                   | vazio                      | —                                                                                                               |
| Site no ar na URL pública              | requisição HTTP                   | `curl -sI https://andersonrafhael.requiemcompany.com.br`                        | 200                        | **NÃO OBSERVÁVEL nesta sessão**: registro DNS inexistente; exige ação do Anderson (runbook §a) + deploy (§b/§c) |

| Critério de sucesso                   | Verificado?                                                                          | Evidência                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gauntlet PASS | Sim | **Rodada 6 (final, 2026-08-21): `routes: 19 · failures: 0 · warnings: 0`** — duas medições Lighthouse por rota ficando a pior: mobile perf 92–96 / a11y 100 / BP 100 / SEO 100, LCP 2,6–3,1 s, CLS 0, TBT ≤ 60 ms; desktop 100/100/100/100, LCP 0,6–0,8 s; axe WCAG 2.2 AA zero violações nas 19 rotas; contrato HTML/SEO (canonical, OG por rota, JSON-LD, 1 h1, 1 main, 1 contentinfo, skip link), teclado e links OK. Rodada 0 (site antigo): perf mobile 79, a11y 95–96, 175 nós com contraste insuficiente, sem canonical/JSON-LD/OG nas internas. `scripts/gauntlet/reports/latest.json`, `/tmp/gauntlet-round6.log` |
| Quality PASS                          | Sim                                                                                  | `/tmp/gate-output.txt` EXIT=0                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Contrato de loop válido               | Sim                                                                                  | `loop-contract-validate.py` → `LOOP CONTRACT: OK` (6 rodadas · 3M tokens · 6h; usadas 3 rodadas mecânicas + 1 estética)                                                                                                                                                                                                                                                                                                                                                       |
| Playwright verde | Sim | `/tmp/playwright-run5.log`: 38 passed, 2 skipped (desktop-only/mobile-only), EXIT=0, contra o build final |
| Conteúdo sem regressões de papel/fato | Sim                                                                                  | `src/data/projects.ts`, `src/data/site.ts`, `src/data/research.ts` revisados contra perfil 2026-08-07 e decisions.md DEC-001…021; grep negativos acima                                                                                                                                                                                                                                                                                                                        |
| Imagem Docker de produção | Sim — `docker build` OK (node:22-alpine, standalone); container respondeu 200 em `/`, `/projetos/sigma`, `/sitemap.xml`, `/feed.xml`, `/manifest.webmanifest`, `/opengraph-image`; removida após o teste. Build anterior ao `HEALTHCHECK` adicionado depois (busybox `wget`, baixo risco) | `/tmp/docker-build.log` |
| Revisão em contexto limpo             | [PREENCHER: veredito de `fresh-review.md`]                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Validação e2e (qa-engineer)           | [PREENCHER: decisão de `ux-verify.md`]                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Publicado para revisão | Sim — branch `redesign/2026-08-vitrine` (9 commits) em `origin`; **PR #1** aberto: https://github.com/andersonrafhael/about-me/pull/1. Push direto em `main` bloqueado pelo hook `main-push-guard` (regra: diff de IA revisado por humano antes da main) — comportamento correto, não contornado | `git ls-remote origin` |

## Revisão em contexto limpo — o que foi tratado

| Achado | Carimbo | Ação |
|---|---|---|
| 1.1 Artigo de RAG nomeava o HCA (2×) | CONFIRMED | texto → "hospital público de referência cardiológica em Alagoas, parceiro do piloto" |
| (extra) Artigo de multitenancy: "SGTU … implantado em Campo Alegre/AL" e CultBR como "projeto da Requiem" | CONFIRMED pela varredura seguinte | → UniPass "em preparação para a primeira implantação"; CultBR "NEES/UFAL com o MinC, onde atuei como gerente de produto" |
| 3.1 JSON-LD `creator` igual para Sigma e CultBR | CONFIRMED | `creativeWork()` ramifica por `group`: `nees` → `contributor` + `sourceOrganization`, sem `creator` |
| 1.3/3.2 OG por rota sobrescrita pelo fallback raiz | CONFIRMED | `pageMetadata({ ogImage: "file" })` nas rotas dinâmicas; comentário corrigido (6.1) |
| 1.2 `src/data/metrics.ts` órfão com as strings proibidas | CONFIRMED | removido |
| 5.1 Seis scripts de depuração na raiz | CONFIRMED | movidos para fora do repo |
| 3.3 `Organization.url` apontava para o site pessoal | PLAUSIBLE | removido (DEC-017) |
| 2.1/5.9 Frontmatter sem validação | CONFIRMED | `posts.ts`: validação no boundary com erro nomeando o arquivo; leitura única com cache (4.2) |
| 2.2/2.3 Gauntlet: lista `failing` vazia; retry enviesado | CONFIRMED | filtro numeric+binary com valor; **duas medições sempre, fica a pior** |
| 5.2 CLS/TBT sem gate | CONFIRMED | `thresholds.metrics` cls ≤ 0,1 · tbt ≤ 300 ms; `contentinfo` = 1 |
| 2.8 Sem relatório em caso de crash | PLAUSIBLE | handlers de exceção escrevem `latest.json` parcial |
| 2.9 `clampDescription` sem guarda | PLAUSIBLE | guarda `space > 0` |
| 5.3 Títulos > 65 | CONFIRMED | `seoTitle` no frontmatter dos 2 artigos |
| 5.4 Sem CSP | PLAUSIBLE | CSP restritiva (`'unsafe-inline'` só em script/style, exigido pela hidratação do Next) |
| 5.8 `progressbar` ruidoso | PLAUSIBLE | barra decorativa `aria-hidden`, sem estado React |
| 2.4–2.7, 5.5–5.7 (camadas de deploy, known_hosts, permissions, rollback por Action, HEALTHCHECK) | PLAUSIBLE | delegados ao `deployment-engineer` — ver §Issues |
| 4.1 `<PageShell>` para breadcrumb/JSON-LD repetidos em 7 páginas | CONFIRMED | **não feito** — refactor transversal no fim da sessão; follow-up no retro |
| 2.10 `ref as never` no `Reveal` | PLAUSIBLE | mantido, registrado |

## Rodadas do gauntlet (histórico)

| Rodada | Estado do site                      | Resultado                                                                                                                                               | O que mudou depois                                                                                           |
| ------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 0      | site antigo (WebGL glass)           | FAIL — perf mobile 79/82, a11y 95–96 (contraste), sem canonical/JSON-LD/OG internos, `requiemcompany.com.br` morto                                      | redesign completo                                                                                            |
| 1      | redesign                            | FAIL — perf mobile 74–75 (LCP 11 s por 1,6 MB de fontes pré-carregadas), 7 achados HTML, 1 axe (`dl`), heading-order em `/sobre`, label-in-name no logo | subset de fontes; 6 correções pontuais                                                                       |
| 2      | + fontes subsetadas (Inter 3×76 KB) | FAIL — só perf mobile 84–89                                                                                                                             | Inter era fonte variável idêntica nos 4 pesos → uma instância `wght 400–700` de 36 KB; JetBrains sem preload |
| 3      | + Inter variável 36 KB              | **PASS** — mobile 90–96, desktop 100; CLS 0,10–0,13 em 2 rotas (troca de fonte de título)                                                               | Space Grotesk 500/700 embutida em data-URI (`src/app/fonts.css`) — rodada 4 confirma                         |

## Assumptions (decidido sem perguntar)

- Tela Brasil removido do site por causa da trava jurídica registrada no vault (08/08/2026); volta quando liberado.
- Ano de fundação da Requiem mantido em 2024 (correção explícita no repo em mai/2026) — divergência com o perfil (2022) registrada para ratificação.
- Paper SBCAS 2025 (ECG sintético) listado como coautoria com base em DOI + iniciais "A. R. G. Barbosa" + coautor recorrente; para ratificação.
- HCA não nomeado; "hospital público parceiro do piloto" conforme vault.
- WebGL glass e framer-motion removidos (D1, D2 do design doc). Starter pack do Forge não commitado (repo público).
- Fonte de títulos embutida em CSS (26 KB) em vez de `next/font`: troca CLS por 130 ms de CSS em 4G lento.

## Issues Encontrados

| Severidade | Descrição                                                                                                                                                                              | Ação                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| INFO       | Em dev, `next dev` rejeita origem `127.0.0.1` (allowedDevOrigins) — hidratação falhava nas capturas; produção não é afetada                                                            | capturas via `localhost`; nota no MEMORY                                  |
| INFO       | Satori (`ImageResponse`) não lê `.woff2` nem fonte variável — `.ttf` estáticas em `src/assets/fonts`                                                                                   | resolvido                                                                 |
| WARNING    | Subagent D2 rodou `pip install fonttools` com sandbox desligado para gerar instância estática da Inter; o orquestrador repetiu a instalação num venv isolado (`/tmp/ft`) para o subset | registrado; ferramenta local, sem efeito no repo além dos `.woff2`/`.ttf` |
| WARNING    | Títulos de 2 artigos excedem 65 chars (69 e 78)                                                                                                                                        | aceito — são os títulos editoriais reais; warning, não falha              |

## Decisão Final

**Status: PARTIAL**

Motivo: tudo o que é observável localmente passou (gate mecânico, gauntlet rodada 6, e2e, Docker). "Site no ar na URL pública" não é observável nesta sessão — depende de três passos do Anderson: revisar e mesclar o PR #1, criar o registro DNS na Cloudflare e disparar o primeiro deploy (SSH ou secrets da Action), documentados em `docs/runbook.md`. Ao executá-los, o critério fecha com `curl -sI https://andersonrafhael.requiemcompany.com.br` → 200 e uma rodada do gauntlet apontada para a URL pública.
