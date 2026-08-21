# Plano de execução — fatias verticais

> Cada fase produz um estado buildável e verificável (`npm run quality` + gauntlet parcial).
> Estratégia: serial entre fases; paralelo só em read-only (pesquisa, crítica). Worker: sessão
> Fable 5 + subagents Sonnet para blocos mecânicos (otimização de imagens, revisão de links).
> Validador: Opus 5 em contexto limpo (`fresh-context-review`) + `qa-engineer` (Playwright).

## Fase 0 — Diagnóstico e contrato ✅

Infra (DNS inexistente, VPS vivo, SSH negado), Forge 6.8.0 bootstrapado (gitignored), contrato de
gauntlet validado, `check.mjs` escrito, pesquisa em 6 agentes disparada, rodada 0 do gauntlet.

## Fase 1 — Fundação: conteúdo, tokens, motion, imagens

1. `src/data/projects.ts` reescrito: tipo `Project` rico (problem/approach/state/learning/
   gallery/role/period/links/featured/order), 9 projetos + lista "em concepção".
2. `src/data/site.ts`: identidade, canais, instituições, "agora", métricas honestas.
3. `globals.css`: tokens de contraste corrigidos, grain, reveal utilities, view-transition,
   scrollbar, selection, `@starting-style`.
4. `src/components/reveal.tsx` (IO, 1 KB) substitui `AnimatedSection`/framer-motion.
5. Imagens: `src/assets/products/*.webp` (cwebp q82, ≤ 1600 px), sem PII; `src/data/media.ts`.
6. Remover `@ybouane/liquidglass`, `framer-motion`, `patch-package`; deletar glass-*.

Verificação: `npm run quality`; `node scripts/gauntlet/check.mjs --skip=lighthouse`.

## Fase 2 — Home

Hero (prova), Instituições, Produtos (linhas), Método, Manifesto, Escrita & Pesquisa, Trajetória,
CTA, Footer (novo, global). Nav revisado (sem link morto, menu mobile acessível).

Verificação: gauntlet completo na `/` (mobile ≥ 90).

## Fase 3 — Projetos

`/projetos` (grupos), `/projetos/[slug]` (template com galeria, OG dinâmico, JSON-LD
Breadcrumb), redirect `sgtu → unipass`.

## Fase 4 — Escrita, Pesquisa, Sobre, Contato

Artigo: progresso, sumário, próximo; lista com RSS. Pesquisa corrigida. Sobre com `#requiem`,
"Agora", trajetória. Contato com "sobre o que conversar".

## Fase 5 — SEO e plataforma

Metadata por rota, OG por rota (projeto/artigo), JSON-LD, `feed.xml`, `manifest` + ícones,
`llms.txt`, sitemap com `lastModified` real, `robots`, `not-found` revisado, headers de
segurança em `next.config.ts`.

## Fase 6 — Gauntlet (≤ 6 rodadas) + crítica estética (≤ 3 rodadas)

`check.mjs` → corrigir → repetir. Em paralelo, a cada rodada: crítico de contexto limpo
(frontend-sophistication, ux-heuristics, humanizer) gera WARNINGs; o orquestrador triage.

## Fase 7 — Validate (cerimônia L)

`fresh-context-review` (Opus, cego ao raciocínio) → `forge-e2e-validator` (qa-engineer) →
`ux-verify.md` → `verify.md` → `change-retro.md`.

## Fase 8 — Ship

Commits conventionais · push · `infra/deploy.sh` sem IP literal · `.github/workflows/deploy.yml`
· runbook `docs/runbook.md` (DNS + deploy + rollback) · MEMORY.md · nota no vault · relatório
final com os dois passos do Anderson (DNS, primeiro deploy/SSH).
