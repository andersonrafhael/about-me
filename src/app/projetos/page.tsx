import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Portfólio completo de projetos da Requiem Company.",
};

export default function ProjetosPage() {
  const tier1 = projects.filter((p) => p.tier === 1);
  const tier2 = projects.filter((p) => p.tier === 2);

  return (
    <div className="min-h-screen px-site max-w-[1280px] mx-auto">

      {/* ── Breadcrumb ── */}
      <div className="pt-page mb-16">
        <nav className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                        flex items-center gap-2.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors text-muted">Início</Link>
          <span className="text-muted-2">/</span>
          <span className="text-foreground font-medium">Projetos</span>
        </nav>
      </div>

      {/* ── Title block ── */}
      <div className="mb-[clamp(56px,8vh,96px)] pb-[clamp(40px,5vh,64px)] border-b border-border">
        <h1 className="editorial-title mb-4">
          Projetos<span className="punct">.</span>
        </h1>
        <p className="text-[16px] text-foreground/65 max-w-[52ch] leading-relaxed">
          Infraestrutura digital construída para municípios, instituições e
          comunidades — do sertão nordestino ao ecossistema tech.
        </p>
      </div>

      {/* ── Tier 1: Requiem Company ── */}
      <section className="mb-[clamp(48px,7vh,80px)]">
        <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-6">
          Requiem Company
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tier1.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ── Tier 2: NEES / UFAL ── */}
      <section className="pb-[clamp(64px,8vh,100px)]">
        <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-6">
          NEES / UFAL — Gestão de produto
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tier2.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

    </div>
  );
}
