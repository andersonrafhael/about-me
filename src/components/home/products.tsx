import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ProductFrame } from "@/components/ui/product-frame";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { featuredProjects, getProject, type Project } from "@/data/projects";

const cycleSgdi = [
  "Lote no estoque",
  "Implante em sala",
  "Cartão do portador",
  "Emergência",
  "Retorno programado",
];

function Cycle({ project }: { project: Project }) {
  return (
    <div className="surface rounded-2xl p-6 sm:p-8">
      <p className="mono-sublabel mb-6">Ciclo de vida do portador</p>
      <ol className="grid gap-4 sm:grid-cols-5">
        {cycleSgdi.map((step, i) => (
          <li
            key={step}
            className="flex flex-col gap-2 border-t border-border pt-3"
          >
            <span className="font-mono text-[11px] text-primary-text">
              0{i + 1}
            </span>
            <span className="font-headline text-[15px] font-medium leading-snug text-foreground">
              {step}
            </span>
          </li>
        ))}
      </ol>
      {project.facts && (
        <dl className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-3">
          {project.facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <dd className="font-headline text-[15px] font-semibold text-fg-bright">
                {f.value}
              </dd>
              <dt className="mono-sublabel">{f.label}</dt>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

export function Products() {
  const secondary = ["synapse-lab", "rhema", "requiem-forge"]
    .map(getProject)
    .filter((p): p is Project => Boolean(p));

  return (
    <section
      id="produtos"
      className="section section-alt hairline"
      aria-labelledby="produtos-title"
    >
      <div className="container-site flex flex-col gap-16 lg:gap-24">
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="Produtos"
            title={
              <span id="produtos-title">
                O que construo<span className="punct">.</span>
              </span>
            }
            aside="Plataformas que instituições públicas operam todo dia. Estado real, papel nomeado e captura com data."
          />
        </Reveal>

        {featuredProjects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={p.slug}>
              <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div
                  className={`flex flex-col gap-5 lg:col-span-5 ${flip ? "lg:order-2" : ""}`}
                >
                  <p className="mono-label">
                    <span className="text-primary-text">0{i + 1}</span> ·{" "}
                    {p.category}
                  </p>
                  <h3 className="display text-[clamp(34px,4.2vw,60px)]">
                    <Link
                      href={`/projetos/${p.slug}`}
                      className="transition-colors hover:text-primary-light"
                    >
                      {p.name}
                    </Link>
                    {p.subtitle && (
                      <span className="mt-2 block font-headline text-[clamp(16px,1.4vw,20px)] font-medium tracking-[-0.02em] text-foreground/70">
                        {p.subtitle}
                      </span>
                    )}
                  </h3>
                  <p className="max-w-[52ch] text-[16px] leading-relaxed text-foreground/80">
                    {p.tagline}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={p.status} />
                    {p.stack.slice(0, 3).map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.04em] text-foreground/65">
                    {p.role}
                  </p>
                  <Link
                    href={`/projetos/${p.slug}`}
                    className="link-quiet w-fit font-mono text-[13px]"
                  >
                    Ver o projeto →
                  </Link>
                </div>
                <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                  {p.media?.[0] ? (
                    <ProductFrame
                      item={p.media[0]}
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      tilt
                    />
                  ) : (
                    <Cycle project={p} />
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}

        <Reveal>
          <div className="grid gap-6 border-t border-border pt-8 md:grid-cols-[220px_1fr] md:items-start">
            <p className="mono-label pt-1">Também</p>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-3">
              {secondary.map((p) => (
                <li key={p.slug} className="flex flex-col gap-1.5">
                  <Link
                    href={`/projetos/${p.slug}`}
                    className="font-headline text-[17px] font-semibold text-foreground transition-colors hover:text-fg-bright"
                  >
                    {p.name} <span aria-hidden>→</span>
                  </Link>
                  <span className="text-[13px] leading-snug text-foreground/70">
                    {p.tagline}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
