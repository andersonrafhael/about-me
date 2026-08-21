import type { AnchorHTMLAttributes, ReactElement, ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { ArticleToc, extractHeadings } from "@/components/article-toc";
import { ReadingProgress } from "@/components/reading-progress";
import { blogPosting, breadcrumb, serializeJsonLd } from "@/lib/json-ld";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getPostContent,
} from "@/lib/posts";
import { clampDescription, pageMetadata } from "@/lib/seo";
import { slugify } from "@/lib/slugify";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    ogImage: "file",
    title: post.seoTitle ?? post.title,
    ogTitle: post.title,
    description: clampDescription(post.excerpt),
    path: `/escrita/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

function isReactElement(node: ReactNode): node is ReactElement {
  return typeof node === "object" && node !== null && "props" in node;
}

/** Extrai o texto puro de um `children` do MDX (pode ter negrito, código etc). */
function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean")
    return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isReactElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function Heading2({ children }: { children?: ReactNode }) {
  return <h2 id={slugify(extractText(children))}>{children}</h2>;
}

function Heading3({ children }: { children?: ReactNode }) {
  return <h3 id={slugify(extractText(children))}>{children}</h3>;
}

function ProseLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = /^https?:\/\//.test(href ?? "");
  if (!isExternal) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

const mdxComponents: MDXRemoteProps["components"] = {
  h2: Heading2,
  h3: Heading3,
  a: ProseLink,
};

function formatLongDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const content = getPostContent(slug);
  if (!post || content === undefined) notFound();

  const { previous, next } = getAdjacentPosts(slug);
  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);
  const tocItems = extractHeadings(content);
  const dateFormatted = formatLongDate(post.date);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            blogPosting({
              slug: post.slug,
              title: post.title,
              description: post.excerpt,
              date: post.date,
              tags: post.tags,
              readTime: post.readTime,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumb([
              { name: "Início", path: "/" },
              { name: "Escrita", path: "/escrita" },
              { name: post.title },
            ]),
          ),
        }}
      />
      <ReadingProgress />
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
              href="/escrita"
              className="text-foreground/70 transition-colors hover:text-fg-bright"
            >
              Escrita
            </Link>
            <span className="text-muted-2" aria-hidden>
              /
            </span>
            <span className="max-w-[32ch] truncate text-foreground">
              {post.title}
            </span>
          </nav>
        </div>

        <header className="mb-[clamp(48px,7vh,88px)] max-w-[72ch] border-b border-border pb-[clamp(32px,5vh,56px)]">
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="chip">{post.tags[0]}</span>
            <span className="text-muted-2" aria-hidden>
              ·
            </span>
            <time dateTime={post.date} className="mono-sublabel">
              {dateFormatted}
            </time>
            <span className="text-muted-2" aria-hidden>
              ·
            </span>
            <span className="mono-sublabel">
              {post.readTime} min de leitura
            </span>
          </div>
          <h1 className="display mb-6 text-[clamp(32px,4.8vw,56px)]">
            {post.title}
          </h1>
          <p className="lede border-l-2 border-primary pl-5">{post.excerpt}</p>
        </header>

        <div className="grid gap-[clamp(40px,6vw,96px)] pb-[clamp(64px,8vh,100px)] lg:grid-cols-[minmax(0,72ch)_260px]">
          <article data-article className="prose-article min-w-0">
            <MDXRemote source={content} components={mdxComponents} />
          </article>

          <aside className="hidden h-fit flex-col gap-6 sticky top-24 lg:flex">
            <ArticleToc items={tocItems} />

            <div className="flex flex-col gap-4 border-t border-border pt-6">
              <p className="mono-sublabel">Sobre este artigo</p>
              <dl className="flex flex-col gap-3 text-[13px]">
                <div>
                  <dt className="mono-sublabel mb-1">Publicado</dt>
                  <dd className="text-foreground/75">{dateFormatted}</dd>
                </div>
                <div>
                  <dt className="mono-sublabel mb-1">Leitura</dt>
                  <dd className="text-foreground/75">
                    {post.readTime} minutos
                  </dd>
                </div>
                <div>
                  <dt className="mono-sublabel mb-2">Tags</dt>
                  <dd className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            {related.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-border pt-6">
                <p className="mono-sublabel">Leia também</p>
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/escrita/${p.slug}`}
                    className="link-quiet text-[13px] leading-snug"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>

        <footer className="border-t border-border pb-[clamp(48px,6vh,80px)] pt-[clamp(32px,5vh,56px)]">
          <div className="mb-8 flex flex-col gap-3">
            {previous && (
              <Link
                href={`/escrita/${previous.slug}`}
                className="surface surface-hover flex items-center justify-between gap-4 rounded-lg p-6"
              >
                <span className="flex flex-col gap-2">
                  <span className="mono-label">Anterior</span>
                  <span className="font-headline text-[17px] font-bold text-fg-bright">
                    {previous.title}
                  </span>
                </span>
                <span aria-hidden className="text-foreground/60">
                  ←
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/escrita/${next.slug}`}
                className="surface surface-hover flex items-center justify-between gap-4 rounded-lg p-6"
              >
                <span className="flex flex-col gap-2">
                  <span className="mono-label">Próximo</span>
                  <span className="font-headline text-[17px] font-bold text-fg-bright">
                    {next.title}
                  </span>
                </span>
                <span aria-hidden className="text-foreground/60">
                  →
                </span>
              </Link>
            )}
          </div>
          <Link
            href="/escrita"
            className="mono-label flex items-center gap-2 text-foreground/70 transition-colors hover:text-fg-bright"
          >
            <span aria-hidden>←</span> Todos os artigos
          </Link>
        </footer>
      </div>
    </>
  );
}
