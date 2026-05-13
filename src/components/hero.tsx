"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { metrics } from "@/data/metrics";
import { TerminalTypewriter } from "@/components/terminal-typewriter";

const terminalLines = [
  "git clone requiemcompany/sigma",
  "cd sigma && npm run dev",
  "// 5 municípios no ar. infraestrutura pública.",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Violet glow de fundo — sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[800px] h-[500px] rounded-full opacity-[0.07]
                   bg-[radial-gradient(ellipse_at_center,#8b5cf6_0%,transparent_70%)]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Coluna esquerda — copy ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="layout-flow gap-8"
          >
            {/* Label */}
            <p className="text-xs text-muted font-mono tracking-[0.18em] uppercase">
              Anderson Rafhael · Requiem Company
            </p>

            {/* Headline */}
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-[3.25rem] font-bold
                           text-foreground leading-[1.08] tracking-tight max-w-xl">
              Construo infraestrutura digital para{" "}
              <span className="text-primary">municípios brasileiros.</span>
            </h1>

            {/* Sub */}
            <p className="text-muted text-base leading-relaxed max-w-md">
              Engenheiro e fundador da Requiem Company. Fora do eixo SP-RJ,
              sem capital externo — sistemas públicos que funcionam de verdade.
            </p>

            {/* Métricas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="layout-cluster gap-8 pt-2"
            >
              {metrics.map(({ value, label }) => (
                <div key={label} className="layout-flow gap-0.5">
                  <span className="font-mono text-2xl font-bold text-primary tabular-nums">
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
              transition={{ delay: 0.5, duration: 0.55 }}
              className="layout-cluster gap-3 pt-1"
            >
              <Link
                href="/projetos"
                className="px-6 py-3 bg-primary text-white font-medium text-sm rounded-lg
                           hover:bg-primary/90 transition-colors"
              >
                Ver projetos
              </Link>
              <Link
                href="/escrita"
                className="px-6 py-3 border border-border text-foreground/80 font-medium text-sm
                           rounded-lg hover:border-primary/40 hover:text-foreground transition-colors"
              >
                Ler artigos
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Coluna direita — terminal ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="glass-card rounded-xl overflow-hidden">
              {/* Barra de título do terminal */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-void/60">
                <span className="w-3 h-3 rounded-full bg-[#f87171]/70" />
                <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                <span className="w-3 h-3 rounded-full bg-mint/70" />
                <span className="ml-3 text-xs text-muted font-mono">
                  ~/requiemcompany
                </span>
              </div>

              {/* Conteúdo do terminal */}
              <div className="p-6 min-h-[180px]">
                <TerminalTypewriter
                  lines={terminalLines}
                  speed={42}
                />
              </div>
            </div>

            {/* Badge flutuante abaixo do terminal */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="mt-4 flex items-center gap-3 px-4 py-3 glass-card rounded-xl"
            >
              <span className="w-2 h-2 rounded-full bg-mint mint-pulse shrink-0" />
              <span className="text-xs font-mono text-muted">
                <span className="text-foreground/80">5 sistemas</span>{" "}
                em produção — Alagoas, Brasil
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
