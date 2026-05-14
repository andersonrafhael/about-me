import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com Anderson Rafhael. Projetos, parcerias ou só uma conversa.",
};

const channels = [
  {
    label: "Email",
    value: "rafha.barbosa98@gmail.com",
    href: "mailto:rafha.barbosa98@gmail.com",
    hint: "Resposta < 24h, seg–sex",
    n: "01",
  },
  {
    label: "GitHub",
    value: "github.com/andersonrafhael",
    href: "https://github.com/andersonrafhael",
    hint: "Código, projetos abertos",
    n: "02",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/andersonrafhael",
    href: "https://linkedin.com/in/andersonrafhael",
    hint: "Perfil profissional",
    n: "03",
  },
  {
    label: "Requiem Co.",
    value: "requiemcompany.com.br",
    href: "https://requiemcompany.com.br",
    hint: "Site da empresa",
    n: "04",
  },
];

export default function ContatoPage() {
  return (
    <div className="min-h-screen px-site max-w-[1280px] mx-auto">

      {/* ── Breadcrumb ── */}
      <div className="pt-page mb-16">
        <nav className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                        flex items-center gap-2.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors text-muted">Início</Link>
          <span className="text-muted-2">/</span>
          <span className="text-foreground font-medium">Contato</span>
        </nav>
      </div>

      {/* ── Title block ── */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-end gap-4 sm:gap-8 mb-[clamp(56px,8vh,96px)]
                      pb-[clamp(40px,5vh,64px)] border-b border-border">
        <h1 className="editorial-title">
          Contato<span className="punct">.</span>
        </h1>
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted text-right
                        pb-4 leading-[1.8] hidden sm:block">
          <span className="flex items-center gap-1.5 justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-mint mint-pulse" aria-hidden />
            <b className="text-mint font-medium">no ar</b>
          </span>
          Maceió, BRT<br />
          Resposta rápida
        </div>
      </div>

      {/* ── Intro ── */}
      <div className="section-grid mb-[clamp(48px,6vh,80px)]">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted h-fit">
          Sobre contato
        </div>
        <p className="text-[17px] text-foreground/80 leading-relaxed max-w-[52ch]">
          Projetos institucionais, parcerias técnicas, oportunidades de pesquisa ou só uma
          conversa sobre tecnologia pública. Prefiro direto ao ponto.
        </p>
      </div>

      {/* ── Canais ── */}
      <div className="flex flex-col divide-y divide-border border-t border-border">
        {channels.map(({ label, value, href, hint, n }) => (
          <a
            key={n}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center justify-between gap-6 py-6
                       hover:bg-white/[0.015] transition-colors rounded px-2 -mx-2"
          >
            <div className="flex items-center gap-5">
              <span className="font-mono text-[11px] text-muted w-6 shrink-0">{n}</span>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
                  {label}
                </span>
                <span className="text-foreground text-[15px] group-hover:text-primary transition-colors">
                  {value}
                </span>
                <span className="font-mono text-[11px] text-muted">{hint}</span>
              </div>
            </div>
            <span className="text-muted-2 group-hover:text-primary group-hover:translate-x-1
                             group-hover:-translate-y-1 transition-all text-lg shrink-0"
                  aria-hidden>
              ↗
            </span>
          </a>
        ))}
      </div>

      {/* ── Nota de rodapé ── */}
      <div className="py-[clamp(64px,8vh,100px)]">
        <p className="font-mono text-[11px] text-muted tracking-[0.12em] uppercase">
          Maceió · Alagoas · Brasil ·{" "}
          <span className="text-foreground/60">UTC-3 (BRT)</span>
        </p>
      </div>

    </div>
  );
}
