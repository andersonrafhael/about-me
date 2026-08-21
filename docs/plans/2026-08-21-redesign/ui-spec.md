# UI spec — contrato entre orquestrador e subagents

> Leia inteiro antes de escrever qualquer página. Tudo que está aqui já existe no código; a sua
> página **consome**, não redefine. Nada de cores, fontes ou sombras novas.

## Stack e regras

- Next.js 16.2 App Router, React 19.2, TS strict, Tailwind v4 (tokens em `src/app/globals.css`).
- Server Components por padrão. `"use client"` só quando há estado/efeito (ex.: barra de progresso).
- Named exports (exceto `page.tsx`, `layout.tsx`, `opengraph-image.tsx`, `route.ts`, `not-found.tsx`).
- `@/` aliases. Union types. kebab-case. Zero `any`. Zero framer-motion, zero `@ybouane/liquidglass`
  (as libs estão sendo removidas — não importe nada delas nem de `glass-*`/`animated-section`).
- Texto em pt-BR (AO 2009), sem AI-tells: não use "de ponta", "impacto real", "utilidade real",
  "não é X, é Y" em sequência, tricolons com anáfora ("sobre X, sobre Y, sobre Z"), emojis.
- **Fatos vêm dos dados** (`src/data/*.ts`). Não invente número, cliente, município, venue ou data.
  Papéis: projetos do grupo `nees` sempre mostram `project.role` e `project.institution`.

## Tokens e classes (globals.css)

| Uso                      | Classe / token                                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fundo da página          | body já é `bg-void-deep`; seções alternadas: `.section-alt` (void)                                                                                                  |
| Espaçamento de seção     | `.section` (padding inline + block fluido) · `.px-site` · `.pt-page` (páginas internas) · `.container-site` (max 1440)                                              |
| Título de página interna | `<h1 className="editorial-title">Projetos<span className="punct">.</span></h1>`                                                                                     |
| Título de seção          | `<SectionHeader index="02" eyebrow="..." title={<>Texto<span className="punct">.</span></>} aside="..." />` de `@/components/ui/section-header`                     |
| Display livre            | `.display` + `.section-heading` / `.hero-headline`                                                                                                                  |
| Rótulos mono             | `.mono-label` (11px) · `.mono-sublabel` (10px)                                                                                                                      |
| Lede                     | `.lede`                                                                                                                                                             |
| Texto secundário         | `text-foreground/75` (padrão) · mínimo absoluto `text-foreground/60`. **Nunca** `text-muted-2`, `text-muted-3`, `text-primary` em texto pequeno, nem opacidade < 60 |
| Violeta em texto         | `text-primary-text` (links, estados ativos, índices) · `text-primary` só em glifos ≥ 24px (o ponto final dos títulos)                                               |
| Links em prosa           | `.link-quiet` ou `.prose-custom a` (sublinhado obrigatório)                                                                                                         |
| Botões                   | `.btn .btn-primary` / `.btn .btn-ghost` (min-height 44px já incluso)                                                                                                |
| Chips                    | `.chip` · status de projeto: `<StatusBadge status={p.status} />` de `@/components/ui/status-badge`                                                                  |
| Superfícies              | `.surface` (card sólido, hairline) + `.surface-hover` · `.glass` (translúcido, só sobre imagem/gradiente) · `.hairline` (border-top)                                |
| Capturas                 | `<ProductFrame item={media.x} sizes="..." />` de `@/components/ui/product-frame` (usa `next/image` com blur) — legenda de proveniência automática                   |
| Reveal                   | `<Reveal>` / `<Reveal delay={80} from="left">` de `@/components/reveal` — envolva blocos, não cada linha; stagger com `delay` de 60–90 ms                           |
| Numeral decorativo       | `.numeral` com `aria-hidden`, `fontSize` via style (clamp)                                                                                                          |
| Grid 220px + prosa       | `.section-grid` (usado em pesquisa/sobre)                                                                                                                           |
| Prosa                    | `.prose-article` (MDX) · `.prose-custom` (parágrafos curtos)                                                                                                        |

## Esqueleto de página interna

```tsx
export const metadata = pageMetadata({ title, description, path });   // de "@/lib/seo"
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumb([...])) }} />
      <div className="container-site px-site">
        <div className="pt-page mb-12">
          <nav aria-label="Trilha" className="mono-label flex items-center gap-2.5">
            <Link href="/" className="text-foreground/70 transition-colors hover:text-fg-bright">Início</Link>
            <span className="text-muted-2" aria-hidden>/</span>
            <span className="text-foreground">Projetos</span>
          </nav>
        </div>
        <header className="mb-[clamp(48px,7vh,88px)] grid gap-6 border-b border-border pb-[clamp(32px,5vh,56px)] md:grid-cols-[1fr_auto] md:items-end">
          <h1 className="editorial-title">Projetos<span className="punct">.</span></h1>
          <p className="lede md:text-right">…</p>
        </header>
        …seções…
      </div>
    </>
  );
}
```

- `<main>` já existe no layout. **Não** crie outro `<main>`; exatamente um `<h1>` por página.
- `metadata`: use `pageMetadata()` (`@/lib/seo`) — canonical/OG/Twitter saem certos. Descrição
  entre 70 e 160 caracteres, título ≤ 60.
- JSON-LD: `breadcrumb()`, `collectionPage()`, `blogPosting()`, `creativeWork()`, `profilePage()` de
  `@/lib/json-ld`; serialize com `serializeJsonLd()`.
- Links externos: `target="_blank" rel="noopener noreferrer"` + `<span className="sr-only"> (abre em nova aba)</span>`.
- Separadores decorativos (`/`, `·`) sempre com `aria-hidden`.
- Todo elemento interativo ≥ 44px de altura ou com padding equivalente.
- Imagens: sempre `ProductFrame` (nunca `<img>` cru). Sem imagem → não invente placeholder; use
  tipografia (lista de fatos, `.numeral`).

## Padrões visuais da direção "instrumento editorial"

- Assimetria: cabeçalho 1fr/auto; listas editoriais em linhas com índice mono (`01`, `02`) à
  esquerda, título headline, meta à direita; hairlines entre itens; hover discreto (`.surface-hover`).
- Nada de grade 3×3 de cards idênticos. Cards só quando há imagem ou diferenciação real.
- Motion: só `Reveal`; sem animação em hover além de cor/borda/translateY(-2px..-6px).
- Um `.numeral` grande por página no máximo.

## Verificação obrigatória do subagent

```bash
npx tsc --noEmit
npx eslint <seus arquivos> --max-warnings 0
npm run build 2>&1 | tail -25      # Turbopack; confirme suas rotas na árvore
```

Build quebrado por outra parte do site que não é sua: reporte o erro exato e siga; não conserte
arquivos fora do seu escopo.
