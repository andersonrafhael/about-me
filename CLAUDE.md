# andersonrafhael.requiemcompany.com.br

Site pessoal de Anderson Rafhael — vitrine de produtos, escrita e pesquisa. Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 (CSS-first, `@theme inline`) · MDX nativo. Deploy: `output: "export"` servido por Cloudflare Workers static assets com custom domain (`wrangler.jsonc`; headers em `public/_headers`, redirects em `public/_redirects`).

@AGENTS.md

## Comandos

| Ação                               | Comando                                                                                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Dev                                | `npm run dev` (webpack; ver `package.json`)                                                                                                     |
| Qualidade (gate)                   | `npm run quality` — build + tsc + eslint (o build gera `next-env.d.ts`, que tipa os `.webp`) (export estático em `out/`)                                                                            |
| E2E                                | `npm test` (Playwright; serve `out/` com `wrangler dev` em :3001 — `npm run preview` faz o mesmo à mão)                                        |
| Gauntlet (barra mecânica completa) | `node scripts/gauntlet/check.mjs` — Lighthouse + axe + contrato HTML/SEO + teclado + links; relatório em `scripts/gauntlet/reports/latest.json` |
| Deploy                             | `npm run deploy` (`next build && wrangler deploy`; exige `wrangler login`) — runbook em `docs/runbook.md`; rollback: `wrangler rollback`        |

## Fonte de verdade do conteúdo

- Perfil consolidado: `~/Desktop/Antigravity/second-brain/003-resources/anderson-perfil-consolidado.md`
- Decisões do dossiê: `~/Desktop/Antigravity/second-brain/001-projects/anderson-forbes-u30/decisions.md`
- Regras de papel que o site **não pode** violar: Sigma/UniPass/SGDI/MicroRed/Synapse/RHEMA = fundador/arquiteto; CultBR/SPTE/Tela Brasil = **gerente de produto (NEES/UFAL)**. CIRIS é ideação, não produto. Nenhum número de "municípios em operação" antes do go-live (X = 0).
- Dados dos projetos: `src/data/projects.ts` · métricas: `src/data/metrics.ts` · artigos: `src/content/posts/*.mdx`

## Convenções locais

- Union types, named exports (exceto pages/layouts), `@/` aliases, kebab-case em arquivos.
- Texto secundário com `text-foreground/NN` (tokens `muted` têm conflito com o compat shadcn em `@theme inline`).
- Motion: só `transform`/`opacity`; `prefers-reduced-motion` respeitado via `MotionConfig reducedMotion="user"` + CSS.
- Nada de capturas com PII real (CPF, e-mail de terceiros) em `src/assets/`.
- Ortografia pt-BR (AO 2009) impecável em UI e copy.

## Harness

Bootstrapado do Requiem Forge (versão em `.claude/features.json`). O starter pack (`.claude/*` exceto `MEMORY.md`, `.agents/`, `.codex/`, `.opencode/`) é **local e ignorado pelo git** — este repositório é público. Memória de sessão: `.claude/MEMORY.md`.
