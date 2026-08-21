import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectRow } from "@/components/project-row";
import { Reveal } from "@/components/reveal";
import { ProductFrame } from "@/components/ui/product-frame";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getProject, groupLabel, projects, statusLabel } from "@/data/projects";
import { breadcrumb, creativeWork, serializeJsonLd } from "@/lib/json-ld";
import { clampDescription, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const fullTitle = project.subtitle
    ? `${project.name} — ${project.subtitle}`
    : project.name;
  const title = fullTitle.length <= 42 ? fullTitle : project.name;

  return pageMetadata({
    ogImage: "file",
    title,
    description: clampDescription(project.summary),
    path: `/projetos/${slug}`,
  });
}

const sectionLabels = [
  { key: "problem", label: "Problema" },
  { key: "approach", label: "Abordagem" },
  { key: "state", label: "Estado e escala" },
  { key: "learning", label: "Aprendizado" },
] as const;

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const cover = project.media?.[0];
  const gallery = project.media?.slice(1) ?? [];
  const relatedProjects = (project.related ?? [])
    .map((s) => getProject(s))
    .filter((p) => p !== undefined)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumb([
              { name: "Início", path: "/" },
              { name: "Projetos", path: "/projetos" },
              { name: project.name },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            creativeWork({
              group: project.group,
              institution: project.institution,
              slug: project.slug,
              name: project.name,
              description: project.summary,
              role: project.role,
              url: project.links?.[0]?.href,
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
            <Link
              href="/projetos"
              className="text-foreground/70 transition-colors hover:text-fg-bright"
            >
              Projetos
            </Link>
            <span className="text-muted-2" aria-hidden>
              /
            </span>
            <span className="text-foreground">{project.name}</span>
          </nav>
        </div>

        <header className="mb-[clamp(40px,6vh,64px)]">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="chip">{project.category}</span>
            <span className="chip">{groupLabel[project.group].title}</span>
          </div>

          <h1 className="editorial-title mb-3">
            {project.name}
            <span className="punct">.</span>
          </h1>

          {project.subtitle && (
            <p className="mb-4 font-headline text-[clamp(18px,2vw,26px)] text-foreground/80">
              {project.subtitle}
            </p>
          )}

          <p className="lede mb-10">{project.tagline}</p>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-8 lg:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <dt className="mono-label">Papel</dt>
              <dd className="text-[15px] text-foreground/85">{project.role}</dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="mono-label">Período</dt>
              <dd className="text-[15px] text-foreground/85">
                {project.period}
              </dd>
            </div>
            {project.institution && (
              <div className="flex flex-col gap-1.5">
                <dt className="mono-label">Instituição</dt>
                <dd className="text-[15px] text-foreground/85">
                  {project.institution}
                </dd>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <dt className="mono-label">Estado</dt>
              <dd className="text-[15px] text-foreground/85">
                {statusLabel[project.status]}
              </dd>
            </div>
          </dl>
        </header>

        {cover && (
          <Reveal className="mb-[clamp(40px,6vh,64px)]">
            <ProductFrame
              item={cover}
              priority
              sizes="(min-width:1280px) 1200px, 100vw"
            />
          </Reveal>
        )}

        <div className="divide-y divide-border">
          {sectionLabels.map(({ key, label }) => (
            <div key={key} className="section-grid py-[clamp(40px,6vh,72px)]">
              <h2 className="mono-label sticky top-[88px] h-fit">{label}</h2>
              <Reveal className="prose-custom">
                {project[key].map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {key === "state" && project.facts && (
                  <dl className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
                    {project.facts.map((fact) => (
                      <div key={fact.label} className="flex flex-col gap-1.5">
                        <dt className="mono-sublabel">{fact.label}</dt>
                        <dd className="flex flex-col gap-1 font-headline text-[18px] font-semibold text-fg-bright">
                          {fact.value}
                          {fact.source && (
                            <span className="font-sans text-[12px] font-normal text-foreground/60">
                              {fact.source}
                            </span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </Reveal>
            </div>
          ))}
        </div>

        {gallery.length > 0 && (
          <section className="mb-[clamp(56px,8vh,96px)] mt-[clamp(24px,4vh,40px)]">
            <Reveal>
              <SectionHeader
                eyebrow="Galeria"
                title="Telas."
                className="mb-8"
              />
            </Reveal>
            <Reveal>
              <div className="grid gap-6 md:grid-cols-2">
                {gallery.map((item) => (
                  <ProductFrame
                    key={item.caption}
                    item={item}
                    sizes="(min-width:768px) 50vw, 100vw"
                  />
                ))}
              </div>
            </Reveal>
          </section>
        )}

        <section className="mb-[clamp(56px,8vh,96px)]">
          <Reveal>
            <h2 className="mono-label mb-5">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>

          {project.links && project.links.length > 0 && (
            <Reveal className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => {
                const isExternal = link.href.startsWith("http");
                return isExternal ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    {link.label}
                    <span aria-hidden>↗</span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="btn btn-ghost"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </Reveal>
          )}
        </section>

        {relatedProjects.length > 0 && (
          <section className="mb-[clamp(56px,8vh,96px)]">
            <Reveal>
              <SectionHeader
                eyebrow="Relacionados"
                title="Outros projetos."
                className="mb-2"
              />
            </Reveal>
            <div>
              {relatedProjects.map((related, i) => (
                <Reveal key={related.slug} delay={i * 60}>
                  <ProjectRow
                    project={related}
                    index={String(i + 1).padStart(2, "0")}
                    compact
                  />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-wrap gap-4 border-t border-border pb-[clamp(56px,8vh,96px)] pt-[clamp(40px,6vh,64px)]">
          <Link href="/contato" className="btn btn-primary">
            Conversar sobre o {project.name}
          </Link>
          <Link href="/projetos" className="btn btn-ghost">
            Todos os projetos
          </Link>
        </div>
      </div>
    </>
  );
}
