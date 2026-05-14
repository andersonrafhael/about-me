"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { metrics } from "@/data/metrics";
import { TerminalTypewriter } from "@/components/terminal-typewriter";
import { ConstellationCanvas } from "@/components/constellation-canvas";

const terminalLines = [
  "ssh sigma.requiemcompany.com.br",
  "// sistemas ativos · sinalização, infraestrutura",
  "systemctl status sgtu",
  "● active (running) · transporte escolar",
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-site"
    >
      {/* ── Constellation canvas (contida na hero) ── */}
      <ConstellationCanvas />

      {/* ── Editorial backdrop "01" ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-2vw] bottom-[-4vw] -z-10
                   font-headline italic font-bold leading-[0.84] tracking-[-0.04em]
                   text-foreground select-none"
        style={{
          fontSize: "clamp(280px, 38vw, 640px)",
          opacity: 0.025,
        }}
      >
        01
      </div>

      {/* ── Violet glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                   -z-10 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── Content ── */}
      <div className="max-w-[1440px] w-full mx-auto grid lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 items-center py-24">

        {/* Coluna esquerda — copy */}
        <div className="flex flex-col gap-8">
          {/* Eyebrow */}
          <motion.div {...fade(0)} className="flex items-center gap-3">
            <span className="relative w-2 h-2 rounded-full bg-mint shrink-0">
              <span
                className="absolute inset-[-3px] rounded-full border border-mint
                           animate-[nav-ping_2.4s_ease-out_infinite] opacity-0"
                aria-hidden
              />
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-mint">
              disponível para projetos · 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div {...fade(0.08)}>
            <h1 className="hero-headline font-headline font-bold leading-[0.86] tracking-[-0.04em] text-fg-bright">
              Infraestrutura digital<span className="text-primary">.</span>
            </h1>
            <p className="hero-subline font-headline italic text-foreground/70 leading-[0.9] tracking-[-0.03em] mt-2">
              de ponta para{" "}
              <span className="text-foreground underline decoration-primary/60 underline-offset-4 decoration-[2px]">gestão pública</span>
              ,{" "}
              <span className="text-foreground underline decoration-primary/60 underline-offset-4 decoration-[2px]">saúde</span>
              {" "}e{" "}
              <span className="text-foreground underline decoration-primary/60 underline-offset-4 decoration-[2px]">mobilidade</span>
              .
            </p>
          </motion.div>

          {/* Métricas */}
          <motion.div
            {...fade(0.16)}
            className="flex flex-wrap gap-x-8 gap-y-3 pt-2"
          >
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="font-headline font-bold text-fg-bright text-2xl leading-none tracking-tight">
                  {m.value}
                </span>
                <span className="font-mono text-[11px] text-foreground/65 tracking-[0.12em] uppercase mt-1">
                  {m.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fade(0.22)} className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/projetos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                         bg-primary text-white font-medium text-sm
                         hover:bg-primary-deep transition-colors"
            >
              Ver projetos
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/escrita"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                         border border-border-2 text-foreground/65 font-medium text-sm
                         hover:text-foreground hover:border-border transition-colors"
            >
              Ler artigos
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Coluna direita — meta-col */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.65, ease: "easeOut" }}
          className="hidden lg:flex flex-col gap-4"
        >
          {/* Status + meta card */}
          <div className="glass-card rounded-xl p-5 flex flex-col gap-0">
            <div className="flex items-center justify-between pb-3 mb-1 border-b border-border/40">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint mint-pulse" aria-hidden />
                <span className="text-fg-bright font-medium text-[14px]">Disponível para projetos</span>
              </span>
              <span className="font-mono text-[10px] text-mint tracking-[0.12em] uppercase">live</span>
            </div>
            {[
              { k: "Base",    v: "Maceió, AL · Brasil" },
              { k: "Foco",    v: "GovTech · HealthTech · EdTech" },
              { k: "Capital", v: "Bootstrap · sem externo" },
            ].map(({ k, v }) => (
              <div key={k} className="flex items-center justify-between gap-4 py-2.5 border-b border-border/40 last:border-0">
                <span className="font-mono text-[10px] text-foreground/60 tracking-[0.12em] uppercase shrink-0">
                  {k}
                </span>
                <span className="text-[13px] text-foreground text-right">{v}</span>
              </div>
            ))}
          </div>

          {/* Terminal */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-void/60">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-mint/70" />
              <span className="ml-2 text-[11px] text-muted font-mono">~/requiemcompany</span>
            </div>
            <div className="p-5 min-h-[130px]">
              <TerminalTypewriter lines={terminalLines} speed={38} />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
