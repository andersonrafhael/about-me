"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const plannedTopics = [
  "Engenharia de requisitos em contratos públicos",
  "Multi-tenancy sem framework: o caminho difícil",
  "Por que o Nordeste precisa de GovTech própria",
];

export function WritingResearch() {
  return (
    <section
      className="section-outer"
    >
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-4">

        {/* ── Escrita ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="glass-card rounded-xl p-7 flex flex-col gap-5"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/60">
              Escrita
            </p>
            <Link
              href="/escrita"
              className="font-mono text-[11px] text-foreground/60 hover:text-primary transition-colors"
            >
              ver tudo →
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-headline font-bold text-fg-bright text-2xl tracking-[-0.02em]">
              Em breve<span className="text-primary">.</span>
            </h2>
            <p className="text-[14px] text-foreground/75 leading-relaxed">
              Artigos sobre engenharia aplicada ao setor público, produto
              e lições de quem constrói fora do eixo.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-border/40">
            {plannedTopics.map((topic) => (
              <div key={topic} className="flex items-start gap-3">
                <span className="font-mono text-[10px] text-foreground/60 mt-[3px] shrink-0">
                  —
                </span>
                <span className="text-[13px] text-foreground/75 leading-snug">
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Pesquisa ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          }}
          className="glass-card rounded-xl p-7 flex flex-col gap-5"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/60">
              Pesquisa
            </p>
            <Link
              href="/pesquisa"
              className="font-mono text-[11px] text-foreground/60 hover:text-primary transition-colors"
            >
              ver tudo →
            </Link>
          </div>

          {/* Paper */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-mono text-[10px] tracking-[0.15em] uppercase
                           text-warning border border-warning/30 px-2 py-0.5 rounded-full"
              >
                SBES 2026
              </span>
              <span className="font-mono text-[10px] text-foreground/60">em revisão</span>
            </div>

            <h3 className="font-headline font-bold text-fg-bright text-xl leading-snug tracking-[-0.02em]">
              RHEMA — Hierarchical Excellence Maturity Artifact
            </h3>

            <p className="text-[14px] text-foreground/75 leading-relaxed">
              Framework de requisitos verificáveis com maturidade cumulativa e
              degradação temporal. Aplicado em sistemas multi-tenant de gestão pública.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <p className="font-mono text-[11px] text-foreground/60">
              UFAL · NEES · Engenharia de Software
            </p>
            <Link
              href="/pesquisa"
              className="font-mono text-[11px] text-foreground/60 hover:text-primary transition-colors"
            >
              ler abstract →
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
