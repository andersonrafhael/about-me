import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pesquisa",
  description:
    "Pesquisa acadêmica de Anderson Rafhael — sistemas de informação, gestão pública, educação e tecnologia para municípios brasileiros.",
};

const papers = [
  {
    title: "Requisitos de Software para Sistemas de Gestão Municipal: um mapeamento sistemático",
    venue: "SBES 2026 — Congresso Brasileiro de Software",
    year: "2026",
    status: "submitted",
    tags: ["Requisitos", "GovTech", "Mapeamento Sistemático"],
    abstract:
      "Mapeamento sistemático da literatura sobre requisitos de software em sistemas de informação para gestão pública municipal brasileira, identificando lacunas e oportunidades de pesquisa.",
  },
];

const interests = [
  "Engenharia de Requisitos em contextos de GovTech",
  "Sistemas de informação para gestão pública municipal",
  "Arquitetura de software para multi-tenancy institucional",
  "Tecnologia educacional e permanência escolar",
  "Mobilidade urbana e eletrificação de frotas públicas",
  "IA aplicada a serviços públicos (LLM, RAG, NLP)",
];

const statusLabel: Record<string, { label: string; color: string }> = {
  submitted: { label: "Submetido", color: "text-warning" },
  published: { label: "Publicado", color: "text-mint" },
  "in-progress": { label: "Em andamento", color: "text-primary" },
};

export default function PesquisaPage() {
  return (
    <div className="min-h-screen px-[clamp(24px,4.5vw,80px)] max-w-[1280px] mx-auto">

      {/* ── Breadcrumb ── */}
      <div className="pt-[calc(56px+clamp(40px,6vh,80px))] mb-16">
        <nav className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                        flex items-center gap-2.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors text-muted">Início</Link>
          <span className="text-muted-2">/</span>
          <span className="text-foreground font-medium">Pesquisa</span>
        </nav>
      </div>

      {/* ── Title block ── */}
      <div className="grid grid-cols-[1fr_auto] items-end gap-8 mb-[clamp(56px,8vh,96px)]
                      pb-[clamp(40px,5vh,64px)] border-b border-border">
        <h1 className="editorial-title">
          Pesquisa<span className="punct">.</span>
        </h1>
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted text-right
                        pb-4 leading-[1.8] hidden sm:block">
          <b className="text-foreground font-medium block">Acadêmica</b>
          UFAL · Maceió<br />
          Sistemas de Informação
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="flex flex-col divide-y divide-border">

        {/* Publicações */}
        <section className="section-grid py-[clamp(48px,7vh,88px)]">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                          sticky top-[calc(56px+16px)] h-fit">
            Publicações
          </div>
          <div className="flex flex-col gap-8">
            {papers.length === 0 ? (
              <p className="text-muted text-[14px]">Em breve.</p>
            ) : (
              papers.map((p, i) => {
                const s = statusLabel[p.status] ?? { label: p.status, color: "text-muted" };
                return (
                  <article key={i} className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-foreground font-medium text-[16px] leading-snug max-w-[52ch]">
                        {p.title}
                      </h2>
                      <span className={`font-mono text-[10px] tracking-[0.14em] uppercase shrink-0 ${s.color}`}>
                        {s.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-muted">
                      <span>{p.venue}</span>
                      <span className="text-muted-2">·</span>
                      <span>{p.year}</span>
                    </div>
                    <p className="text-foreground/75 text-[14px] leading-relaxed max-w-[60ch]">
                      {p.abstract}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t}
                          className="px-2 py-0.5 rounded border border-border/60
                                     font-mono text-[10px] tracking-[0.08em] text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* Interesses */}
        <section className="section-grid py-[clamp(48px,7vh,88px)]">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                          sticky top-[calc(56px+16px)] h-fit">
            Interesses
          </div>
          <ul className="flex flex-col gap-3">
            {interests.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-foreground leading-snug">
                <span className="font-mono text-[10px] text-primary mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Afiliação */}
        <section className="section-grid py-[clamp(48px,7vh,88px)]">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                          sticky top-[calc(56px+16px)] h-fit">
            Afiliação
          </div>
          <div className="flex flex-col gap-4 text-[15px] text-foreground">
            <div>
              <span className="font-mono text-[10px] text-muted tracking-[0.14em] uppercase block mb-1">
                Instituição
              </span>
              Universidade Federal de Alagoas (UFAL)
            </div>
            <div>
              <span className="font-mono text-[10px] text-muted tracking-[0.14em] uppercase block mb-1">
                Programa
              </span>
              Engenharia da Computação — Bacharelado
            </div>
            <div>
              <span className="font-mono text-[10px] text-muted tracking-[0.14em] uppercase block mb-1">
                Lattes
              </span>
              <a
                href="https://lattes.cnpq.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Currículo Lattes ↗
              </a>
            </div>
          </div>
        </section>

      </div>

      <div className="h-[clamp(64px,8vh,100px)]" />
    </div>
  );
}
