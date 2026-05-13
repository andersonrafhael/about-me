# Continuation Prompt — andersonrafhael.requiemcompany.com.br

> **Como usar:** Abra o Claude Code com `cwd` apontando para
> `/Users/user1/Desktop/Antigravity/andersonrafhael/` e cole o prompt abaixo.

---

## Prompt

```text
Contexto: estou construindo meu site pessoal em /Users/user1/Desktop/Antigravity/andersonrafhael/.
É um Next.js 16 + Tailwind v4 + shadcn/ui new-york com design system void/violet/mint (Antigravity).

Estado atual (2026-05-13):
- Tasks 1–16 concluídas — todas as páginas implementadas e homepage expandida
- Homepage tem 6 seções: Hero → FeaturedProjects → Manifesto → WritingResearch → EditorialFacts → HomeCTA
- Fonte display: Dune Rise (local TTF), headline: Space Grotesk, body: Inter, mono: JetBrains Mono
- Legibilidade corrigida: usar text-foreground/{opacity}, nunca text-muted diretamente
- Documentos do projeto estão em docs/plans/ (site-design.md e site-plan.md)
- MEMORY em .claude/MEMORY.md tem estado completo

Próximas tasks pendentes:
- Task 17: Metadata + Open Graph (opengraph-image.tsx, completar layout metadata)
- Task 18: Sitemap (src/app/sitemap.ts) + robots (src/app/robots.ts)
- Task 19: Deploy Vercel + domínio andersonrafhael.requiemcompany.com.br

Pendências de conteúdo antes do go-live:
- Confirmar número real de municípios (hero metrics, atualmente "5+")
- Foto profissional em public/foto.jpg
- 3 essays em /escrita (requisito do design doc)
- Confirmar LinkedIn URL e email de contato

Leia o MEMORY em .claude/MEMORY.md e o design doc em docs/plans/site-design.md antes de continuar.
Por onde quer começar?
```

---

## Arquivos-chave para consulta rápida

| Arquivo | Função |
| --- | --- |
| `.claude/MEMORY.md` | Estado completo + decisões |
| `docs/plans/site-design.md` | Spec de design e conteúdo |
| `docs/plans/site-plan.md` | Plano de implementação task-by-task |
| `src/app/globals.css` | Design tokens (@theme inline) |
| `src/app/layout.tsx` | Fonts + metadata base |
| `src/components/hero.tsx` | Hero com Option B |
| `src/data/projects.ts` | Data layer dos projetos |
| `src/app/page.tsx` | Composição da homepage |

## Componentes da homepage

| Componente | Path |
| --- | --- |
| Hero | `src/components/hero.tsx` |
| FeaturedProjects | `src/components/featured-projects.tsx` |
| Manifesto | `src/components/manifesto.tsx` |
| WritingResearch | `src/components/writing-research.tsx` |
| EditorialFacts | `src/components/editorial-facts.tsx` |
| HomeCTA | `src/components/home-cta.tsx` |

## Convenções críticas

- `text-foreground/{opacity}` para texto secundário (ex: `text-foreground/65`) — nunca `text-muted`
- `glass-card` = classe CSS com rgba(31,31,37,0.618) + border violet translúcido
- Fontes: `font-display` (Dune Rise), `font-headline` (Space Grotesk), `font-mono` (JetBrains)
- Clock nav: `America/Fortaleza` (não `America/Maceio`)
