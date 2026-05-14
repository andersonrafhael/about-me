"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import type { ProjectCategory, ProjectStatus } from "@/data/projects";

const featuredSlugs = ["sigma", "rhema", "microred"];

const categoryColors: Record<ProjectCategory, { text: string; border: string }> = {
  GovTech:  { text: "text-primary",       border: "border-primary/30" },
  Pesquisa: { text: "text-warning",       border: "border-warning/30" },
  Infra:    { text: "text-infra",         border: "border-infra/30" },
  EdTech:   { text: "text-mint",          border: "border-mint/30" },
  IA:       { text: "text-primary-light", border: "border-primary-light/30" },
};

const statusDot: Record<ProjectStatus, string> = {
  ativo:     "bg-mint",
  beta:      "bg-warning",
  encerrado: "bg-foreground/25",
};

const statusLabel: Record<ProjectStatus, string> = {
  ativo:     "ativo",
  beta:      "em dev",
  encerrado: "encerrado",
};

export function FeaturedProjects() {
  const featured = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as typeof projects;

  return (
    <section className="section-outer">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground/60">
              Trabalhos selecionados
            </p>
            <h2
              className="section-heading font-headline font-bold text-fg-bright leading-[0.9] tracking-[-0.03em]"
            >
              O que construo<span className="text-primary">.</span>
            </h2>
          </div>
          <Link
            href="/projetos"
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[12px]
                       text-foreground/60 hover:text-primary transition-colors pb-1"
          >
            ver todos →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((project, i) => {
            const colors = categoryColors[project.category] ?? {
              text: "text-foreground/55",
              border: "border-border",
            };
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.55,
                  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                }}
              >
                <Link
                  href={`/projetos/${project.slug}`}
                  className="group glass-card rounded-xl p-6 flex flex-col gap-4 h-full
                             hover:border-primary/30 transition-colors"
                >
                  {/* Category + status */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[10px] tracking-[0.18em] uppercase
                                  border px-2 py-0.5 rounded-full
                                  ${colors.text} ${colors.border}`}
                    >
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusDot[project.status]}`}
                        aria-hidden
                      />
                      <span className="font-mono text-[10px] text-foreground/60 tracking-widest uppercase">
                        {statusLabel[project.status]}
                      </span>
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className="font-headline font-bold text-fg-bright text-2xl leading-tight
                               tracking-[-0.02em] group-hover:text-fg-bright transition-colors"
                  >
                    {project.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-[14px] text-foreground/65 leading-relaxed flex-1">
                    {project.tagline}
                  </p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/40">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-foreground/60
                                   bg-white/3 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 sm:hidden">
          <Link
            href="/projetos"
            className="font-mono text-[12px] text-foreground/60 hover:text-primary transition-colors"
          >
            ver todos os projetos →
          </Link>
        </div>
      </div>
    </section>
  );
}
