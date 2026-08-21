import Link from "next/link";
import { channels, site } from "@/data/site";
import { featuredProjects } from "@/data/projects";

const navLinks = [
  { href: "/projetos", label: "Projetos" },
  { href: "/escrita", label: "Escrita" },
  { href: "/pesquisa", label: "Pesquisa" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="hairline section-alt">
      <div className="container-site px-site py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="font-display text-[22px] leading-none text-foreground">
              AR<span className="text-primary">.</span>
              <span className="sr-only"> Anderson Rafhael — início</span>
            </Link>
            <p className="max-w-[38ch] text-[14px] leading-relaxed text-foreground/75">
              Anderson Rafhael, engenheiro de computação e fundador da Requiem
              Company. Infraestrutura digital para gestão pública, saúde e
              mobilidade, construída em Maceió.
            </p>
            <p className="font-headline text-[15px] text-foreground/85">
              “{site.lema}”
            </p>
          </div>

          <nav aria-label="Rodapé — seções" className="flex flex-col gap-3">
            <p className="mono-sublabel">Navegação</p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet text-[14px]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rodapé — projetos" className="flex flex-col gap-3">
            <p className="mono-sublabel">Produtos</p>
            <ul className="flex flex-col gap-2">
              {featuredProjects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projetos/${p.slug}`}
                    className="link-quiet text-[14px]"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/projetos/requiem-forge"
                  className="link-quiet text-[14px]"
                >
                  Requiem Forge
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="mono-sublabel">Canais</p>
            <ul className="flex flex-col gap-2">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="link-quiet text-[14px]"
                    {...(c.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer me" }
                      : {})}
                  >
                    {c.label}
                    {c.href.startsWith("http") && (
                      <span className="sr-only"> (abre em nova aba)</span>
                    )}
                  </a>
                </li>
              ))}
              <li>
                <a href="/feed.xml" className="link-quiet text-[14px]">
                  RSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 font-mono text-[11px] tracking-[0.08em] text-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · {site.company.name} · Maceió, AL
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Next.js · sem cookies · sem rastreamento</span>
            <span className="text-muted-2" aria-hidden>
              ·
            </span>
            <a
              href={site.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet"
            >
              código-fonte<span className="sr-only"> (abre em nova aba)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
