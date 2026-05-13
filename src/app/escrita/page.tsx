import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Escrita",
  description:
    "Artigos e ensaios de Anderson Rafhael sobre tecnologia, gestão pública, produto e construção de sistemas.",
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
};

/* Posts virão de MDX quando houver conteúdo. Por ora, lista estática. */
const posts: Post[] = [];

const topics = [
  "Arquitetura de sistemas para municípios",
  "Multi-tenancy institucional",
  "Gestão de produto em GovTech",
  "IA aplicada a serviços públicos",
  "Construção de empresa sem capital externo",
  "Engenharia de requisitos na prática",
];

export default function EscritaPage() {
  return (
    <div className="min-h-screen px-[clamp(24px,4.5vw,80px)] max-w-[1280px] mx-auto">

      {/* ── Breadcrumb ── */}
      <div className="pt-[calc(56px+clamp(40px,6vh,80px))] mb-16">
        <nav className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                        flex items-center gap-2.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors text-muted">Início</Link>
          <span className="text-muted-2">/</span>
          <span className="text-foreground font-medium">Escrita</span>
        </nav>
      </div>

      {/* ── Title block ── */}
      <div className="grid grid-cols-[1fr_auto] items-end gap-8 mb-[clamp(56px,8vh,96px)]
                      pb-[clamp(40px,5vh,64px)] border-b border-border">
        <h1 className="editorial-title">
          Escrita<span className="punct">.</span>
        </h1>
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted text-right
                        pb-4 leading-[1.8] hidden sm:block">
          <b className="text-foreground font-medium block">{posts.length} artigos</b>
          Tecnologia · Produto<br />
          Gestão pública
        </div>
      </div>

      {/* ── Posts ── */}
      {posts.length === 0 ? (
        /* Estado vazio com tópicos planejados */
        <div className="section-grid mb-[clamp(48px,6vh,80px)]">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted h-fit">
            Em breve
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-foreground/80 text-[16px] leading-relaxed max-w-[52ch]">
              Artigos em elaboração. Escrevo sobre o que construo — sem genérico, sem superficial.
              Cada post nasce de um problema real resolvido.
            </p>
            <div className="flex flex-col gap-0 border-t border-border">
              {topics.map((t, i) => (
                <div key={i}
                  className="flex items-center gap-4 py-4 border-b border-border/40 last:border-0">
                  <span className="font-mono text-[10px] text-muted w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] text-foreground/80">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Lista de posts */
        <div className="flex flex-col divide-y divide-border border-t border-border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/escrita/${post.slug}`}
              className="group flex flex-col gap-3 py-8
                         hover:bg-white/1 transition-colors rounded px-2 -mx-2"
            >
              <div className="flex items-center gap-3 font-mono text-[10px] text-muted tracking-[0.12em] uppercase">
                <time dateTime={post.date}>{post.date}</time>
                <span className="text-muted-2">·</span>
                <span>{post.readTime} min</span>
              </div>
              <h2 className="text-fg-bright font-headline font-bold text-[22px] leading-snug
                             tracking-tight group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted text-[14px] leading-relaxed max-w-[60ch]">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span key={t}
                    className="px-2 py-0.5 rounded border border-border/60
                               font-mono text-[10px] text-muted tracking-[0.08em]">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="h-[clamp(64px,8vh,100px)]" />
    </div>
  );
}
