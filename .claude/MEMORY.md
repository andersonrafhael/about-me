# MEMORY — andersonrafhael.requiemcompany.com.br

> Atualizado: 2026-08-21 · Branch: main · Forge 6.8.0 (starter pack local, gitignored — repo público)

## Estado

Redesign completo entregue em 2026-08-21 (task L, design doc em `docs/plans/2026-08-21-redesign/`).
Site buildado, gauntlet de qualidade como contrato de terminação Classe A (`scripts/gauntlet/check.mjs`,
thresholds em `scripts/gauntlet/thresholds.json`, contrato em `docs/plans/2026-08-21-redesign/loop-contract.json`).

**Bloqueio externo (ação do Anderson):** o registro DNS `andersonrafhael` não existe na zona Cloudflare de
`requiemcompany.com.br`; o VPS responde 200 via `--resolve`. SSH do Mac não é aceito pelo VPS (chaves
`id_ed25519`/`id_rsa` recusadas para root). Runbook: `docs/runbook.md`. Deploy por Action exige secrets
`VPS_HOST`, `VPS_SSH_KEY` e `VPS_KNOWN_HOSTS` (obrigatório; sem `ssh-keyscan`), opcional `VPS_IP`. A Action chama `infra/deploy.sh`.

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
