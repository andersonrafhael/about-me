import Link from "next/link";
import { ProductFrame } from "@/components/ui/product-frame";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Project } from "@/data/projects";

type ProjectRowProps = {
  project: Project;
  /** Índice editorial mono, ex.: "01". */
  index: string;
  /** Esconde imagem e stack — usado em listas de relacionados. */
  compact?: boolean;
};

export function ProjectRow({
  project,
  index,
  compact = false,
}: ProjectRowProps) {
  const {
    slug,
    name,
    subtitle,
    tagline,
    category,
    status,
    group,
    role,
    institution,
    stack,
    media,
  } = project;
  const cover = !compact ? media?.[0] : undefined;

  return (
    <Link href={`/projetos/${slug}`} className="group block">
      <article className="surface-hover grid gap-5 border-t border-border py-7 md:grid-cols-[56px_1fr_auto] md:items-center md:gap-8">
        <span className="mono-label text-primary-text" aria-hidden>
          {index}
        </span>

        <div className="flex min-w-0 flex-col gap-2.5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="inline-flex items-center gap-2 font-headline text-[clamp(24px,2.6vw,34px)] font-bold tracking-[-0.03em] text-foreground transition-colors duration-200 group-hover:text-fg-bright">
              {name}
              <span
                className="translate-x-[-4px] text-primary-text opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden
              >
                →
              </span>
            </h3>
            {subtitle && (
              <span className="text-[15px] text-foreground/70">{subtitle}</span>
            )}
          </div>

          <p className="max-w-[62ch] text-foreground/75">{tagline}</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <StatusBadge status={status} />
            <span className="chip">{category}</span>
            {group === "nees" && (
              <span className="mono-sublabel normal-case tracking-[0.02em] text-foreground/70">
                {role}
                {institution ? ` · ${institution}` : ""}
              </span>
            )}
          </div>

          {!compact && stack.length > 0 && (
            <p className="flex flex-wrap items-center gap-x-1.5 font-mono text-[11px] text-foreground/65">
              {stack.slice(0, 4).map((tech, i) => (
                <span key={tech} className="inline-flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden>·</span>}
                  {tech}
                </span>
              ))}
            </p>
          )}
        </div>

        {cover && (
          <div className="hidden md:block">
            <ProductFrame
              item={cover}
              caption={false}
              sizes="(min-width:1024px) 300px, 100vw"
              className="w-[300px]"
            />
          </div>
        )}
        {cover && (
          <div className="md:hidden">
            <ProductFrame
              item={cover}
              caption={false}
              sizes="100vw"
              className="w-full"
            />
          </div>
        )}
      </article>
    </Link>
  );
}
