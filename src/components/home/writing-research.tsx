import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { pipeline, pipelineStatusLabel, published } from "@/data/research";
import { getAllPosts } from "@/lib/posts";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`)
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(".", "");
}

export function WritingResearch() {
  const posts = getAllPosts().slice(0, 3);
  const route = pipeline[0];

  return (
    <section className="section hairline" aria-labelledby="escrita-title">
      <div className="container-site flex flex-col gap-14">
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow="Escrita e pesquisa"
            title={
              <span id="escrita-title">
                O que penso enquanto construo<span className="punct">.</span>
              </span>
            }
            aside="Textos nascidos de problemas concretos e uma rota de pesquisa com relógio externo."
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          {/* escrita */}
          <Reveal className="flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <p className="mono-label">Escrita</p>
              <Link
                href="/escrita"
                className="link-quiet font-mono text-[12px]"
              >
                todos os artigos →
              </Link>
            </div>
            <ul className="flex flex-col">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/escrita/${post.slug}`}
                    className="group grid gap-2 border-t border-border py-6 transition-colors hover:border-border-2 md:grid-cols-[120px_1fr_auto] md:gap-6"
                  >
                    <time
                      dateTime={post.date}
                      className="font-mono text-[11px] tracking-[0.04em] text-foreground/65"
                    >
                      {formatDate(post.date)}
                    </time>
                    <span className="flex flex-col gap-1.5">
                      <span className="font-headline text-[clamp(18px,1.8vw,24px)] font-bold leading-tight tracking-[-0.025em] text-foreground transition-colors group-hover:text-fg-bright">
                        {post.title}
                      </span>
                      <span className="font-mono text-[11px] text-foreground/65">
                        {post.tags[0]} · {post.readTime} min
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="hidden text-foreground/60 transition-colors group-hover:text-primary-text md:block"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* pesquisa */}
          <Reveal
            delay={100}
            className="surface flex flex-col gap-6 rounded-2xl p-7 lg:p-8"
          >
            <div className="flex items-center justify-between">
              <p className="mono-label">Pesquisa</p>
              <span className="chip text-mint">
                {pipelineStatusLabel[route.status]}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[11px] tracking-[0.04em] text-primary-text">
                {route.venue}
              </p>
              <h3 className="font-headline text-[clamp(20px,1.9vw,26px)] font-bold leading-tight tracking-[-0.025em] text-fg-bright">
                {route.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-foreground/75">
                {route.detail}
              </p>
              {route.when && (
                <p className="font-mono text-[11px] text-foreground/65">
                  {route.when}
                </p>
              )}
            </div>
            <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-5">
              <p className="text-[13px] leading-snug text-foreground/75">
                <span className="font-headline text-[22px] font-bold text-fg-bright">
                  {published.length}
                </span>{" "}
                artigos publicados em coautoria · NEES/UFAL
              </p>
              <Link
                href="/pesquisa"
                className="link-quiet shrink-0 font-mono text-[12px]"
              >
                pesquisa →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
