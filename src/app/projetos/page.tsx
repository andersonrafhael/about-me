import type { Metadata } from "next";
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
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="layout-flow gap-16">
        {/* Header */}
        <div className="layout-flow gap-3">
          <h1 className="font-headline text-4xl font-bold text-foreground">Projetos</h1>
          <p className="text-muted max-w-xl">
            Infraestrutura digital construída para municípios, instituições e
            comunidades — do sertão nordestino ao ecossistema tech.
          </p>
        </div>

        {/* Tier 1 */}
        <section className="layout-flow gap-6">
          <div className="layout-cluster gap-3">
            <h2 className="text-xs font-mono text-muted uppercase tracking-widest">
              Requiem Company
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tier1.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Tier 2 */}
        <section className="layout-flow gap-6">
          <h2 className="text-xs font-mono text-muted uppercase tracking-widest">
            NEES / UFAL — Gestão de produto
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tier2.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
