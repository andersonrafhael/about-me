# MEMORY — andersonrafhael.requiemcompany.com.br

**Última atualização:** 2026-05-13
**Sessão atual:** Site pessoal Anderson Rafhael — implementação em andamento

---

## Estado atual das tasks

| Task | Status | Notas |
| --- | --- | --- |
| 1 — Init Next.js | ✅ | Next.js 16.2.6, shadcn/ui new-york |
| 2 — Design System globals.css | ✅ | void/violet/mint, Dune Rise @font-face |
| 3 — Fontes next/font | ✅ | Inter, Space Grotesk, JetBrains Mono |
| 4 — Nav | ✅ | 3-col grid, live BRT clock, links numerados |
| 5 — Hero | ✅ | Option B: "Infraestrutura digital." + sidebar BASE/COORD/FOCO/CAPITAL |
| 6 — ProjectCard | ✅ | glass-card, status dot, category badge colorido |
| 7 — /projetos | ✅ | Grid com Tier 1 + Tier 2, filtro visual por tier |
| 8 — /projetos/[slug] | ✅ | Página individual, generateStaticParams |
| 9 — /sobre | ✅ | Editorial title, section-grid, bio validada |
| 10 — /contato | ✅ | 4 canais, hover interaction |
| 11 — /pesquisa | ✅ | SBES 2026, interesses, afiliação UFAL |
| 12 — /escrita | ✅ | Empty state elegante, tópicos planejados |
| 13 — TerminalTypewriter | ✅ | Sem estado duplicado, done derivado |
| 14 — Homepage expandida | ✅ | 6 seções: Hero → FeaturedProjects → Manifesto → WritingResearch → EditorialFacts → HomeCTA |
| 15 — Legibilidade | ✅ | text-foreground/X em todo texto secundário |
| 16 — Font revert | ✅ | Playfair removido, Dune Rise restaurado |
| 17 — Metadata + OG | ⬜ | Próxima priority |
| 18 — Sitemap + robots | ⬜ | |
| 19 — Deploy Vercel | ⬜ | Requer: foto, 3 essays, municípios confirmados |

---

## Decisões tomadas

### Tagline hero

> "Infraestrutura digital. / de ponta para gestão pública, saúde e mobilidade."

### Stack

Next.js 16.2.6 · React 19.2.4 · TypeScript strict · Tailwind v4 · shadcn/ui new-york · Framer Motion · MDX nativo · Vercel

### URL

`andersonrafhael.requiemcompany.com.br`

### Paleta (Antigravity — Dune Rise + void/violet/mint)

```css
--void:         #131318;
--surface:      #1f1f25;
--primary:      #8b5cf6;
--mint:         #8fd6a8;
--foreground:   #e4e1e9;
--border:       #252533;
```

**Legibilidade:** usar `text-foreground/{opacity}` para texto secundário — NÃO usar `text-muted` ou `text-muted-2` diretamente (conflito de token com shadcn compat no @theme inline).

### Tipografia

| Papel | Fonte |
| --- | --- |
| Display / wordmark | Dune Rise (local TTF — `public/fonts/Dune_Rise.ttf`) |
| Headline | Space Grotesk |
| Body | Inter |
| Mono | JetBrains Mono |

### Sistema de cores por categoria de projeto

| Categoria | Cor |
| --- | --- |
| GovTech | violet `#8b5cf6` |
| EdTech | mint `#8fd6a8` |
| IA | violet-300 |
| Infra/CleanTech | emerald-400 |
| Pesquisa | amber-400 |

### Layout /projetos

Grid de cards (Tier 1 primeiro, Tier 2 com badge "PM") — já implementado.

### Layout hero

Option B aprovado — implementado:

- Display (enorme, Dune Rise): "Infraestrutura digital."
- Subtitle (italic display): "de ponta para gestão pública, saúde e mobilidade." (keywords com underline violet)
- Sidebar: STATUS card + meta list (BASE/COORD/FOCO/CAPITAL) + terminal typewriter

### Nav

- Clock: `America/Fortaleza` (UTC-3, substituto confiável de `America/Maceio`)
- Links numerados: 01–05

---

## Estrutura da homepage

```text
/ (page.tsx)
├── Hero               — hero.tsx
├── FeaturedProjects   — featured-projects.tsx (Sigma, RHEMA, MicroRed)
├── Manifesto          — manifesto.tsx (citação + 3 marcadores)
├── WritingResearch    — writing-research.tsx (escrita + pesquisa díptico)
├── EditorialFacts     — editorial-facts.tsx (4 fatos #01–#04)
└── HomeCTA            — home-cta.tsx
```

---

## Projetos no data layer

**Tier 1 (builder):** sigma, sgtu, synapse-lab, rhema, microred, sgdi

**Tier 2 (PM — NEES/UFAL):** spte-iafree, cultbr, tela-brasil

---

## Pendências críticas antes do go-live

- [ ] **Número real de municípios** — "5+" no hero não confirmado. Anderson deve confirmar count atual.
- [ ] **Foto profissional** — `public/foto.jpg` — não bloqueia dev
- [ ] **3 essays em /escrita** — requisito go-live do design doc
- [ ] **LinkedIn URL** — confirmar `linkedin.com/in/andersonrafhael`
- [ ] **Email** — confirmar `anderson@requiemcompany.com.br`

---

## Documentos do projeto (todos migrados para cá)

- Design doc: `docs/plans/site-design.md`
- Plano de implementação: `docs/plans/site-plan.md`
- Perfil consolidado: `~/Desktop/Antigravity/second-brain/003-resources/anderson-perfil-consolidado.md`
- Prompts Claude Design: `docs/design/claude-design-prompts.md`
- Referência HTML: `claude-design/V1 _ VOID _ editorial assim_trico.html`

---

## Forge Upstream

- **[2026-05-13 convention]** Token `text-muted` conflita com shadcn compat no `@theme inline` — usar `text-foreground/{opacity}` para texto secundário em projetos com shadcn
  - Target: `forge-conventions` Seção 5
  - Prioridade: P2