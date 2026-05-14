import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { AvatarInitials } from "@/components/avatar-initials";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Anderson Rafhael — engenheiro de computação e fundador da Requiem Company. Construo infraestrutura digital para municípios brasileiros.",
};

const stack = [
  { cat: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"] },
  { cat: "Backend", items: ["Django 5", "DRF", "PostgreSQL", "Supabase"] },
  { cat: "Infra", items: ["Docker", "Nginx", "Cloudflare", "VPS próprio"] },
  { cat: "IA / ML", items: ["LLM APIs", "RAG", "Claude API", "Python"] },
];

const timeline = [
  { year: "2021", event: "Início no NEES/UFAL — primeiro contato com sistemas reais de informação para governo" },
  { year: "2022", event: "Fundei a Requiem Company em Maceió, AL — primeiro contrato municipal antes de concluir a graduação" },
  { year: "2023", event: "Sigma em desenvolvimento — sistema de gestão urbana com georreferenciamento para prefeituras alagoanas" },
  { year: "2024", event: "Sigma em produção: 5+ municípios no interior de Alagoas usando o sistema" },
  { year: "2024", event: "SGTU lançado — gestão de transporte escolar multi-tenant para secretarias municipais" },
  { year: "2024", event: "Primeiros papers aceitos em conferências internacionais (DGO, SBCAS)" },
  { year: "2025", event: "CultBR, SGDI, Synapse Lab, MicroRed — expansão do portfólio para saúde, cultura e mobilidade" },
  { year: "2025", event: "CultBR em produção: R$2,98bi em políticas culturais geridas na plataforma" },
  { year: "2026", event: "Pipeline de pesquisa ativo: RMS (SBES), SGDI (SBCAS), MicroRed (IEEE Access)" },
  { year: "2026", event: "Objetivo: Forbes Under 30 Brasil · Categoria Tecnologia & Inovação" },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen px-[clamp(24px,4.5vw,80px)] max-w-[1280px] mx-auto">

      {/* ── Breadcrumb ── */}
      <div className="pt-[calc(56px+clamp(40px,6vh,80px))] mb-16">
        <nav className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                        flex items-center gap-2.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors text-muted">Início</Link>
          <span className="text-muted-2">/</span>
          <span className="text-foreground font-medium">Sobre</span>
        </nav>
      </div>

      {/* ── Title block ── */}
      <div className="grid grid-cols-[1fr_auto] items-end gap-8 mb-[clamp(56px,8vh,96px)]
                      pb-[clamp(40px,5vh,64px)] border-b border-border">
        <h1 className="editorial-title">
          Sobre<span className="punct">.</span>
        </h1>
        <div className="hidden sm:flex items-end gap-5 pb-4">
          <AvatarInitials size="md" />
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted text-right
                          leading-[1.8]">
            <b className="text-foreground font-medium block">Anderson Rafhael</b>
            Engenheiro · Fundador<br />
            Maceió, AL · Brasil
          </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="flex flex-col divide-y divide-border">

        {/* Origem */}
        <AnimatedSection>
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                            sticky top-[72px] h-fit">
              Origem
            </div>
            <div className="prose-custom">
              <p>
                Engenheiro de computação e fundador da{" "}
                <a href="https://requiemcompany.com.br" target="_blank" rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors">Requiem Company</a>.
                Construo infraestrutura digital para municípios brasileiros — sistemas que gestores públicos
                usam para tomar decisões sobre sinalização viária, transporte escolar, rastreabilidade de
                dispositivos cardíacos e distribuição de recursos culturais.
              </p>
              <p>
                Nasci em 29 de abril de 1998, cresci em Alagoas. Me formei em Engenharia da Computação
                pela UFAL. Antes mesmo de concluir a graduação, já estava construindo sistemas que
                prefeituras alagoanas usariam para gerir serviços públicos. Não esperei o diploma para começar.
              </p>
              <p>
                Fora do eixo SP-RJ. Acredito que tecnologia de qualidade não é privilégio de capital. Em
                2022 fundei a Requiem Company com um objetivo claro: infraestrutura digital densa, sem
                investimento externo, com utilidade social real. Cada contrato financiou o próximo.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* O que faço */}
        <AnimatedSection>
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                            sticky top-[72px] h-fit">
              O que faço
            </div>
            <div className="prose-custom">
              <p>
                Construo sistemas — não features. Cada projeto é pensado como infraestrutura:
                multi-tenant, auditável, escalável, com governança. RBAC/ABAC nativos,
                documentação técnica como cidadã de primeira classe, APIs com envelope padrão,
                observabilidade desde o dia zero.
              </p>
              <p>
                Transito entre engenharia de software, gestão de produto, gestão de projetos,
                documentação técnica, atuação institucional e visão empresarial. Não sou especialista
                em uma fatia — domino o sistema inteiro. Do levantamento de requisitos com secretários
                municipais ao deploy em VPS próprio.
              </p>
              <p>
                Paralelamente ao produto, faço pesquisa acadêmica no NEES/UFAL: engenharia de requisitos
                formal, sistemas de informação para gestão pública, healthtech. 4 papers publicados em
                conferências internacionais (DGO, SBCAS). Pipeline ativo para SBES 2026, SBCAS 2026 e
                IEEE Access.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Stack */}
        <AnimatedSection>
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                            sticky top-[72px] h-fit">
              Stack
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {stack.map(({ cat, items }) => (
                <div key={cat} className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
                    {cat}
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[14px] text-foreground">
                        <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Trajetória */}
        <AnimatedSection>
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                            sticky top-[72px] h-fit">
              Trajetória
            </div>
            <div className="flex flex-col gap-0">
              {timeline.map(({ year, event }, i) => (
                <div key={i} className="flex gap-6 py-4 border-b border-border/40 last:border-0">
                  <span className="font-mono text-[12px] text-primary shrink-0 w-10">{year}</span>
                  <span className="text-[14px] text-foreground leading-snug">{event}</span>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Valores */}
        <AnimatedSection>
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                            sticky top-[72px] h-fit">
              Valores
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Excelência como dever",
                "Utilidade real",
                "Legado",
                "Estrutura antes de estética",
                "Responsabilidade",
                "Escala com sentido",
                "Serviço público",
                "Autonomia",
              ].map((v) => (
                <span key={v}
                  className="px-3 py-1.5 rounded border border-border text-[12px] font-mono text-muted
                             tracking-[0.06em]">
                  {v}
                </span>
              ))}
            </div>
          </section>
        </AnimatedSection>

      </div>

      {/* ── Footer CTA ── */}
      <div className="py-[clamp(64px,10vh,120px)] border-t border-border mt-8 text-center">
        <p className="font-editorial italic text-muted text-lg mb-6">
          &ldquo;Que meu cansaço a outros descanse.&rdquo;
        </p>
        <Link
          href="/contato"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                     bg-primary text-primary-foreground font-medium text-sm
                     hover:bg-primary-deep transition-colors"
        >
          Entrar em contato
          <span aria-hidden>→</span>
        </Link>
      </div>

    </div>
  );
}
