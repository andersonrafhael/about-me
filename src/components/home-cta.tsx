"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HomeCTA() {
  return (
    <section
      className="section-outer py-[clamp(80px,12vh,140px)]"
    >
      <div className="max-w-[1440px] mx-auto text-center flex flex-col gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="flex flex-col gap-6 items-center"
        >
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground/60">
            Contato
          </p>
          <h2
            className="font-headline font-bold text-fg-bright leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
          >
            Vamos trabalhar juntos<span className="text-primary not-italic">?</span>
          </h2>
          <p className="text-[16px] text-foreground/60 max-w-[48ch] leading-relaxed">
            Disponível para projetos de infraestrutura digital, consultoria
            e pesquisa aplicada. Resposta em até 24h.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                         bg-primary text-primary-foreground font-medium text-sm
                         hover:bg-primary-deep transition-colors"
            >
              Entrar em contato
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/projetos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                         border border-border-2 text-foreground/65 font-medium text-sm
                         hover:text-foreground hover:border-border transition-colors"
            >
              Ver projetos
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
