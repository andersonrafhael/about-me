import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  affiliation,
  interests,
  pipeline,
  pipelineStatusLabel,
  published,
  type PipelineStatus,
} from "@/data/research";
import { breadcrumb, collectionPage, serializeJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pesquisa",
  description:
    "Pesquisa de Anderson Rafhael em engenharia de requisitos e sistemas de informação pública: rota ICSE-SEIP 2027, pipeline e artigos em coautoria (NEES/UFAL).",
  path: "/pesquisa",
});

const pipelineStatusTone: Record<PipelineStatus, string> = {
  escrita: "text-mint",
  corpus: "text-primary-light",
  fila: "text-foreground/70",
  ideacao: "text-foreground/70",
};

export default function PesquisaPage() {
  const [current, ...rest] = pipeline;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumb([
              { name: "Início", path: "/" },
              { name: "Pesquisa", path: "/pesquisa" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            collectionPage({
              name: "Pesquisa",
              description:
                "Rota de pesquisa, pipeline e artigos publicados em coautoria no NEES/UFAL.",
              path: "/pesquisa",
            }),
          ),
        }}
      />
      <div className="container-site px-site">
        <div className="pt-page mb-12">
          <nav
            aria-label="Trilha"
            className="mono-label flex items-center gap-2.5"
          >
            <Link
              href="/"
              className="text-foreground/70 transition-colors hover:text-fg-bright"
            >
              Início
            </Link>
            <span className="text-muted-2" aria-hidden>
              /
            </span>
            <span className="text-foreground">Pesquisa</span>
          </nav>
        </div>

        <header className="mb-[clamp(48px,7vh,88px)] grid gap-6 border-b border-border pb-[clamp(32px,5vh,56px)] md:grid-cols-[1fr_auto] md:items-end">
          <h1 className="editorial-title">
            Pesquisa<span className="punct">.</span>
          </h1>
          <p className="mono-label md:text-right">
            4 artigos em coautoria · NEES/UFAL
          </p>
        </header>

        <div className="divide-y divide-border">
          {/* Rota vigente */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">
              Rota vigente
            </h2>
            <Reveal>
              <div className="flex flex-col gap-4">
                <h2 className="font-headline font-bold text-[clamp(22px,2.6vw,32px)] leading-tight text-fg-bright">
                  {current.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px] text-foreground/70">
                  <span>{current.venue}</span>
                  {current.when && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{current.when}</span>
                    </>
                  )}
                </div>
                <span
                  className={`chip w-fit ${pipelineStatusTone[current.status]}`}
                >
                  {pipelineStatusLabel[current.status]}
                </span>
                <p className="max-w-[64ch] text-[15px] leading-relaxed text-foreground/80">
                  {current.detail}
                </p>
                <p className="text-[14px] text-foreground/65">
                  Rota única desde julho de 2026: nenhum outro paper passa à
                  frente desta submissão.
                </p>
              </div>
            </Reveal>
          </section>

          {/* Pipeline */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">Pipeline</h2>
            <div className="flex flex-col divide-y divide-border">
              {rest.map((item, i) => (
                <Reveal key={item.title} delay={i * 70}>
                  <article className="flex flex-col gap-3 py-6 first:pt-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="max-w-[52ch] font-headline text-[18px] leading-snug text-foreground">
                        {item.title}
                      </h3>
                      <span
                        className={`chip shrink-0 ${pipelineStatusTone[item.status]}`}
                      >
                        {pipelineStatusLabel[item.status]}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 font-mono text-[12px] text-foreground/70">
                      <span>{item.product}</span>
                      <span aria-hidden>·</span>
                      <span>{item.venue}</span>
                      {item.when && (
                        <>
                          <span aria-hidden>·</span>
                          <span>{item.when}</span>
                        </>
                      )}
                    </div>
                    <p className="max-w-[62ch] text-[14px] leading-relaxed text-foreground/75">
                      {item.detail}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Publicações */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">
              Publicações
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col divide-y divide-border border-t border-border">
                {published.map((pub) => (
                  <article
                    key={pub.title}
                    className="grid grid-cols-[40px_1fr] gap-4 py-6"
                  >
                    <span className="pt-1 font-mono text-[12px] text-primary-text">
                      {pub.year}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {pub.doi ? (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-quiet w-fit text-[15px] leading-snug text-fg-bright"
                        >
                          {pub.title}
                          <span className="sr-only"> (abre em nova aba)</span>
                        </a>
                      ) : pub.href ? (
                        <Link
                          href={pub.href}
                          className="link-quiet w-fit text-[15px] leading-snug text-fg-bright"
                        >
                          {pub.title}
                        </Link>
                      ) : (
                        <span className="text-[15px] leading-snug text-fg-bright">
                          {pub.title}
                        </span>
                      )}
                      <span className="text-[13px] text-foreground/75">
                        {pub.venue}
                      </span>
                      <span className="text-[13px] text-foreground/65">
                        {pub.authors}
                      </span>
                      {pub.note && (
                        <span className="font-mono text-[11px] text-foreground/60">
                          {pub.note}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <p className="max-w-[62ch] text-[13px] leading-relaxed text-foreground/65">
                Publicações no âmbito do NEES/UFAL; a contribuição própria do
                portfólio Requiem (RHEMA) está em escrita.
              </p>
            </div>
          </section>

          {/* Interesses */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">Interesses</h2>
            <ol className="flex flex-col gap-3">
              {interests.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-snug text-foreground"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-[11px] text-primary-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </section>

          {/* Afiliação */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">Afiliação</h2>
            <dl className="flex flex-col gap-5 text-[15px] text-foreground">
              <div>
                <dt className="mono-sublabel mb-1">Instituição</dt>
                <dd>{affiliation.university}</dd>
              </div>
              <div>
                <dt className="mono-sublabel mb-1">Núcleo</dt>
                <dd>{affiliation.unit}</dd>
              </div>
              <div>
                <dt className="mono-sublabel mb-1">Graduação</dt>
                <dd>{affiliation.degree}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="h-[clamp(64px,8vh,100px)]" />
      </div>
    </>
  );
}
