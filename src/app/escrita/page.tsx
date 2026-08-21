import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { breadcrumb, collectionPage, serializeJsonLd } from "@/lib/json-ld";
import { getAllPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Textos de Anderson Rafhael sobre engenharia em domínio regulado, produto em política pública e o que muda quando o cliente é o Estado.";

export const metadata: Metadata = pageMetadata({
  title: "Escrita",
  description: DESCRIPTION,
  path: "/escrita",
});

const MONTHS_ABBR = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function formatShortDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return `${String(date.getDate()).padStart(2, "0")} ${MONTHS_ABBR[date.getMonth()]} ${date.getFullYear()}`;
}

export default function EscritaPage() {
  const posts = getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            collectionPage({
              name: "Escrita",
              description: DESCRIPTION,
              path: "/escrita",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumb([{ name: "Início", path: "/" }, { name: "Escrita" }]),
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
            <span className="text-foreground">Escrita</span>
          </nav>
        </div>

        <header className="mb-[clamp(48px,7vh,88px)] grid gap-6 border-b border-border pb-[clamp(32px,5vh,56px)] md:grid-cols-[1fr_auto] md:items-end">
          <h1 className="editorial-title">
            Escrita<span className="punct">.</span>
          </h1>
          <div className="mono-label flex flex-col items-start gap-2 md:items-end md:text-right">
            <span className="text-foreground">{posts.length} artigos</span>
            <a href="/feed.xml" className="link-quiet">
              Assinar por RSS
            </a>
          </div>
        </header>

        {posts.length === 0 ? (
          <p className="lede pb-[clamp(64px,8vh,100px)]">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <div className="pb-[clamp(64px,8vh,100px)]">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 70}>
                <Link href={`/escrita/${post.slug}`} className="group block">
                  <article className="grid gap-3 border-t border-border py-8 md:grid-cols-[140px_1fr_auto] md:items-center">
                    <div className="mono-label flex flex-row gap-3 md:flex-col md:gap-1.5">
                      <time dateTime={post.date}>
                        {formatShortDate(post.date)}
                      </time>
                      <span>{post.readTime} min</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h2 className="font-headline text-[clamp(22px,2.4vw,30px)] font-bold tracking-[-0.03em] text-foreground transition-colors group-hover:text-fg-bright">
                        {post.title}
                      </h2>
                      <p className="max-w-[66ch] text-foreground/75 line-clamp-2">
                        {post.excerpt}
                      </p>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span
                      aria-hidden
                      className="hidden text-foreground/60 transition-colors group-hover:text-primary-text md:block"
                    >
                      →
                    </span>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
