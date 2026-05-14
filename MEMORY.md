# MEMORY — andersonrafhael portfolio

> Atualizado: 2026-05-14 | Branch: main | Último commit: 733265f

## Estado atual

Site de portfólio pessoal de Anderson Rafhael — conteúdo real escrito, MDX funcional, visual da hero atualizado.

### O que está pronto

| Arquivo / área | Status | Observações |
|----------------|--------|-------------|
| `src/data/projects.ts` | ✅ | 9 projetos + CIRIS; descrições densas |
| `src/data/metrics.ts` | ✅ | 4 métricas: 5+ municípios, R$2,98bi, 4 papers, 2022 |
| `src/app/sobre/page.tsx` | ✅ | Timeline 2021→2026, bio com refs acadêmicas |
| `src/app/pesquisa/page.tsx` | ✅ | 4 papers pipeline + seção publicados |
| `src/app/escrita/page.tsx` | ✅ | Lista posts via `getAllPosts()` (MDX) + 15 tópicos editoriais |
| `src/app/escrita/[slug]/page.tsx` | ✅ | Rota dinâmica MDX — renderiza posts de `src/content/posts/` |
| `src/lib/posts.ts` | ✅ | `getAllPosts()` + `getPost(slug)` — lê frontmatter dos .mdx |
| `mdx-components.tsx` | ✅ | Componentes MDX (tipografia, code, etc.) |
| `src/content/posts/` | ✅ | 4 artigos MDX publicados (sessão 2026-05-14) |
| `src/app/contato/page.tsx` | ✅ | Completo |
| `src/components/editorial-facts.tsx` | ✅ | 4 fatos com métricas reais |
| `src/components/constellation-canvas.tsx` | ✅ | Canvas estilo RHEMA (38 pts, drift 0.00018, violet + mint) |
| `src/components/hero.tsx` | ✅ | Grid removido; usa ConstellationCanvas |
| `src/components/terminal-typewriter.tsx` | ✅ | Cursor pisca indefinidamente ao final |

### O que falta

1. **Títulos exatos dos 4 papers publicados** — `pesquisa/page.tsx` → array `published`. Verificar Lattes.
2. **URL do Currículo Lattes** — `pesquisa/page.tsx` line ~128: trocar pelo link real.
3. **URL do SGDI** — `projects.ts` sem URL (ainda POC).
4. **Foto/avatar em `/sobre`** — página sem imagem (opcional).
5. **CIRIS** — descrição pode enriquecer quando o produto tiver mais definição pública.

## Stack & convenções

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind v4 CSS-first (`@theme` em `globals.css`)
- shadcn/ui new-york · Named exports exceto pages/layouts · `@/` aliases
- MDX via `@next/mdx` — posts em `src/content/posts/*.mdx`

## Tokens de design (globals.css)

- `--color-void-deep: #0e0e13` — fundo do body
- `--color-void: #131318` — fundo de `.section-outer` (degrau de contraste)
- `.section-outer` tem `background-color: var(--color-void)` para contraste vs body
- `.px-site`, `.hero-headline`, `.hero-subline`, `.section-heading` — utilitários

## Constellation canvas (hero)

Abordagem RHEMA (discreta), não Synapse (imersiva):
- 38 pontos, drift `0.00018` (quase estático)
- `LINK_DISTANCE = 0.17` normalizado — conexões esparsas
- Cores: beacon/link far → `rgba(139, 92, 246, ...)` · link near → `rgba(143, 214, 168, ...)`
- `absolute inset-0` dentro da `<section>` hero, `opacity-50`
- Sem glow, pulsos ou cometas

## Histórico de commits relevantes

```
733265f feat(hero): add constellation canvas and improve legibility
7ee9d61 feat(escrita): add MDX rendering pipeline and dynamic article route
42e06b7 content(components): apply content corrections from previous session
26be558 content(escrita): add 4 MDX articles for /escrita section
0d8b938 content(homepage): fix manifesto outdated data — 2022→2024
ae32ca0 content(site): audit and correct data, narrative and layout across all sections
25b2ef0 feat(site): add OG image, SEO metadata, avatar initials and scroll animations
```

## Dev server

```bash
kill -9 $(lsof -ti:3000) && npm run dev
```
