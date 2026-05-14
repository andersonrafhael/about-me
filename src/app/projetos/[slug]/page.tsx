import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.name, description: project.tagline };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { name, category, status, tagline, description, metrics, url, tier, role } = project;

  const statusLabel: Record<string, string> = {
    ativo:     "em operação",
    beta:      "beta",
    encerrado: "encerrado",
  };

  const statusColors: Record<string, string> = {
    ativo:     "text-mint",
    beta:      "text-warning",
    encerrado: "text-muted",
  };

  return (
    <div className="min-h-screen px-site max-w-[1280px] mx-auto">

      {/* ── Breadcrumb ── */}
      <div className="pt-page mb-16">
        <nav className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                        flex items-center gap-2.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors text-muted">Início</Link>
          <span className="text-muted-2">/</span>
          <Link href="/projetos" className="hover:text-foreground transition-colors text-muted">Projetos</Link>
          <span className="text-muted-2">/</span>
          <span className="text-foreground font-medium">{name}</span>
        </nav>
      </div>

      {/* ── Header ── */}
      <div className="mb-[clamp(48px,7vh,88px)] pb-[clamp(40px,5vh,64px)] border-b border-border">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted
                           border border-border/60 px-2 py-0.5 rounded">
            {category}
          </span>
          <span className={`font-mono text-[10px] tracking-[0.18em] uppercase ${statusColors[status] ?? "text-muted"}`}>
            {statusLabel[status] ?? status}
          </span>
          {tier === 2 && role && (
            <span className="font-mono text-[10px] text-foreground/45 tracking-[0.12em] uppercase">
              {role}
            </span>
          )}
        </div>
        <h1 className="editorial-title mb-4">
          {name}<span className="punct">.</span>
        </h1>
        <p className="text-[18px] text-foreground/75 leading-relaxed max-w-[60ch]">
          {tagline}
        </p>
      </div>

      {/* ── Descrição ── */}
      <div className="max-w-[72ch] mb-[clamp(48px,7vh,88px)]">
        <p className="text-[16px] text-foreground/80 leading-[1.75]">
          {description}
        </p>

        {metrics && (
          <div className="mt-8 pl-5 border-l-2 border-primary/40">
            <p className="font-mono text-[13px] text-primary/80 leading-relaxed">
              {metrics}
            </p>
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      {url && (
        <div className="border-t border-border pt-8">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                       bg-primary text-primary-foreground font-medium text-sm
                       hover:bg-primary-deep transition-colors"
          >
            Ver projeto ao vivo
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </div>
  );
}
