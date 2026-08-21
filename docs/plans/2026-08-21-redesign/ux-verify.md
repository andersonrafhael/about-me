---
change: "redesign-2026-08"
date: "2026-08-21"
status: "PASS"
plan-ref: "docs/plans/2026-08-21-redesign"
---

# UX Verify — redesign-2026-08

> Gerado por `qa-engineer`. Gate obrigatório em tasks L antes de `verify.md`.
> Build de produção (`.next`) servido via `next start -p 3005`. Playwright MCP contra `http://127.0.0.1:3005`.

## Flows Testados

| Flow | Tipo | Status | Evidência |
|------|------|--------|-----------|
| Home → hero → "O que construo" → Sigma → CTA → Contato | happy path | PASS | `evidence/01-sigma-page.webp`; snapshot: h1 "Infraestrutura digital." na home, h1 "Sigma." em `/projetos/sigma` com figure legendada "captura sigma.requiemcompany.com.br · captura de 21/08/2026", seções Problema/Abordagem/Estado e escala/Aprendizado presentes; CTA "Conversar sobre o Sigma" leva a `/contato` com `rafha.barbosa98@gmail.com` visível (link `mailto:`) |
| Navegação por teclado na home | critical | PASS | `evidence/02-skip-link-focus.webp`, `evidence/03-focus-ver-projetos.webp`. 1º Tab foca "Ir para o conteúdo principal"; Enter navega para `#main-content` (URL atualiza o hash); Tab seguinte entra no conteúdo principal ("Ver projetos", anel de foco roxo visível na captura) — comportamento correto de "sequential focus navigation starting point", mas ver M-01 |
| Mobile 390×844 — menu, escape, hero stack, sem overflow | critical | PASS | `evidence/04-mobile-menu-open.webp`, `evidence/05-mobile-hero.webp`. `document.documentElement.scrollWidth === 390` (sem rolagem horizontal); botão "Abrir menu" abre painel; `Escape` fecha e devolve foco ao botão (`document.activeElement` = botão com `aria-label="Abrir menu"`); hero mostra a captura do produto abaixo do bloco de texto |
| `/escrita` (4 artigos) → artigo SDD → sumário → hash → anterior/próximo | critical | PASS | Snapshot: lista com 4 links de artigo; artigo SDD tem `progressbar` "Progresso de leitura", nav "Neste artigo" com 7 links de âncora; clique em "As três fases do SDD" resulta em URL `.../sdd-spec-driven-development#as-tres-fases-do-sdd`; navegação "Próximo" e "Todos os artigos" presentes no rodapé do artigo |
| `/pesquisa` — rota vigente + DOIs em nova aba | critical | PASS | Snapshot: heading "Rota vigente" com RHEMA/ICSE-SEIP 2027; 3 links de publicação com `href` `doi.org/...` e `target="_blank"` confirmado via `document.querySelectorAll` |
| `/sobre#requiem` — scroll até seção Requiem Company | critical | PASS | Snapshot + `getBoundingClientRect()`: `#requiem` com `top ≈ 184px`, dentro do viewport após navegação direta com hash; heading "Requiem Company" presente |
| Redirects `/projetos/sgtu`→`/projetos/unipass`, `/projetos/tela-brasil`→`/projetos` | critical | PASS | `browser_navigate` resultante: URL final `http://127.0.0.1:3005/projetos/unipass` e `http://127.0.0.1:3005/projetos`, respectivamente |
| Arquivos de plataforma (`/feed.xml`, `/manifest.webmanifest`, `/sitemap.xml`, `/llms.txt`) | critical | PASS | `fetch()` em página: todos os 4 retornaram status 200 |
| Conteúdo proibido (verificação negativa) | critical | PASS | Varredura de `document.body.innerText` e `a[href]` em `/`, `/projetos`, `/sobre`, `/pesquisa`: nenhuma ocorrência de "Tela Brasil", nenhum link para `requiemcompany.com.br` apex nem `rhema.requiemcompany.com.br`. Em `/projetos`: CultBR mostra "Gerente de produto do módulo de Gestão (até jun/2026); apoio técnico desde então", SPTE/IAFREE mostra "Gerente de produto · NEES/UFAL · Ministério da Educação", CIRIS aparece em "O que vem depois." com definição terminando em "Em concepção." |
| Console limpo | critical | PASS | `browser_console_messages(level: warning, all: true)` após visitar `/`, `/projetos`, `/projetos/sigma`, `/escrita`, `/escrita/sdd-spec-driven-development`, `/pesquisa`, `/sobre`, `/contato`: 0 erros, 0 warnings |

## Flakiness

**Detectada?** Não.

## Issues Encontrados

| Severidade | Flow | Descrição | Ação |
|-----------|------|-----------|------|
| Minor | Navegação por teclado na home | O elemento `#main-content` (a `<main>`) não tem `tabindex="-1"`. Ao ativar o skip link, `document.activeElement` continua sendo o próprio link (não o `<main>`), embora o Chromium aplique corretamente o "sequential focus navigation starting point" e o próximo `Tab` entre no conteúdo principal. Leitores de tela que dependem do evento de foco explícito no alvo (em vez de heurística de scroll) podem não anunciar a chegada em `#main-content`. | Adicionar `tabindex="-1"` ao `<main id="main-content">` e, opcionalmente, `element.focus()` no handler do skip link para robustez cross-browser/AT. Não bloqueia o merge (funciona corretamente no fluxo testado). |

## Gating Summary

| Check | Resultado |
|-------|-----------|
| Happy path | PASS |
| Todos os critical paths | PASS |
| Flakiness | Não |

## Decisão Final

**Status: PASS**

> - **PASS** → prosseguir para `verify.md`

Motivo: Todos os 8 critical paths e o happy path passaram na primeira rodada, sem flakiness. Único achado é Minor (acessibilidade de foco no skip link), não-bloqueante — registrar como débito técnico a corrigir antes do próximo audit de acessibilidade.

Decisão humana (se PARTIAL): N/A — status é PASS.
