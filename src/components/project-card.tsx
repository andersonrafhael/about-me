"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const categoryColors: Record<string, string> = {
  GovTech:  "text-primary border-primary/30",
  EdTech:   "text-mint border-mint/30",
  IA:       "text-primary-light border-primary-light/30",
  Infra:    "text-infra border-infra/30",
  Pesquisa: "text-primary-light border-primary-light/30",
};

const statusLabel: Record<string, string> = {
  ativo:     "Ativo",
  beta:      "Beta",
  encerrado: "Encerrado",
};

export function ProjectCard({ project }: { project: Project }) {
  const { slug, name, category, status, tagline, stack, tier, role } = project;

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link href={`/projetos/${slug}`} className="block group h-full">
        <article className="glass-card rounded-xl p-6 h-full layout-flow gap-4
                            hover:border-primary/30 transition-colors duration-200">
          {/* Header */}
          <div className="layout-cluster justify-between gap-2">
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded-full border
                          ${categoryColors[category] ?? "text-muted border-border"}`}
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

          {/* Nome + tagline */}
          <div className="layout-flow gap-2 flex-1">
            <h2 className="font-headline text-xl font-semibold text-foreground
                           group-hover:text-primary transition-colors">
              {name}
            </h2>
            <p className="text-sm text-muted leading-relaxed">{tagline}</p>
          </div>

          {/* Role badge — tier 2 */}
          {tier === 2 && role && (
            <p className="text-xs font-mono text-muted/60 border-t border-border/40 pt-3">
              {role}
            </p>
          )}

          {/* Stack — visível no hover */}
          <div className="layout-cluster gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {stack.map((tech) => (
              <span key={tech} className="text-xs font-mono text-muted/60">
                {tech}
              </span>
            ))}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
