# Anderson Rafhael Site — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construir o site pessoal `andersonrafhael.requiemcompany.com.br` — plataforma de autoridade para Anderson Rafhael como founder/CEO da Requiem Company.

**Architecture:** Next.js 16+ App Router com SSG para todas as rotas públicas. Blog via MDX nativo (posts no Git). Design system herdado da paleta Antigravity (void/violet/mint). Deploy no Vercel com domínio customizado.

**Tech Stack:** Next.js 16+, TypeScript strict, Tailwind v4, shadcn/ui new-york, MDX, Vercel Analytics, `next/font`, Framer Motion (motion suave).

**Design doc:** `docs/plans/2026-05-13-anderson-rafhael-site-design.md`

---

## Pré-requisitos (manual — fora do plano)

- [ ] Criar repo `andersonrafhael` no GitHub pessoal (público)
- [ ] Criar projeto no Vercel apontando para o repo
- [ ] Configurar DNS: `andersonrafhael.requiemcompany.com.br` → Vercel
- [ ] Separar foto profissional aprovada (para `/public/foto.jpg`)
- [ ] Copiar `Dune_Rise.ttf` de `rhema/site/public/fonts/` para o novo projeto

---

## Phase 1 — Setup + Design System + Layout

*Output verificável: `npm run dev` roda sem erro, nav e footer renderizam com a paleta correta.*

### Task 1: Inicializar projeto Next.js

**Step 1: Criar projeto**
```bash
npx create-next-app@latest andersonrafhael \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
cd andersonrafhael
```

**Step 2: Verificar estrutura**
```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
```

**Step 3: Instalar dependências base**
```bash
npm install framer-motion
npx shadcn@latest init
# Escolher: new-york, CSS variables, yes para tudo
```

**Step 4: Instalar dependências de blog (MDX)**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install -D @types/mdx
```

**Step 5: Commit inicial**
```bash
git add -A
git commit -m "chore: init next.js project with shadcn/ui and mdx"
```

---

### Task 2: Design System — globals.css

**Files:**
- Modify: `src/app/globals.css`
- Create: `public/fonts/Dune_Rise.ttf` (copiar do RHEMA)

**Step 1: Substituir globals.css inteiro**

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* Dune Rise — wordmark e display exclusivo Requiem */
@font-face {
  font-family: "Dune Rise";
  src: url("/fonts/Dune_Rise.ttf") format("truetype");
  font-display: swap;
}

@theme inline {
  /* ─── FONTS ─── */
  --font-display: "Dune Rise", ui-sans-serif, system-ui, sans-serif;
  --font-headline: var(--font-space-grotesk, "Space Grotesk", ui-sans-serif, system-ui, sans-serif);
  --font-sans: var(--font-inter, "Inter", ui-sans-serif, system-ui, sans-serif);
  --font-mono: var(--font-jetbrains-mono, "JetBrains Mono", ui-monospace, monospace);

  /* ─── VOID SCALE (backgrounds) ─── */
  --color-void-deep:    #0e0e13;
  --color-void:         #131318;
  --color-surface-low:  #1b1b20;
  --color-surface:      #1f1f25;
  --color-surface-high: #2a292f;

  /* ─── PRIMARY — Violet ─── */
  --color-primary:      #8b5cf6;
  --color-primary-glow: rgba(137, 111, 255, 0.3);

  /* ─── ACCENT — Mint (live/ativo) ─── */
  --color-mint:         #8fd6a8;
  --color-mint-dark:    #6ea883;

  /* ─── TEXT ─── */
  --color-foreground:   #e4e1e9;
  --color-muted:        #938ea0;
  --color-border:       #252533;

  /* ─── SHADCN COMPATIBILITY ─── */
  --color-background:         #131318;
  --color-foreground:         #e4e1e9;
  --color-card:               #1f1f25;
  --color-card-foreground:    #e4e1e9;
  --color-popover:            #1f1f25;
  --color-popover-foreground: #e4e1e9;
  --color-primary-foreground: #ffffff;
  --color-secondary:          #1b1b20;
  --color-secondary-foreground: #e4e1e9;
  --color-muted:              #2a292f;
  --color-muted-foreground:   #938ea0;
  --color-accent:             #2a292f;
  --color-accent-foreground:  #e4e1e9;
  --color-destructive:        #f87171;
  --color-border:             #252533;
  --color-input:              #252533;
  --color-ring:               #8b5cf6;
  --radius:                   0.5rem;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-void text-foreground font-sans antialiased;
    letter-spacing: -0.01em;
  }
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 72px;
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }
}

@layer components {
  /* Glass card — padrão para cards de projeto */
  .glass-card {
    background: rgba(31, 31, 37, 0.618);
    border: 1px solid rgba(202, 190, 255, 0.15);
    box-shadow: 0 10px 30px rgba(137, 111, 255, 0.15);
    backdrop-filter: blur(12px);
  }

  /* Mint pulse — dot de status "ativo" */
  .mint-pulse {
    animation: mint-pulse 2.4s ease-in-out infinite;
  }
  @keyframes mint-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.6; transform: scale(1.3); }
  }
  @media (prefers-reduced-motion: reduce) {
    .mint-pulse { animation: none; }
  }

  /* Layout utilities CUBE CSS */
  .layout-flow    { display: flex; flex-direction: column; }
  .layout-cluster { display: flex; flex-wrap: wrap; align-items: center; }
}
```

**Step 2: Verificar no browser**
```bash
npm run dev
# localhost:3000 deve mostrar fundo #131318
```

**Step 3: Commit**
```bash
git add src/app/globals.css public/fonts/
git commit -m "feat(ds): add void/violet/mint design system tokens"
```

---

### Task 3: Configurar fontes via `next/font`

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Atualizar layout com fontes**
```tsx
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anderson Rafhael — Requiem Company",
    template: "%s | Anderson Rafhael",
  },
  description:
    "Engenheiro e fundador da Requiem Company. Construo infraestrutura digital para municípios brasileiros.",
  metadataBase: new URL("https://andersonrafhael.requiemcompany.com.br"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

**Step 2: Commit**
```bash
git add src/app/layout.tsx
git commit -m "feat(fonts): configure Inter, Space Grotesk and JetBrains Mono"
```

---

### Task 4: Nav component

**Files:**
- Create: `src/components/nav.tsx`

**Step 1: Criar componente**
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projetos", label: "Projetos" },
  { href: "/escrita", label: "Escrita" },
  { href: "/pesquisa", label: "Pesquisa" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass-card">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="layout-cluster gap-4">
          <Link
            href="/"
            className="font-display text-lg text-foreground hover:text-primary transition-colors"
          >
            AR
          </Link>
          <a
            href="https://requiemcompany.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Requiem Company ↗
          </a>
        </div>

        <ul className="layout-cluster gap-6 list-none">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors hover:text-foreground ${
                  pathname?.startsWith(href)
                    ? "text-foreground font-medium"
                    : "text-muted"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

**Step 2: Adicionar Nav ao layout**
```tsx
// em layout.tsx, dentro de <body>:
<Nav />
<main className="pt-16">{children}</main>
```

**Step 3: Verificar renderização**
- Nav fixo, dark, glass, links corretos

**Step 4: Commit**
```bash
git add src/components/nav.tsx src/app/layout.tsx
git commit -m "feat(nav): add fixed glass nav with Requiem Company link"
```

---

## Phase 2 — Home (Hero)

*Output verificável: hero renderiza com tagline, métricas e CTAs.*

### Task 5: Dados de métricas e projetos

**Files:**
- Create: `src/data/metrics.ts`
- Create: `src/data/projects.ts`

**Step 1: Criar métricas**
```ts
// src/data/metrics.ts
export const metrics = [
  { value: "10+", label: "municípios no Nordeste" },
  { value: "11", label: "projetos ativos" },
  { value: "2022", label: "fundada" },
] as const;
```

**Step 2: Criar lista de projetos**
```ts
// src/data/projects.ts
export type ProjectStatus = "ativo" | "beta" | "encerrado";
export type ProjectCategory = "GovTech" | "EdTech" | "IA" | "Infra" | "Pesquisa";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tagline: string;
  description: string;
  stack: string[];
  metrics?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "sigma",
    name: "Sigma",
    category: "GovTech",
    status: "ativo",
    tagline: "Gestão urbana georrefenciada para municípios.",
    description:
      "Sistema de gestão territorial com georeferenciamento, operação em campo, RBAC/ABAC e suporte multi-tenant para prefeituras.",
    stack: ["Next.js", "Django", "PostGIS", "Supabase"],
    metrics: "Municípios no interior de Alagoas",
  },
  {
    slug: "sgtu",
    name: "SGTU",
    category: "GovTech",
    status: "ativo",
    tagline: "Gestão de transporte escolar para municípios.",
    description:
      "Plataforma multi-tenant de gestão de frota, rotas e estudantes para secretarias municipais de educação.",
    stack: ["Next.js", "Django", "Supabase"],
    metrics: "Estudantes com transporte rastreável",
  },
  {
    slug: "synapse-lab",
    name: "Synapse Lab",
    category: "IA",
    status: "beta",
    tagline: "PKM inteligente com IA — notas, projetos, RAG local.",
    description:
      "Workspace colaborativo de gestão de conhecimento pessoal com IA embarcada, RAG local e features Sonda e Pulso.",
    stack: ["Next.js", "Supabase", "Claude API"],
  },
  {
    slug: "rhema",
    name: "RHEMA",
    category: "Pesquisa",
    status: "ativo",
    tagline: "Engenharia formal de requisitos — framework Requiem Forge.",
    description:
      "Framework de hierarquia verificável, maturidade cumulativa e degradação temporal para requisitos de software.",
    stack: ["Next.js", "TypeScript"],
    url: "https://rhema.requiemcompany.com.br",
  },
  {
    slug: "cultbr",
    name: "CultBR",
    category: "GovTech",
    status: "ativo",
    tagline: "Sistemas administrativos para gestão institucional cultural.",
    description:
      "Plataforma de governança institucional e gestão administrativa para entidades culturais públicas.",
    stack: ["Next.js", "Django", "Supabase"],
  },
  {
    slug: "spte-iafree",
    name: "SPTE / IAFREE",
    category: "EdTech",
    status: "ativo",
    tagline: "Tecnologia como proteção de trajetórias escolares.",
    description:
      "Sistema de prevenção à evasão escolar — identificação precoce de risco e intervenção assistida por dados.",
    stack: ["Django", "Supabase", "ML"],
  },
  {
    slug: "microred",
    name: "MicroRed",
    category: "Infra",
    status: "beta",
    tagline: "Mobilidade elétrica e ESS com protocolo OCPP.",
    description:
      "Plataforma para gestão de redes de mobilidade elétrica com armazenamento de energia e integração OCPP.",
    stack: ["Django", "OCPP", "IoT"],
  },
  {
    slug: "tela-brasil",
    name: "Tela Brasil",
    category: "GovTech",
    status: "beta",
    tagline: "Plataforma audiovisual pública — acesso e acessibilidade.",
    description:
      "Plataforma de distribuição de conteúdo audiovisual público com foco em acessibilidade e políticas culturais.",
    stack: ["Next.js", "Django"],
  },
];
```

**Step 3: Commit**
```bash
git add src/data/
git commit -m "feat(data): add projects and metrics data layer"
```

---

### Task 6: Hero section

**Files:**
- Create: `src/components/hero.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Criar Hero**
```tsx
// src/components/hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { metrics } from "@/data/metrics";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="layout-flow gap-8"
      >
        {/* Tagline principal */}
        <div className="layout-flow gap-4">
          <p className="text-sm text-muted font-mono tracking-widest uppercase">
            Anderson Rafhael · Requiem Company
          </p>
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight max-w-4xl">
            Construo infraestrutura digital para municípios brasileiros.
          </h1>
        </div>

        {/* Métricas âncora */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="layout-cluster gap-8"
        >
          {metrics.map(({ value, label }) => (
            <div key={label} className="layout-flow gap-1">
              <span className="font-mono text-2xl font-bold text-primary">
                {value}
              </span>
              <span className="text-xs text-muted">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="layout-cluster gap-4"
        >
          <Link
            href="/projetos"
            className="px-6 py-3 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver projetos
          </Link>
          <Link
            href="/escrita"
            className="px-6 py-3 border border-border text-foreground font-medium text-sm rounded-lg hover:border-primary/50 hover:text-primary transition-colors"
          >
            Ler artigos
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

**Step 2: Atualizar page.tsx**
```tsx
// src/app/page.tsx
import { Hero } from "@/components/hero";

export default function HomePage() {
  return <Hero />;
}
```

**Step 3: Verificar**
- Hero renderiza com fundo void, tipografia Space Grotesk, violet nos números
- Animações fade-up funcionam
- Layout responsivo em mobile

**Step 4: Commit**
```bash
git add src/components/hero.tsx src/app/page.tsx
git commit -m "feat(home): add hero with tagline, metrics and CTAs"
```

---

## Phase 3 — /projetos

*Output verificável: grid de cards com glass morphism, hover state, filtro por categoria.*

### Task 7: ProjectCard component

**Files:**
- Create: `src/components/project-card.tsx`

**Step 1: Criar card**
```tsx
// src/components/project-card.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const categoryColors: Record<string, string> = {
  GovTech: "text-primary border-primary/30",
  EdTech:  "text-mint border-mint/30",
  IA:      "text-violet-400 border-violet-400/30",
  Infra:   "text-amber-400 border-amber-400/30",
  Pesquisa:"text-sky-400 border-sky-400/30",
};

const statusLabel: Record<string, string> = {
  ativo:     "Ativo",
  beta:      "Beta",
  encerrado: "Encerrado",
};

export function ProjectCard({ project }: { project: Project }) {
  const { slug, name, category, status, tagline, stack } = project;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link href={`/projetos/${slug}`} className="block group">
        <article className="glass-card rounded-xl p-6 h-full layout-flow gap-4 hover:border-primary/30 transition-colors">
          {/* Header */}
          <div className="layout-cluster justify-between gap-2">
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded-full border ${categoryColors[category] ?? "text-muted border-border"}`}
            >
              {category}
            </span>
            <div className="layout-cluster gap-1.5">
              {status === "ativo" && (
                <span className="w-1.5 h-1.5 rounded-full bg-mint mint-pulse" />
              )}
              <span className="text-xs text-muted">{statusLabel[status]}</span>
            </div>
          </div>

          {/* Content */}
          <div className="layout-flow gap-2 flex-1">
            <h2 className="font-headline text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h2>
            <p className="text-sm text-muted leading-relaxed">{tagline}</p>
          </div>

          {/* Stack (visível no hover) */}
          <div className="layout-cluster gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {stack.map((tech) => (
              <span key={tech} className="text-xs font-mono text-muted/70">
                {tech}
              </span>
            ))}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
```

**Step 2: Commit**
```bash
git add src/components/project-card.tsx
git commit -m "feat(projects): add glass project card with hover state"
```

---

### Task 8: Página /projetos

**Files:**
- Create: `src/app/projetos/page.tsx`

**Step 1: Criar página**
```tsx
// src/app/projetos/page.tsx
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Portfólio completo de projetos da Requiem Company.",
};

export default function ProjetosPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="layout-flow gap-12">
        <div className="layout-flow gap-3">
          <h1 className="font-headline text-4xl font-bold text-foreground">
            Projetos
          </h1>
          <p className="text-muted max-w-xl">
            Infraestrutura digital construída para municípios, instituições e
            comunidades — do sertão nordestino ao ecossistema tech.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verificar**
- Grid de 3 colunas em desktop, 1 em mobile
- Cards com glass, hover com lift e border violet
- Mint pulse nos projetos ativos
- Nenhum erro TypeScript

**Step 3: Commit**
```bash
git add src/app/projetos/page.tsx
git commit -m "feat(projects): add projects listing page with grid"
```

---

### Task 9: Página individual /projetos/[slug]

**Files:**
- Create: `src/app/projetos/[slug]/page.tsx`

**Step 1: Criar dynamic route**
```tsx
// src/app/projetos/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { name, category, status, tagline, description, stack, metrics, url } =
    project;

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="layout-flow gap-10">
        {/* Breadcrumb */}
        <Link href="/projetos" className="text-sm text-muted hover:text-foreground transition-colors">
          ← Projetos
        </Link>

        {/* Header */}
        <div className="layout-flow gap-4">
          <div className="layout-cluster gap-3">
            <span className="text-xs font-mono text-muted border border-border px-2 py-0.5 rounded-full">
              {category}
            </span>
            <span className="text-xs text-muted capitalize">{status}</span>
          </div>
          <h1 className="font-headline text-4xl font-bold text-foreground">{name}</h1>
          <p className="text-lg text-muted">{tagline}</p>
        </div>

        {/* Descrição completa */}
        <div className="layout-flow gap-6 text-foreground/80 leading-relaxed">
          <p>{description}</p>
          {metrics && (
            <p className="font-mono text-sm text-primary border-l-2 border-primary pl-4">
              {metrics}
            </p>
          )}
        </div>

        {/* Stack */}
        <div className="layout-flow gap-3">
          <h2 className="text-sm font-mono text-muted uppercase tracking-widest">Stack</h2>
          <div className="layout-cluster gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1 rounded-full bg-surface border border-border text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Ver projeto ao vivo ↗
          </a>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Verificar**
- `/projetos/sigma` renderiza
- `/projetos/slug-inexistente` retorna 404
- `generateStaticParams` exporta todos os slugs

**Step 3: Commit**
```bash
git add src/app/projetos/
git commit -m "feat(projects): add individual project pages with static generation"
```

---

## Phase 4 — /escrita (Blog MDX)

*Output verificável: lista de posts renderiza, post individual renderiza MDX formatado.*

### Task 10: Configurar MDX no Next.js

**Files:**
- Modify: `next.config.ts`
- Create: `mdx-components.tsx` (raiz do projeto)

**Step 1: Configurar next.config.ts**
```ts
// next.config.ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
```

**Step 2: Criar mdx-components.tsx na raiz**
```tsx
// mdx-components.tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-headline text-3xl font-bold text-foreground mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-headline text-2xl font-semibold text-foreground mt-6 mb-3">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="text-foreground/80 leading-relaxed mb-4">{children}</p>
    ),
    code: ({ children }) => (
      <code className="font-mono text-sm bg-surface px-1.5 py-0.5 rounded text-mint">
        {children}
      </code>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-4 text-muted italic my-4">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
```

**Step 3: Commit**
```bash
git add next.config.ts mdx-components.tsx
git commit -m "feat(blog): configure MDX with custom components"
```

---

### Task 11: Estrutura de posts e metadata

**Files:**
- Create: `src/content/escrita/municipios-tecnologia.mdx`
- Create: `src/content/escrita/sgtu-transporte-escolar.mdx`
- Create: `src/content/escrita/infraestrutura-nordeste.mdx`
- Create: `src/lib/posts.ts`

**Step 1: Criar lib/posts.ts para leitura de metadados**
```ts
// src/lib/posts.ts
import { readdir } from "fs/promises";
import path from "path";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: "Engenharia" | "GovTech" | "Produto" | "IA";
  excerpt: string;
  readingTime: string;
};

// Metadados dos posts — manter em sync com os .mdx
export const posts: PostMeta[] = [
  {
    slug: "municipios-tecnologia",
    title: "Por que municípios brasileiros precisam de tecnologia que nenhuma startup quer construir",
    date: "2026-07-01",
    category: "GovTech",
    excerpt: "O mercado de GovTech no Brasil é ignorado por razões econômicas óbvias — e exatamente por isso é onde está a oportunidade real.",
    readingTime: "8 min",
  },
  {
    slug: "sgtu-transporte-escolar",
    title: "SGTU: por que o transporte escolar é o problema de gestão mais complexo do município médio",
    date: "2026-07-15",
    category: "GovTech",
    excerpt: "Rotas, frota, estudantes, contratos e conformidade legal — tudo ao mesmo tempo, sem margem para erro.",
    readingTime: "10 min",
  },
  {
    slug: "infraestrutura-nordeste",
    title: "Infraestrutura digital fora do eixo: lições de construir em Alagoas sem capital externo",
    date: "2026-08-01",
    category: "Produto",
    excerpt: "Três anos construindo sistemas para municípios do interior sem investimento externo. O que aprendi.",
    readingTime: "12 min",
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}
```

**Step 2: Criar os 3 essays (rascunho inicial)**

```mdx
{/* src/content/escrita/municipios-tecnologia.mdx */}

# Por que municípios brasileiros precisam de tecnologia que nenhuma startup quer construir

**[Rascunho — publicar após revisão]**

O mercado de GovTech no Brasil é sistematicamente ignorado pelo ecossistema de venture capital por razões econômicas óbvias: ciclos de venda longos, tickets baixos, burocracia intensa e ausência de network effects virais.

Essas são exatamente as razões pelas quais vale a pena construir aqui.

<!-- TODO: expandir com dados reais de contratos, comparações, casos -->
```

Criar os outros dois com estrutura similar (placeholder `<!-- TODO -->` para conteúdo real).

**Step 3: Commit**
```bash
git add src/content/ src/lib/posts.ts
git commit -m "feat(blog): add posts metadata and essay scaffolds"
```

---

### Task 12: Página /escrita (listing)

**Files:**
- Create: `src/app/escrita/page.tsx`

**Step 1: Criar página**
```tsx
// src/app/escrita/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Escrita",
  description: "Essays sobre GovTech, infraestrutura digital, produto e engenharia.",
};

const categoryColor: Record<string, string> = {
  Engenharia: "text-primary",
  GovTech:    "text-mint",
  Produto:    "text-amber-400",
  IA:         "text-violet-400",
};

export default function EscritaPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="layout-flow gap-12">
        <div className="layout-flow gap-3">
          <h1 className="font-headline text-4xl font-bold text-foreground">Escrita</h1>
          <p className="text-muted">
            Essays sobre construção de infraestrutura pública, engenharia de software e produto.
          </p>
        </div>

        <ul className="layout-flow gap-8 list-none">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link href={`/escrita/${post.slug}`} className="group layout-flow gap-2">
                <div className="layout-cluster gap-3">
                  <span className={`text-xs font-mono ${categoryColor[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted font-mono">{post.readingTime}</span>
                  <span className="text-xs text-muted font-mono">
                    {new Date(post.date).toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="font-headline text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

**Step 2: Commit**
```bash
git add src/app/escrita/page.tsx
git commit -m "feat(blog): add essays listing page"
```

---

### Task 13: Página individual /escrita/[slug]

**Files:**
- Create: `src/app/escrita/[slug]/page.tsx`

**Step 1: Criar dynamic route**
```tsx
// src/app/escrita/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { posts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: MDXContent } = await import(
    `@/content/escrita/${slug}.mdx`
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="layout-flow gap-8">
        <Link href="/escrita" className="text-sm text-muted hover:text-foreground transition-colors">
          ← Escrita
        </Link>

        <div className="layout-flow gap-3">
          <div className="layout-cluster gap-3">
            <span className="text-xs font-mono text-primary">{post.category}</span>
            <span className="text-xs text-muted font-mono">{post.readingTime}</span>
            <span className="text-xs text-muted font-mono">
              {new Date(post.date).toLocaleDateString("pt-BR", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-foreground leading-snug">
            {post.title}
          </h1>
        </div>

        <article className="prose-custom">
          <MDXContent />
        </article>
      </div>
    </div>
  );
}
```

**Step 2: Verificar**
- `/escrita/municipios-tecnologia` renderiza o MDX
- Breadcrumb funciona
- 404 em slug inexistente

**Step 3: Commit**
```bash
git add src/app/escrita/
git commit -m "feat(blog): add individual post page with MDX rendering"
```

---

## Phase 5 — /pesquisa, /sobre, /contato

*Output verificável: três páginas estáticas com conteúdo real.*

### Task 14: Página /pesquisa

**Files:**
- Create: `src/app/pesquisa/page.tsx`
- Create: `src/data/research.ts`

**Step 1: Criar data layer**
```ts
// src/data/research.ts
export type Paper = {
  title: string;
  venue: string;
  year: number;
  doi?: string;
  abstract: string;
};

export type OpenSourceContrib = {
  repo: string;
  url: string;
  description: string;
};

export const papers: Paper[] = [
  // Preencher com papers reais de Anderson
  // { title: "...", venue: "...", year: 2025, doi: "...", abstract: "..." },
];

export const contributions: OpenSourceContrib[] = [
  {
    repo: "requiem-forge",
    url: "https://github.com/andersonrafhael/requiem-forge",
    description: "Framework SDD (Spec Driven Development) para projetos web sobre Claude Code.",
  },
];
```

**Step 2: Criar página**
```tsx
// src/app/pesquisa/page.tsx
import type { Metadata } from "next";
import { papers, contributions } from "@/data/research";

export const metadata: Metadata = {
  title: "Pesquisa",
  description: "Papers publicados, contribuições open source e projetos de pesquisa aplicada.",
};

export default function PesquisaPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="layout-flow gap-16">
        <div className="layout-flow gap-3">
          <h1 className="font-headline text-4xl font-bold text-foreground">Pesquisa</h1>
          <p className="text-muted">
            Papers publicados, contribuições open source e projetos de pesquisa aplicada.
          </p>
        </div>

        {/* RHEMA */}
        <section className="layout-flow gap-4">
          <h2 className="text-sm font-mono text-muted uppercase tracking-widest">Projeto de pesquisa</h2>
          <div className="glass-card rounded-xl p-6 layout-flow gap-3">
            <h3 className="font-headline text-xl font-semibold text-foreground">RHEMA</h3>
            <p className="text-sm text-muted">
              Framework de engenharia formal de requisitos — hierarquia verificável, maturidade
              cumulativa e degradação temporal. Parte do Requiem Forge.
            </p>
            <a
              href="https://rhema.requiemcompany.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Ver framework ↗
            </a>
          </div>
        </section>

        {/* Papers */}
        {papers.length > 0 && (
          <section className="layout-flow gap-4">
            <h2 className="text-sm font-mono text-muted uppercase tracking-widest">Papers publicados</h2>
            <ul className="layout-flow gap-6 list-none">
              {papers.map((paper) => (
                <li key={paper.doi ?? paper.title} className="layout-flow gap-2">
                  <div className="layout-cluster gap-2">
                    <span className="text-xs font-mono text-muted">{paper.venue}</span>
                    <span className="text-xs font-mono text-muted">·</span>
                    <span className="text-xs font-mono text-muted">{paper.year}</span>
                  </div>
                  <h3 className="font-medium text-foreground">{paper.title}</h3>
                  <p className="text-sm text-muted">{paper.abstract}</p>
                  {paper.doi && (
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-primary hover:underline"
                    >
                      doi:{paper.doi}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Open source */}
        <section className="layout-flow gap-4">
          <h2 className="text-sm font-mono text-muted uppercase tracking-widest">Open source</h2>
          <ul className="layout-flow gap-4 list-none">
            {contributions.map((c) => (
              <li key={c.repo} className="layout-flow gap-1">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-primary hover:underline"
                >
                  {c.repo} ↗
                </a>
                <p className="text-sm text-muted">{c.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
```

**Step 3: Commit**
```bash
git add src/app/pesquisa/ src/data/research.ts
git commit -m "feat(research): add research page with RHEMA, papers and open source"
```

---

### Task 15: Página /sobre

**Files:**
- Create: `src/app/sobre/page.tsx`

```tsx
// src/app/sobre/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Anderson Rafhael — engenheiro e fundador da Requiem Company.",
};

export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="layout-flow gap-12">
        <h1 className="font-headline text-4xl font-bold text-foreground">Sobre</h1>

        {/* Foto + bio */}
        <div className="layout-flow gap-8">
          <Image
            src="/foto.jpg"
            alt="Anderson Rafhael"
            width={120}
            height={120}
            className="rounded-lg object-cover"
          />
          <div className="layout-flow gap-4 text-foreground/80 leading-relaxed">
            <p>
              Engenheiro de software e fundador da{" "}
              <a
                href="https://requiemcompany.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Requiem Company
              </a>
              . Construo infraestrutura digital para municípios brasileiros —
              sistemas que gestores públicos usam para tomar decisões sobre
              transporte escolar, serviços urbanos e gestão institucional.
            </p>
            <p>
              Fora do eixo SP-RJ, acredito que tecnologia de qualidade não é
              privilégio de capital. Nos últimos anos, implantei sistemas em
              municípios do interior de Alagoas onde nenhuma solução equivalente
              existia.
            </p>
            <p>
              A Requiem Company não é uma startup de crescimento acelerado — é
              uma plataforma de construção de soluções com densidade técnica e
              utilidade social. Portfólio: Sigma, SGTU, CultBR, Synapse Lab,
              RHEMA, SPTE/IAFREE, entre outros.
            </p>
          </div>
        </div>

        {/* Requiem Company */}
        <div className="glass-card rounded-xl p-6 layout-flow gap-3">
          <h2 className="font-headline text-xl font-semibold text-foreground">
            Requiem Company
          </h2>
          <p className="text-sm text-muted">
            Fundada em 2022 no interior de Alagoas. Constrói sistemas de gestão
            pública, ferramentas de desenvolvimento e infraestrutura de IA.
            Nenhum investimento externo. Sustentável desde o início.
          </p>
          <a
            href="https://requiemcompany.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            requiemcompany.com.br ↗
          </a>
        </div>
      </div>
    </div>
  );
}
```

**Commit:**
```bash
git add src/app/sobre/page.tsx
git commit -m "feat(about): add about page with bio and Requiem Company section"
```

---

### Task 16: Página /contato

**Files:**
- Create: `src/app/contato/page.tsx`

```tsx
// src/app/contato/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com Anderson Rafhael.",
};

const links = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/andersonrafhael",
    description: "Melhor canal para conversas profissionais",
  },
  {
    label: "GitHub",
    href: "https://github.com/andersonrafhael",
    description: "Código, projetos e contribuições",
  },
  {
    label: "Email",
    href: "mailto:anderson@requiemcompany.com.br",
    description: "Para propostas de parceria ou projetos",
  },
];

export default function ContatoPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="layout-flow gap-12">
        <div className="layout-flow gap-3">
          <h1 className="font-headline text-4xl font-bold text-foreground">Contato</h1>
          <p className="text-muted">
            Aberto a conversas sobre GovTech, infraestrutura pública, parcerias
            institucionais e colaborações técnicas.
          </p>
        </div>

        <ul className="layout-flow gap-4 list-none">
          {links.map(({ label, href, description }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-card rounded-xl p-5 flex items-center justify-between group hover:border-primary/30 transition-colors block"
              >
                <div className="layout-flow gap-1">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {label}
                  </span>
                  <span className="text-sm text-muted">{description}</span>
                </div>
                <span className="text-muted group-hover:text-primary transition-colors">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

**Commit:**
```bash
git add src/app/contato/page.tsx
git commit -m "feat(contact): add contact page with LinkedIn, GitHub and email"
```

---

## Phase 6 — SEO + Performance + Go-live

*Output verificável: Lighthouse ≥ 90 performance, ≥ 95 accessibility.*

### Task 17: Metadata e Open Graph

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/opengraph-image.tsx`

**Step 1: Completar metadata no layout**
```tsx
// Adicionar ao layout.tsx
export const metadata: Metadata = {
  title: { default: "Anderson Rafhael", template: "%s | Anderson Rafhael" },
  description: "Engenheiro e fundador da Requiem Company. Construo infraestrutura digital para municípios brasileiros.",
  metadataBase: new URL("https://andersonrafhael.requiemcompany.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://andersonrafhael.requiemcompany.com.br",
    siteName: "Anderson Rafhael",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
```

**Step 2: Criar OG image dinâmico**
```tsx
// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#131318",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          gap: "24px",
        }}
      >
        <p style={{ color: "#938ea0", fontSize: 18, fontFamily: "monospace", margin: 0 }}>
          Anderson Rafhael · Requiem Company
        </p>
        <h1
          style={{
            color: "#e4e1e9",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
            maxWidth: 800,
          }}
        >
          Construo infraestrutura digital para municípios brasileiros.
        </h1>
        <p style={{ color: "#8b5cf6", fontSize: 20, fontFamily: "monospace", margin: 0 }}>
          andersonrafhael.requiemcompany.com.br
        </p>
      </div>
    ),
    size
  );
}
```

**Step 3: Commit**
```bash
git add src/app/layout.tsx src/app/opengraph-image.tsx
git commit -m "feat(seo): add open graph image and complete metadata"
```

---

### Task 18: Sitemap e robots

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Step 1:**
```ts
// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { posts } from "@/lib/posts";

const base = "https://andersonrafhael.requiemcompany.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/projetos", "/escrita", "/pesquisa", "/sobre", "/contato"].map(
    (route) => ({ url: `${base}${route}`, lastModified: new Date() })
  );
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projetos/${p.slug}`,
    lastModified: new Date(),
  }));
  const postRoutes = posts.map((p) => ({
    url: `${base}/escrita/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}

// src/app/robots.ts
import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://andersonrafhael.requiemcompany.com.br/sitemap.xml",
  };
}
```

**Step 2: Commit**
```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat(seo): add sitemap and robots.txt"
```

---

### Task 19: Deploy e domínio

**Step 1: Push para GitHub**
```bash
git push origin main
```

**Step 2: Configurar no Vercel**
- Vercel Dashboard → Import Project → `andersonrafhael`
- Framework: Next.js (auto-detectado)
- Build command: `next build` (padrão)
- Output directory: `.next` (padrão)

**Step 3: Configurar domínio customizado**
- Vercel → Project → Settings → Domains
- Adicionar: `andersonrafhael.requiemcompany.com.br`
- Configurar CNAME no DNS da Requiem Company

**Step 4: Rodar Lighthouse**
```bash
npx lighthouse https://andersonrafhael.requiemcompany.com.br \
  --output=json --output-path=lighthouse-report.json
# Performance ≥ 90, Accessibility ≥ 95
```

**Step 5: Verificar checklist de go-live (do design doc)**

---

## Success Criteria por Fase

| Fase | Critério |
|---|---|
| 1 | `npm run dev` verde, nav e DS corretos |
| 2 | Hero renderiza com métricas e CTAs |
| 3 | Grid de projetos, hover state, páginas individuais |
| 4 | MDX renderiza, listing e post individual |
| 5 | `/pesquisa`, `/sobre`, `/contato` com conteúdo real |
| 6 | Lighthouse ≥ 90/95, deploy no ar com domínio |

## Notas de Conteúdo

- `public/foto.jpg` — foto profissional (não selfie)
- `src/data/research.ts` — preencher com papers reais de Anderson antes do go-live
- `src/content/escrita/*.mdx` — expandir os 3 essays de rascunho antes do go-live
- `src/data/projects.ts` — atualizar métricas reais (municípios, usuários) antes do go-live
- LinkedIn: `https://linkedin.com/in/andersonrafhael` — confirmar URL correta
- Email: `anderson@requiemcompany.com.br` — confirmar se está ativo
