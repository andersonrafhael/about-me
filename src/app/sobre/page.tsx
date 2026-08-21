import Link from "next/link";
import { AvatarInitials } from "@/components/avatar-initials";
import { Reveal } from "@/components/reveal";
import { getProject, featuredProjects } from "@/data/projects";
import { manifesto, now, site, timeline, values } from "@/data/site";
import { breadcrumb, profilePage, serializeJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sobre",
  description:
    "Anderson Rafhael, engenheiro de computação e fundador da Requiem Company em Maceió: quem é, como trabalha, no que está focado agora e a trajetória até aqui.",
  path: "/sobre",
});

const stackColumns = [
  {
    label: "Frontend",
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
  },
  { label: "Backend", items: ["Django 5", "DRF", "PostgreSQL", "PostGIS"] },
  {
    label: "Infra",
    items: ["Docker", "Traefik", "Cloudflare", "VPS própria"],
  },
  { label: "IA", items: ["Claude API", "RAG local", "pgvector", "Python"] },
] as const;

function formatUpdatedAt(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

export default function SobrePage() {
  const requiemForge = getProject("requiem-forge");
  const requiemLinks = requiemForge
    ? [...featuredProjects, requiemForge]
    : featuredProjects;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(profilePage()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumb([
              { name: "Início", path: "/" },
              { name: "Sobre", path: "/sobre" },
            ]),
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
            <span className="text-foreground">Sobre</span>
          </nav>
        </div>

        <header className="mb-[clamp(48px,7vh,88px)] grid gap-6 border-b border-border pb-[clamp(32px,5vh,56px)] md:grid-cols-[1fr_auto] md:items-end">
          <h1 className="editorial-title">
            Sobre<span className="punct">.</span>
          </h1>
          <div className="flex items-end gap-5">
            <AvatarInitials size="md" />
            <div className="mono-label text-right leading-relaxed">
              <span className="block text-foreground">{site.name}</span>
              <span>Fundador · Engenheiro de computação</span>
              <br />
              <span>{site.location}</span>
            </div>
          </div>
        </header>

        <div className="divide-y divide-border">
          {/* Quem */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">Quem</h2>
            <Reveal>
              <div className="prose-custom">
                <p>
                  Engenheiro de computação formado pela Universidade Federal de
                  Alagoas e fundador da Requiem Company, em Maceió. Construo
                  infraestrutura digital para instituições públicas: sistemas
                  que prefeituras usam para cuidar da sinalização viária e do
                  transporte universitário, que hospitais usam para acompanhar
                  quem carrega um dispositivo implantável, que operadores usam
                  para gerir recarga elétrica.
                </p>
                <p>
                  Nasci em 1998, em Alagoas, e escolhi construir daqui. Fora do
                  eixo São Paulo–Rio, sem capital externo, com a convicção de
                  que tecnologia de qualidade para o setor público não é
                  privilégio de capital: é método, requisito bem escrito e gente
                  disposta a ir a campo.
                </p>
                <p>
                  No NEES/UFAL atuo como gerente de produto em plataformas
                  federais do Ministério da Cultura e do Ministério da Educação,
                  e faço pesquisa em engenharia de requisitos e sistemas de
                  informação pública. Produto e pesquisa andam no mesmo ciclo: o
                  que vai para produção também vira hipótese, e o que a hipótese
                  revela volta para o produto.
                </p>
              </div>
            </Reveal>
          </section>

          {/* Requiem Company */}
          <section
            id="requiem"
            className="section-grid scroll-mt-24 py-[clamp(48px,7vh,88px)]"
          >
            <h2 className="mono-label sticky top-[88px] h-fit">
              Requiem Company
            </h2>
            <Reveal>
              <div className="flex flex-col gap-8">
                <p className="lede">{site.company.description}</p>
                <dl className="grid gap-6 sm:grid-cols-3">
                  {manifesto.markers.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1.5">
                      <dt className="mono-sublabel">{m.label}</dt>
                      <dd className="text-[14px] leading-relaxed text-foreground/75">
                        {m.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
                <ul className="flex flex-col gap-2">
                  {requiemLinks.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/projetos/${p.slug}`} className="link-quiet">
                        {p.name} — {p.tagline}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="text-[14px] text-foreground/70">
                  Fundada em 2024. Sem capital externo.
                </p>
              </div>
            </Reveal>
          </section>

          {/* Agora */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">Agora</h2>
            <Reveal>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col divide-y divide-border border-t border-border">
                  {now.items.map((item) => (
                    <div
                      key={item.title}
                      className="flex flex-col gap-1.5 py-5"
                    >
                      <h3 className="font-headline text-[17px] leading-snug text-foreground">
                        {item.title}
                      </h3>
                      <p className="max-w-[58ch] text-[14px] leading-relaxed text-foreground/75">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="font-mono text-[11px] text-foreground/60">
                  atualizado em {formatUpdatedAt(now.updatedAt)}
                </p>
              </div>
            </Reveal>
          </section>

          {/* Como trabalho */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">
              Como trabalho
            </h2>
            <Reveal>
              <div className="prose-custom">
                <p>
                  Sistemas, não features. Cada projeto nasce multi-tenant,
                  auditável e documentado, com controle de acesso e
                  observabilidade desde o primeiro ambiente — porque instituição
                  pública muda de gestão, e o sistema precisa sobreviver a isso.
                </p>
                <p>
                  Especificação antes de código. O Requiem Forge, o harness que
                  mantenho, dimensiona cada tarefa, exige critério de aceite e
                  só aceita “pronto” depois de um gate mecânico. Revisão em
                  contexto limpo, separada de quem implementou.
                </p>
                <p>
                  Requisitos com validade. Com o RHEMA, requisitos têm posição
                  na hierarquia, data de validade e maturidade composta. Um
                  requisito envelhecido é sinalizado antes de virar bug em
                  produção.
                </p>
              </div>
            </Reveal>
          </section>

          {/* Trajetória */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">Trajetória</h2>
            <Reveal>
              <ol className="flex flex-col">
                {timeline.map((t) => (
                  <li key={t.year} className="grid grid-cols-[72px_1fr] gap-6">
                    <span className="pt-1 font-mono text-[12px] text-primary-text">
                      {t.year}
                    </span>
                    <div className="flex flex-col gap-1.5 border-l border-border pb-10 pl-6 last:pb-0">
                      <h3 className="font-headline text-[18px] leading-snug text-foreground">
                        {t.title}
                      </h3>
                      <p className="max-w-[58ch] text-[14px] leading-relaxed text-foreground/75">
                        {t.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </section>

          {/* Stack */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">Stack</h2>
            <Reveal>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stackColumns.map(({ label, items }) => (
                  <div key={label} className="flex flex-col gap-3">
                    <span className="mono-sublabel">{label}</span>
                    <ul className="flex flex-col gap-1.5">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="text-[14px] text-foreground/85"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Valores */}
          <section className="section-grid py-[clamp(48px,7vh,88px)]">
            <h2 className="mono-label sticky top-[88px] h-fit">Valores</h2>
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {values.map((v) => (
                  <span key={v} className="chip">
                    <span className="text-foreground/80">{v}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </section>
        </div>

        <div className="flex flex-col items-center gap-8 py-[clamp(56px,8vh,96px)] text-center">
          <p className="font-headline text-[clamp(20px,2.4vw,30px)] text-fg-bright">
            {site.lema}
          </p>
          <Link href="/contato" className="btn btn-primary">
            Entrar em contato
          </Link>
        </div>
      </div>
    </>
  );
}
