import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getPostContent } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const content = getPostContent(slug);
  if (!post || content === undefined) notFound();

  const allPosts = getAllPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const dateFormatted = new Date(post.date + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen px-site max-w-[1280px] mx-auto">

      {/* ── Breadcrumb ── */}
      <div className="pt-page mb-12">
        <nav
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                     flex items-center gap-2.5"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-foreground transition-colors text-muted">
            Início
          </Link>
          <span className="text-muted-2">/</span>
          <Link href="/escrita" className="hover:text-foreground transition-colors text-muted">
            Escrita
          </Link>
          <span className="text-muted-2">/</span>
          <span className="text-foreground font-medium truncate max-w-[32ch]">{post.title}</span>
        </nav>
      </div>

      {/* ── Header — full width ── */}
      <header className="mb-[clamp(40px,6vh,72px)] pb-[clamp(32px,4vh,56px)] border-b border-border">
        <div className="max-w-[72ch]">
          {/* Meta linha */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-6">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-primary/70">
              {post.tags[0]}
            </span>
            <span className="text-muted-3">·</span>
            <time
              dateTime={post.date}
              className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted"
            >
              {dateFormatted}
            </time>
            <span className="text-muted-3">·</span>
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted">
              {post.readTime} min de leitura
            </span>
          </div>

          {/* Título */}
          <h1
            className="font-headline font-bold text-fg-bright leading-[1.1] tracking-tight mb-6
                       text-[clamp(28px,4.5vw,48px)]"
          >
            {post.title}
          </h1>

          {/* Lead / excerpt */}
          <p className="text-[17px] text-foreground/65 leading-relaxed border-l-2 border-primary/40 pl-5">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* ── Layout 2 colunas: artigo + sidebar ── */}
      <div className="flex gap-[clamp(40px,6vw,96px)] items-start pb-[clamp(64px,8vh,100px)]">

        {/* ── Conteúdo principal ── */}
        <article className="prose-article min-w-0 flex-1 max-w-[72ch]">
          <MDXRemote source={content} />
        </article>

        {/* ── Sidebar direita ── */}
        <aside className="hidden lg:flex flex-col gap-6 w-[240px] shrink-0 sticky top-24">

          {/* Metadata card */}
          <div className="p-4 rounded-lg border border-border bg-surface-low flex flex-col gap-4">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
              Sobre este artigo
            </p>

            <div className="flex flex-col gap-3">
              <div>
                <p className="font-mono text-[9px] text-muted-2 uppercase tracking-[0.12em] mb-0.5">
                  Publicado
                </p>
                <time className="text-[12px] text-foreground">{dateFormatted}</time>
              </div>
              <div>
                <p className="font-mono text-[9px] text-muted-2 uppercase tracking-[0.12em] mb-0.5">
                  Leitura
                </p>
                <span className="text-[12px] text-foreground">{post.readTime} minutos</span>
              </div>
              <div>
                <p className="font-mono text-[9px] text-muted-2 uppercase tracking-[0.12em] mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded border border-border/60
                                 font-mono text-[9px] text-muted tracking-[0.06em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Outros artigos */}
          {otherPosts.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
                Leia também
              </p>
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/escrita/${p.slug}`}
                  className="group p-3 rounded-lg border border-border/40 hover:border-border/80
                             bg-transparent hover:bg-surface-low transition-all duration-150"
                >
                  <span className="font-mono text-[9px] text-primary/60 tracking-[0.1em] uppercase block mb-1.5">
                    {p.tags[0]}
                  </span>
                  <span className="text-[12px] text-foreground/75 leading-snug
                                   group-hover:text-fg-bright transition-colors block">
                    {p.title}
                  </span>
                  <span className="font-mono text-[9px] text-muted-2 block mt-1.5">
                    {p.readTime} min
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Voltar */}
          <Link
            href="/escrita"
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted
                       hover:text-foreground transition-colors flex items-center gap-1.5 mt-2"
          >
            <span aria-hidden>←</span> Todos os artigos
          </Link>
        </aside>
      </div>

      {/* ── Footer nav — mobile only ── */}
      <div className="lg:hidden border-t border-border pt-8 pb-[clamp(48px,6vh,80px)]">
        <Link
          href="/escrita"
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                     hover:text-foreground transition-colors flex items-center gap-2"
        >
          <span aria-hidden>←</span> Todos os artigos
        </Link>
      </div>

    </div>
  );
}
