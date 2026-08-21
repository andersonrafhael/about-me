---
change: "redesign-2026-08"
date: "2026-08-21"
verify-status: "PARTIAL"
verify-ref: "docs/plans/2026-08-21-redesign/verify.md"
---

# Retrospectiva — redesign-2026-08

## O Que Foi Entregue

Redesign completo do site pessoal como vitrine verificável: conteúdo reconciliado com o dossiê (papéis, estados,
decisões DEC-001…022), direção visual "instrumento editorial" com capturas reais dos produtos, SEO estrutural
(metadata/canonical/OG por rota, JSON-LD, RSS, manifest, llms.txt), acessibilidade WCAG 2.2 AA medida por axe em
todas as rotas, performance móvel ≥ 90, e um gauntlet de qualidade que é contrato de terminação do Forge. Infra de
deploy endurecida (script sem IP, GitHub Action, runbook, Dockerfile node 22). O site não subiu por bloqueio externo
(DNS inexistente + SSH não autorizado) — passos do Anderson documentados.

**Arquivos principais afetados:**

| Arquivo                                                                                                                                                                                                      | Tipo de mudança                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `src/data/{site,projects,research,media}.ts`                                                                                                                                                                 | criados (fonte única de conteúdo)                                    |
| `src/app/globals.css`, `src/app/fonts.css`, `src/app/layout.tsx`                                                                                                                                             | reescritos (tokens com contraste auditado, motion CSS-first, fontes) |
| `src/components/{hero,nav,footer,grain,reveal}.tsx`, `src/components/home/*`, `src/components/ui/*`                                                                                                          | criados/reescritos                                                   |
| `src/app/{projetos,escrita,pesquisa,sobre,contato}/**`, `not-found.tsx`, `sitemap.ts`, OG por rota                                                                                                           | reescritos (3 subagents Sonnet sob `ui-spec.md`)                     |
| `src/app/{feed.xml,llms.txt}/route.ts`, `manifest.ts`, `icon.tsx`, `apple-icon.tsx`                                                                                                                          | criados                                                              |
| `src/lib/{seo,json-ld,slugify}.ts`, `src/lib/posts.ts`                                                                                                                                                       | criados/estendidos                                                   |
| `scripts/gauntlet/{check,shoot}.mjs`, `thresholds.json`, `loop-contract.json`                                                                                                                                | criados (barra Classe A)                                             |
| `infra/deploy.sh`, `.github/workflows/deploy.yml`, `docs/runbook.md`, `Dockerfile`, `.dockerignore`                                                                                                          | reescritos/criados                                                   |
| `tests/site.spec.ts`, `playwright.config.ts`                                                                                                                                                                 | reescritos (e2e contra build de produção)                            |
| removidos: `@ybouane/liquidglass`, `framer-motion`, `patch-package`, `tw-animate-css`, glass-*, terminal-typewriter, editorial-facts, featured-projects, home-cta, animated-section, providers, project-card | removidos                                                            |

## Delta de Requisitos (RHEMA)

Projeto sem corpus RHEMA. Requisitos implícitos do design doc §3 (constraints) e §8 (success criteria) viraram
critérios executáveis em `outcomes.md` e `thresholds.json`; sem `delta-spec.md` (não há RF/RNF formais).

## Gaps de Cobertura

| Requisito                             | Gap                                         | Plano de cobertura                                     |
| ------------------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| Site no ar na URL pública             | DNS + deploy dependem do Anderson           | runbook §a–c; depois, `check.mjs` contra a URL pública |
| Core Web Vitals de campo              | só lab data                                 | Search Console após indexação                          |
| Leitor de tela real                   | axe + árvore de acessibilidade como proxies | sessão com VoiceOver quando o site estiver no ar       |
| Lattes / SBCAS 2025 / ano de fundação | fatos não verificáveis por máquina          | ratificação do Anderson (MEMORY §Pendências)           |

## O Que Funcionou

| Prática                                                               | Por que funcionou                                                                                                                             |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Diagnóstico antes de design (DNS, VPS, decisions.md, perfil)          | mudou o escopo de "estética" para "verificabilidade" — a crítica fresh-eyes confirmou que o site antigo repetia 4 erros registrados no perfil |
| Contrato de terminação Classe A (`check.mjs`) escrito antes do código | cada rodada teve veredito binário e diagnóstico por rota; 4 rodadas até PASS, sem "está bom o suficiente?"                                    |
| `ui-spec.md` como contrato para 3 subagents em paralelo               | páginas internas saíram coerentes com as primitivas sem retrabalho de design; 0 colisão de arquivos                                           |
| Pesquisa em 6 agentes (fatos com proveniência)                        | achou DOIs reais dos papers, o nome correto do NEES e a morte do apex `requiemcompany.com.br`                                                 |
| Capturas reais com legenda de proveniência                            | resolve "zero imagens" sem inventar ilustração e é o que um jornalista confere                                                                |

## O Que Teria Feito Diferente

| Decisão tomada                                                                              | Alternativa melhor                                            | Aprender para próxima                                                    |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Declarar 4 pesos de Inter sem medir os arquivos (344 KB cada, todos a mesma fonte variável) | `du -k` nos `.woff2` e `fonttools` antes do `localFont`       | regra: pesar fontes antes de pré-carregar; preferir 1 variável subsetada |
| Capturas no dev server via `127.0.0.1`                                                      | `localhost` (allowedDevOrigins) ou sempre o build de produção | checar hidratação (`data-observed`) antes de confiar em screenshot       |
| `Reveal` escondendo por padrão                                                              | nascer visível e só esconder em `html.js`; hero em CSS puro   | LCP nunca espera hidratação                                              |
| Teste "exatamente um `<footer>`"                                                            | landmark `contentinfo`                                        | testar semântica, não tag                                                |
| Brief do OG com `.woff2`                                                                    | Satori só lê ttf/otf/woff e não lê variável                   | incluir no `ui-spec` da próxima vez                                      |

## Ações de Follow-up

- [ ] Anderson: criar registro A `andersonrafhael` (proxied) na Cloudflare; rodar `infra/deploy.sh` ou criar secrets da Action (runbook §a–c)
- [ ] Anderson: ratificar ano de fundação (2022 vs 2024), paper SBCAS 2025, ID do Lattes
- [ ] Após DNS: rodar `node scripts/gauntlet/check.mjs` apontado para a URL pública (adicionar `--base` ao script) e conectar Search Console
- [ ] Liberação jurídica do Tela Brasil → reativar entrada Tier 2 (dados já removidos; capturas não geradas)
- [ ] Forge: propor regra "pesar fontes antes de `next/font`" e nota Satori/woff2 em `forge-conventions`
- [x] `MEMORY.md` atualizado; DEC-022 + daily no vault
