# MEMORY — andersonrafhael portfolio

> Atualizado: 2026-05-14 | Branch: main | Último commit: f31664d

## Estado atual

Site de portfólio pessoal de Anderson Rafhael — **conteúdo real escrito e commitado**.

### O que está pronto

| Arquivo | Status | Observações |
|---------|--------|-------------|
| `src/data/projects.ts` | ✅ Conteúdo real | 9 projetos + CIRIS; descrições densas com contexto institucional |
| `src/data/metrics.ts` | ✅ Conteúdo real | 4 métricas: 5+ municípios, R$2,98bi, 4 papers, 2022 fundada |
| `src/app/sobre/page.tsx` | ✅ Conteúdo real | Timeline 2021→2026 (10 eventos), bio com refs acadêmicas |
| `src/app/pesquisa/page.tsx` | ✅ Conteúdo real | 4 papers pipeline + seção publicados (venue/ano, ref Lattes) |
| `src/app/escrita/page.tsx` | ✅ Conteúdo real | 15 tópicos em 5 pilares (do POSITIONING.md) |
| `src/app/contato/page.tsx` | ✅ Completo | Sem alterações necessárias |
| `src/components/editorial-facts.tsx` | ✅ Conteúdo real | 4 fatos com métricas reais (R$2,98bi, 4 papers) |

### O que falta

1. **Títulos exatos dos 4 papers publicados** — listados por venue/ano em `pesquisa/page.tsx` → array `published`. Verificar no Currículo Lattes e completar com títulos reais se quiser exibi-los como entradas completas.

2. **URL do Currículo Lattes** — `pesquisa/page.tsx` line ~128: `href="https://lattes.cnpq.br"` — trocar pela URL real do Lattes de Anderson.

3. **Posts reais em `/escrita`** — `posts: Post[] = []` ainda vazio. Quando o primeiro artigo for escrito, adicionar no array ou migrar para MDX.

4. **URL do SGDI** — `projects.ts` não tem URL para SGDI (ainda em POC). Adicionar quando disponível.

5. **Foto/avatar em `/sobre`** — página não tem imagem. Opcional mas valoriza.

6. **CIRIS — descrição pode evoluir** — adicionado com descrição genérica (camada de inteligência institucional). Enriquecer quando o produto tiver mais definição pública.

## Stack & convenções

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind v4 CSS-first (`@theme` em `globals.css`)
- shadcn/ui new-york
- Named exports exceto pages/layouts
- `@/` aliases

## Tokens de design (globals.css)

Tokens adicionados nas últimas sessões:
- `--color-fg-dim` — texto ainda mais suave que `text-muted`
- `.px-site` — padding horizontal padrão do site
- `.hero-headline`, `.hero-subline` — escalas tipográficas hero
- `.section-heading` — heading de seção

## Historial de commits relevantes

```
f31664d content(portfolio): write full site content from real sources
ace560a refactor(ui): reduce type scale and simplify hero density
5d6a0ec chore(project): add design artifacts, docs and project config
7769c95 feat(site): evolve DS, nav, hero and add homepage sections + inner pages
```

## Dev server

```bash
npx next dev --port 3000   # matar porta antes se necessário
```
