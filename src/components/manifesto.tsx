"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const markers = [
  { label: "Sem capital externo", detail: "bootstrap desde o primeiro contrato" },
  { label: "Nordeste · Alagoas",  detail: "Maceió como base, Brasil como mercado" },
  { label: "Produto + Pesquisa",  detail: "código e ciência se alimentam" },
];

export function Manifesto() {
  return (
    <section className="section-outer">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1fr_360px] gap-16 lg:gap-24 items-center">

        {/* Esquerda — texto editorial */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="flex flex-col gap-6"
        >
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground/60">
            Sobre
          </p>

          <blockquote
            className="font-editorial italic text-fg-bright leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}
          >
            &ldquo;Construo sistemas que gestores públicos usam para tomar
            decisões reais — sobre gente, sobre cidade, sobre escola.&rdquo;
          </blockquote>

          <p className="text-[16px] text-foreground/65 leading-relaxed max-w-[55ch]">
            Fundei a{" "}
            <a
              href="https://requiemcompany.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              Requiem Company
            </a>{" "}
            em 2024 com um objetivo claro: infraestrutura digital de
            excelência com densidade técnica e utilidade social real, fora do
            eixo SP-RJ, sem capital externo.
          </p>

          <Link
            href="/sobre"
            className="inline-flex items-center gap-2 font-mono text-[13px]
                       text-foreground/65 hover:text-primary transition-colors w-fit"
          >
            Leia mais sobre mim →
          </Link>
        </motion.div>

        {/* Direita — marcadores */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          }}
          className="flex flex-col gap-3"
        >
          {markers.map(({ label, detail }) => (
            <div
              key={label}
              className="glass-card rounded-xl px-5 py-4 flex flex-col gap-1"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/75">
                {label}
              </span>
              <span className="text-[12px] text-foreground/75 leading-snug">
                {detail}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
