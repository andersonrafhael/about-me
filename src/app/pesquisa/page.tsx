import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pesquisa",
  description:
    "Pesquisa acadêmica de Anderson Rafhael — engenharia de requisitos, GovTech, HealthTech e sistemas de informação para municípios brasileiros.",
};

const papers = [
  // ── Em submissão / andamento ─────────────────────────────────────────────
  {
    title:
      "Requiem Maturity Scale: uma escala de maturidade para verificação formal de requisitos de software",
    venue: "SBES 2026 — Congresso Brasileiro de Software",
    year: "2026",
    status: "submitted",
    tags: ["Requisitos", "Maturidade", "Verificação Formal", "GovTech"],
    abstract:
      "Proposta de escala de maturidade (RMS) para avaliação e verificação formal de requisitos de software, com hierarquia verificável, cumulatividade de conformidade e degradação temporal. Aplicada em sistemas multi-tenant de gestão pública municipal. Derivada de 4 anos de engenharia de requisitos em contextos reais de GovTech.",
  },
  {
    title:
      "Requisitos de Software para Sistemas de Gestão Municipal Brasileira: um mapeamento sistemático",
    venue: "SBES 2026 — Congresso Brasileiro de Software",
    year: "2026",
    status: "submitted",
    tags: ["Requisitos", "GovTech", "Mapeamento Sistemático", "Gestão Municipal"],
    abstract:
      "Mapeamento sistemático da literatura sobre requisitos de software em sistemas de informação para gestão pública municipal brasileira. Identifica lacunas de pesquisa, padrões recorrentes e oportunidades de contribuição no contexto de cidades de pequeno e médio porte fora do eixo SP-RJ.",
  },
  {
    title:
      "Arquitetura de Rastreabilidade de Dispositivos Cardíacos Implantáveis em Hospital Público do SUS",
    venue: "SBCAS 2026 — Simpósio Brasileiro de Computação Aplicada à Saúde",
    year: "2026",
    status: "in-progress",
    tags: ["HealthTech", "Dispositivos Implantáveis", "SUS", "Rastreabilidade", "ANVISA"],
    abstract:
      "Arquitetura de software do SGDI — sistema de rastreabilidade de dispositivos cardíacos implantáveis (marcapassos, CDIs, ressincronizadores) em hospital público. Cobre recebimento, estoque, implante, acompanhamento e auditoria com conformidade regulatória ANVISA e integração ao fluxo SUS.",
  },
  {
    title:
      "Integração do Protocolo OCPP 2.0 em Redes de Mobilidade Elétrica com Armazenamento de Energia",
    venue: "IEEE Access — Submissão contínua",
    year: "2026",
    status: "in-progress",
    tags: ["OCPP", "Mobilidade Elétrica", "ESS", "IoT", "Smart Grid"],
    abstract:
      "Análise e implementação do protocolo OCPP 2.0 em redes de mobilidade elétrica com armazenamento de energia (ESS) no contexto urbano do Nordeste brasileiro. Avalia desafios de interoperabilidade, latência e gestão de carga em mercado emergente sem solução equivalente disponível na região.",
  },
];

const published = [
  {
    venue: "DGO 2025 — Conference on Digital Government Research",
    year: "2025",
    count: 2,
    note: "Dois artigos aceitos. Títulos e links disponíveis no Currículo Lattes.",
  },
  {
    venue: "SBCAS 2025 — Simpósio Brasileiro de Computação Aplicada à Saúde",
    year: "2025",
    count: 1,
    note: "Artigo aceito. Disponível no Currículo Lattes.",
  },
  {
    venue: "DGO 2026 — Conference on Digital Government Research",
    year: "2026",
    count: 1,
    note: "Artigo aceito. Disponível no Currículo Lattes.",
  },
];

const interests = [
  "Engenharia de Requisitos formal em contextos de GovTech",
  "Sistemas de informação para gestão pública municipal brasileira",
  "Arquitetura de software multi-tenant em domínios institucionais",
  "HealthTech — rastreabilidade e compliance regulatório (ANVISA/SUS)",
  "Tecnologia educacional e prevenção à evasão escolar",
  "Mobilidade urbana elétrica e eletrificação de frotas públicas",
  "IA aplicada a serviços públicos — LLM, RAG, agentes autônomos",
];

const statusLabel: Record<string, { label: string; color: string }> = {
  submitted: { label: "Submetido", color: "text-warning" },
  published: { label: "Publicado", color: "text-mint" },
  "in-progress": { label: "Em andamento", color: "text-primary" },
};

export default function PesquisaPage() {
  return (
    <div className="min-h-screen px-site max-w-[1280px] mx-auto">

      {/* ── Breadcrumb ── */}
      <div className="pt-page mb-16">
        <nav className="mono-label flex items-center gap-2.5" aria-label="Breadcrumb">
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
          <b className="text-foreground font-medium block">4 publicados</b>
          UFAL · NEES<br />
          Engenharia de Software
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="flex flex-col divide-y divide-border">

        {/* Pipeline — em submissão / andamento */}
        <section className="section-grid py-[clamp(48px,7vh,88px)]">
          <div className="mono-label sticky top-[calc(56px+16px)] h-fit">
            Pipeline
          </div>
          <div className="flex flex-col gap-10">
            {papers.map((p, i) => {
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
            })}
          </div>
        </section>

        {/* Publicações anteriores */}
        <section className="section-grid py-[clamp(48px,7vh,88px)]">
          <div className="mono-label sticky top-[calc(56px+16px)] h-fit">
            Publicações
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-foreground/70 text-[14px] leading-relaxed max-w-[56ch]">
              4 artigos publicados em conferências internacionais no âmbito de pesquisas do NEES/UFAL.
              Títulos e PDFs disponíveis no Currículo Lattes.
            </p>
            <div className="flex flex-col gap-0 border-t border-border">
              {published.map(({ venue, year, count, note }, i) => (
                <div key={i}
                  className="flex items-start gap-6 py-4 border-b border-border/40 last:border-0">
                  <span className="font-mono text-[11px] text-primary shrink-0 w-10 pt-0.5">
                    {year}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] text-foreground leading-snug">{venue}</span>
                    <span className="font-mono text-[11px] text-muted">
                      {count === 1 ? "1 artigo" : `${count} artigos`} · {note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interesses */}
        <section className="section-grid py-[clamp(48px,7vh,88px)]">
          <div className="mono-label sticky top-[calc(56px+16px)] h-fit">
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
          <div className="mono-label sticky top-[calc(56px+16px)] h-fit">
            Afiliação
          </div>
          <div className="flex flex-col gap-5 text-[15px] text-foreground">
            <div>
              <span className="mono-sublabel block mb-1">
                Instituição
              </span>
              Universidade Federal de Alagoas (UFAL)
            </div>
            <div>
              <span className="mono-sublabel block mb-1">
                Núcleo
              </span>
              NEES — Núcleo de Excelência em Engenharia de Software
            </div>
            <div>
              <span className="mono-sublabel block mb-1">
                Graduação
              </span>
              Engenharia da Computação — Bacharelado
            </div>
            <div>
              <span className="mono-sublabel block mb-1">
                Currículo Lattes
              </span>
              <a
                href="https://lattes.cnpq.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Acessar Currículo Lattes ↗
              </a>
            </div>
          </div>
        </section>

      </div>

      <div className="h-[clamp(64px,8vh,100px)]" />
    </div>
  );
}
