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

  const { name, category, status, tagline, description, stack, metrics, url, tier, role } =
    project;

  const statusColors: Record<string, string> = {
    ativo:     "text-mint",
    beta:      "text-warning",
    encerrado: "text-muted",
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="layout-flow gap-12">
        {/* Breadcrumb */}
        <Link
          href="/projetos"
          className="text-sm text-muted hover:text-foreground transition-colors font-mono"
        >
          ← /projetos
        </Link>

        {/* Header */}
        <div className="layout-flow gap-4">
          <div className="layout-cluster gap-3">
            <span className="text-xs font-mono text-muted border border-border px-2 py-0.5 rounded-full">
              {category}
            </span>
            <span className={`text-xs font-mono ${statusColors[status] ?? "text-muted"}`}>
              {status}
            </span>
            {tier === 2 && role && (
              <span className="text-xs font-mono text-foreground/50">{role}</span>
            )}
          </div>
          <h1 className="font-headline text-4xl font-bold text-foreground">{name}</h1>
          <p className="text-lg text-foreground/80 leading-relaxed">{tagline}</p>
        </div>

        {/* Descrição */}
        <div className="layout-flow gap-4 text-foreground/75 leading-relaxed">
          <p>{description}</p>
          {metrics && (
            <p className="font-mono text-sm text-primary border-l-2 border-primary pl-4">
              {metrics}
            </p>
          )}
        </div>

        {/* Stack como bloco de código */}
        <div className="layout-flow gap-3">
          <h2 className="text-xs font-mono text-muted uppercase tracking-widest">Stack</h2>
          <div className="glass-card rounded-xl p-4 font-mono text-sm">
            <div className="text-foreground/30 mb-2 text-xs">{`// ${name.toLowerCase()}.config`}</div>
            <div className="layout-flow gap-1">
              {stack.map((tech, i) => (
                <div key={tech} className="layout-cluster gap-2">
                  <span className="text-primary/60 select-none">{i === 0 ? "[" : " "}</span>
                  <span className="text-mint">&quot;{tech}&quot;</span>
                  <span className="text-foreground/25">{i < stack.length - 1 ? "," : "]"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-mono"
          >
            → ver projeto ao vivo
          </a>
        )}
      </div>
    </div>
  );
}
