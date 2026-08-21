---
title: "Redesign completo — andersonrafhael.requiemcompany.com.br"
date: 2026-08-21
status: aprovado para execução (decisão do autor: "liberdade criativa, finalizar só com o site no ar")
size: L
supersedes: docs/plans/site-design.md (2026-05-13) — mantido como histórico
---

# Design doc — a vitrine

## 1. Problema

O site existe em código desde maio/2026 e **nunca esteve no ar**: o container responde no VPS
(`HTTP 200` via `--resolve`), mas o registro DNS `andersonrafhael.requiemcompany.com.br` não
existe na zona Cloudflare. O conteúdo ficou congelado em maio e hoje **contradiz decisões
registradas** no dossiê (DEC-001…021, 2026-07/08): nomeia o UniPass como "SGTU — transporte
escolar", vende CIRIS como produto em beta, atribui ao autor métricas de projetos em que ele é
gerente de produto, cita venue de paper superado (SBES 2026) e linka para dois domínios mortos
(`requiemcompany.com.br`, `rhema.requiemcompany.com.br`). Um jornalista ou secretário municipal
que checasse o site hoje encontraria exatamente o tipo de inconsistência que o dossiê Forbes
existe para evitar.

Visualmente o site é competente (editorial dark, void/violet/mint) mas genérico onde importa:
hero sem prova, cards idênticos em grade 3×3, terminal fabricado como ornamento, seção
"Escrita — em breve" com quatro artigos publicados, sem rodapé, sem imagem de produto em lugar
nenhum.

## 2. Audiência e ação (inalterado do doc de maio, reordenado pela evidência)

| Audiência | O que precisa ver em 10 segundos | Ação desejada |
| --- | --- | --- |
| Gestores públicos / secretarias | produto real, papel claro, contexto institucional | iniciar conversa |
| Jornalistas / jurados | narrativa verificável, números com fonte, papéis nomeados | citar com segurança |
| Ecossistema / investidores | portfólio multi-vertical em operação, método, bootstrap | perceber autoridade |
| Comunidade técnica | profundidade: escrita, pesquisa, método (Forge/RHEMA) | seguir / ler |

## 3. Constraints (novos, derivados do diagnóstico)

1. **Verificabilidade acima de impacto.** Toda afirmação quantitativa nomeia a fonte ou o papel.
   Métrica âncora X **não é publicada** (X = 0 até o go-live — DEC-006).
2. **Papéis.** Sigma, UniPass, SGDI, MicroRed, Synapse Lab, RHEMA, Requiem Forge → fundador /
   arquiteto. CultBR, SPTE/IAFREE → **gerente de produto (NEES/UFAL)**, sempre nomeado (DEC-009).
3. **Tela Brasil sai do site** até checagem jurídica (trava TED/Serpro até mar/2027 — vault
   `001-projects/tela-brasil/context.md`). Volta como item de Tier 2 quando liberado.
4. **CIRIS** aparece só como "próximo produto, em concepção" (DEC-018). Sem página.
5. **HCA não é cliente** — "hospital público parceiro do piloto". Nenhum município nomeado como
   implantado. Nada de "Emprego é estado transitório" (DEC-021). Nenhuma frase entre aspas como
   voz do Anderson que não venha do CLAUDE.md (lema) ou dos artigos publicados.
6. **Domínios mortos não são linkados.** `requiemcompany.com.br` (DEC-017: não há site
   institucional canônico) e `rhema.requiemcompany.com.br` saem; "Requiem Company" vira âncora
   para `/sobre#requiem`.
7. **Repositório é público.** Nada do starter pack do Forge, nenhuma PII em capturas, IP do VPS
   fora do código (fica em variável de ambiente e no cofre).
8. **Stack fixa:** Next.js 16.2 App Router, React 19.2, TS strict, Tailwind v4, MDX. Deploy:
   Docker standalone + Traefik (já provisionado). Sem CMS, sem analytics com cookie.
9. **Barra mecânica (Classe A):** `scripts/gauntlet/check.mjs` — Lighthouse mobile ≥ 90/100/95/100,
   desktop ≥ 95/100/95/100, axe WCAG 2.2 AA zero violações em todas as rotas, contrato HTML/SEO,
   teclado, zero links internos quebrados. Contrato: `loop-contract.json` (validado).

## 4. Direção visual — "instrumento editorial"

A identidade (void/violet/mint, Dune Rise + Space Grotesk + Inter + JetBrains Mono) **permanece**:
é a identidade real dos produtos (RHEMA, Synapse, landing do Sigma). O que muda é o registro —
de "template dark com cards" para **instrumento de precisão com voz editorial**:

- **Tipografia como estrutura.** Display enorme e apertado (Space Grotesk 700, tracking −0.04em)
  para afirmações; mono em caixa-alta com tracking largo para *legendas de espécime* (rótulos,
  índices `01 —`, estados, coordenadas). Georgia itálica só em títulos de páginas internas (já
  existe, funciona como contraponto humano).
- **Prova no lugar de ornamento.** O terminal fabricado e as bolhas de gradiente saem. Entram
  **capturas reais** dos produtos (landing do Sigma, painel do UniPass, app e gestão do MicroRed,
  espécimes de design do Sigma rotulados como estudo, login do CultBR em domínio federal), em
  molduras finas com grain, com legenda mono e data de captura.
- **Grade assimétrica por seção.** Hero 7/5, produtos em linhas alternadas (texto × captura),
  método em 3 colunas desiguais, manifesto em coluna estreita centrada. Nada de 3 cards iguais.
- **Superfícies.** `void-deep` no body, `void` nas seções, hairlines `border` de 1px, glass CSS
  discreto (sem WebGL — decisão §6), grain SVG a 3–4 % sobre hero e capturas.
- **Motion, CSS-first.** Reveals por `IntersectionObserver` (≈1 KB) + transições de `opacity`/
  `transform`; stagger por `--i`; hover com tilt sutil nas capturas; barra de progresso de leitura
  nos artigos; `prefers-reduced-motion` zera tudo. View Transitions entre rotas se o Next 16
  instalado as suportar de forma estável (pesquisa R3); caso contrário, fade curto via CSS.
- **Cor de estado com texto.** Todo dot de status vem acompanhado de rótulo (WCAG 1.4.1).
  Categorias por cor **e** texto. Contrastes recalculados (pesquisa R4) — o `muted` atual
  (#938ea0 sobre #131318 ≈ 5,4:1) passa; `/55` e `/60` de foreground não passam em texto pequeno
  e sobem para ≥ `/70`.

## 5. Arquitetura de informação

```
/                      Hero (prova) → Instituições → Produtos (4 linhas) → Método → Manifesto
                       → Escrita & Pesquisa → Trajetória → CTA → Footer
/projetos              Requiem Company (fundador) · NEES/UFAL (gestão de produto)
                       · Infraestrutura interna · Em concepção
/projetos/[slug]       Problema → Abordagem → Estado e escala → Aprendizado · galeria · stack
                       · papel · links · "relacionados"
/escrita               lista editorial (4 artigos) + RSS
/escrita/[slug]        artigo com barra de progresso, sumário, próximo artigo, JSON-LD Article
/pesquisa              pipeline corrigido (ICSE-SEIP 2027 em escrita; SLR do SGDI; ideações),
                       publicações em coautoria (NEES), interesses, afiliação, Lattes
/sobre                 bio · Requiem Company (#requiem) · Agora (foco do trimestre) · como
                       trabalho · stack · valores · lema
/contato               canais + "sobre o que conversar"
/feed.xml · /sitemap.xml · /robots.txt · /manifest.webmanifest · /llms.txt
/opengraph-image (+ por projeto e por artigo)
```

Slugs: `sgtu` → `unipass` (redirect permanente em `next.config.ts`). `tela-brasil` removido
(404 honesto; nunca foi indexado). Páginas individuais: sigma, unipass, sgdi, microred,
synapse-lab, rhema, requiem-forge, cultbr, spte-iafree (9). Sem página: CIRIS, Financial Hub,
ChatDigi, Nexus (lista "em concepção / outras verticais").

## 6. Decisões

| # | Decisão | Alternativas | Por quê |
| --- | --- | --- | --- |
| D1 | **Remover o Liquid Glass WebGL** (`@ybouane/liquidglass`) e voltar a glass CSS | manter como progressive enhancement | 4 cenas WebGL num site estático para efeito de refração que já custou uma sessão ("milky-white"); contraria o doc de maio ("sem Three.js"); risco de LCP/INP e de contraste; a barra exige ≥ 90 mobile. A decisão é confirmada pela rodada 0 do gauntlet (ver `verify.md`). |
| D2 | **Motion CSS-first; remover `framer-motion`** | manter FM | Toda seção virou *client component* por causa do FM; um site estático não precisa de 40 KB de runtime para fade-ups. IO + CSS dá o mesmo resultado com HTML server-rendered (melhor LCP, menos JS, sem flash). |
| D3 | **Capturas reais como imagem de produto** (`next/image`, WebP, static import) | ilustrações/3D | É o que um jornalista e um gestor precisam ver; é verificável (legenda com URL e data). |
| D4 | **Dados de projeto ricos no data layer** (problema/abordagem/estado/aprendizado/galeria/papel/links/período) | MDX por projeto | tipagem forte, sitemap/OG/JSON-LD derivam do mesmo objeto; 9 páginas não justificam pipeline MDX extra. |
| D5 | **SEO estrutural completo**: metadata por rota, OG por rota, JSON-LD (Person + Organization + WebSite no layout; BreadcrumbList, Article, CollectionPage), RSS, manifest, llms.txt | só metadata básica | custo baixo, é o que distingue um site que aparece para "Anderson Rafhael" de um que não aparece. |
| D6 | **Deploy em duas camadas**: `infra/deploy.sh` (manual, IP via env) + GitHub Action `deploy.yml` (`workflow_dispatch` + push em `main`, secrets `VPS_HOST`/`VPS_SSH_KEY`) | só manual | remove o gargalo "só o Anderson no terminal"; a Action fica inerte até os secrets existirem. |
| D7 | **Forge bootstrapado localmente, starter pack gitignored** | commitar `.claude/` | repo público; metodologia é ativo da Requiem e base de paper. |
| D8 | **Não onboardar no DevOps Core nesta sessão** | criar projeto + rota | o NPM do DevOps Core disputaria :80/:443 com o Traefik que sustenta Sigma/UniPass no mesmo VPS (incidente nginx×Traefik de 2026-06-08). Decisão de infra compartilhada é do Anderson. |

## 7. Conteúdo — correções obrigatórias (fonte: perfil 2026-08-07 + decisions.md)

| Onde | Hoje | Passa a |
| --- | --- | --- |
| hero/metrics | "R$2,98bi em políticas culturais geridas" | sai do hero; vai para a página do CultBR com papel e fonte (artigo DGO 2026) |
| hero/metrics | "4 papers publicados" | "4 artigos em coautoria (NEES/UFAL)" na seção de pesquisa |
| projects | SGTU · transporte escolar | **UniPass — Passaporte Universitário** · transporte universitário; escolar depois do go-live |
| projects | Sigma · "gestão urbana georreferenciada" | Sigma · **gestão de sinalização viária**, ciclo completo |
| projects | CIRIS · beta · produto | em concepção, próximo produto (sem página) |
| projects | RHEMA · "submetido ao SBES 2026" · link morto | framework em produção no Forge; paper em escrita → ICSE-SEIP 2027 |
| projects | SGDI · "em POC com hospital público" | S0 entregue; validação de campo concluída (07/2026) com hospital público parceiro |
| projects | Tela Brasil | removido (trava jurídica) |
| projects | MicroRed · "em plena operação" | plataforma + app + simulador OCPP; site público `mred.com.br` |
| pesquisa | 4 papers no pipeline com venues errados | RHEMA → ICSE-SEIP 2027 (escrita); SLR SGDI (JBI); avaliação SGDI (2027+); MicroRed OCPP e DocArch (ideação) |
| pesquisa | Lattes placeholder | URL real se verificada (R6); senão remove |
| nav/sobre | link para `requiemcompany.com.br` | âncora interna `/sobre#requiem` |
| writing-research | "Em breve." | últimos 3 artigos reais |
| sobre | "Em 2024 fundei" | mantido (correção explícita de maio: 2022→2024); divergência com o perfil registrada no relatório para ratificação |

## 8. Success criteria

Mecânicos (Classe A — `outcomes.md`): gauntlet PASS · `npm run quality` verde · Playwright verde ·
contrato de loop válido · zero PII em `src/assets` · sem IP literal em `infra/` · `git push` feito.

De produto (Classe B — revisor de contexto limpo + Anderson): zero afirmações sem fonte; papel
nomeado em toda menção NEES; cada produto com captura real; copy sem AI-tells; mobile real
verificado; site no ar na URL pública (depende de DNS — item do Anderson).

## 9. Fora de escopo (explícito)

Foto profissional (não existe em disco) · novos ensaios (voz autoral) · analytics · newsletter ·
i18n · onboarding no DevOps Core · página da métrica âncora (X = 0).
