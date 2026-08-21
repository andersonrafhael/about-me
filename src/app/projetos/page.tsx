import Link from "next/link";
import { ProjectRow } from "@/components/project-row";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import {
  concepts,
  groupLabel,
  projectsByGroup,
  type ProjectGroup,
} from "@/data/projects";
import { breadcrumb, collectionPage, serializeJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projetos",
  description:
    "Sigma, UniPass, SGDI, MicroRED, Synapse Lab, RHEMA e Requiem Forge, e as plataformas federais em que atuo como gerente de produto no NEES/UFAL.",
  path: "/projetos",
});

const groupOrder: ProjectGroup[] = ["requiem", "infra", "nees"];

const groupIndex: Record<ProjectGroup, string> = {
  requiem: "01",
  infra: "02",
  nees: "03",
};

const groupTitle: Record<ProjectGroup, string> = {
  requiem: "O que construo",
  infra: "Como opero",
  nees: "Onde sou gerente de produto",
};

export default function ProjetosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            collectionPage({
              name: "Projetos",
              description:
                "Sigma, UniPass, SGDI, MicroRED, Synapse Lab, RHEMA e Requiem Forge, e as plataformas federais em que atuo como gerente de produto no NEES/UFAL.",
              path: "/projetos",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumb([{ name: "Início", path: "/" }, { name: "Projetos" }]),
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
            <span className="text-foreground">Projetos</span>
          </nav>
        </div>

        <header className="mb-[clamp(48px,7vh,88px)] grid gap-6 border-b border-border pb-[clamp(32px,5vh,56px)] md:grid-cols-[1fr_auto] md:items-end">
          <h1 className="editorial-title">
            Projetos<span className="punct">.</span>
          </h1>
          <p className="lede md:text-right">
            Infraestrutura digital para instituições públicas: o que está em
            operação, em piloto e em desenvolvimento, com o papel nomeado em
            cada projeto.
          </p>
        </header>

        {groupOrder.map((group) => {
          const groupProjects = projectsByGroup(group);
          if (groupProjects.length === 0) return null;
          return (
            <section
              key={group}
              className="mb-[clamp(56px,8vh,96px)]"
              aria-label={groupLabel[group].title}
            >
              <Reveal>
                <SectionHeader
                  index={groupIndex[group]}
                  eyebrow={groupLabel[group].title}
                  title={
                    <>
                      {groupTitle[group]}
                      <span className="punct">.</span>
                    </>
                  }
                  aside={groupLabel[group].detail}
                  className="mb-2"
                />
              </Reveal>
              <div>
                {groupProjects.map((project, i) => (
                  <Reveal key={project.slug} delay={i * 60}>
                    <ProjectRow
                      project={project}
                      index={String(i + 1).padStart(2, "0")}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}

        <section className="mb-[clamp(56px,8vh,96px)]">
          <Reveal>
            <SectionHeader
              index="04"
              eyebrow="Próximos e verticais internas"
              title={
                <>
                  O que vem depois<span className="punct">.</span>
                </>
              }
              className="mb-10"
            />
          </Reveal>
          <Reveal>
            <dl className="grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
              {concepts.map((concept) => (
                <div key={concept.name} className="flex flex-col gap-2">
                  <dt className="font-headline text-[18px] font-semibold text-fg-bright">
                    {concept.name}
                  </dt>
                  <dd className="text-foreground/75">{concept.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-border pb-[clamp(56px,8vh,96px)] pt-[clamp(40px,6vh,64px)]">
          <Link href="/contato" className="btn btn-primary">
            Falar sobre um projeto
          </Link>
          <Link href="/escrita" className="btn btn-ghost">
            Ler a escrita
          </Link>
        </div>
      </div>
    </>
  );
}
