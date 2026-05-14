import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Escrita",
  description:
    "Artigos de Anderson Rafhael sobre GovTech, engenharia de software, IA aplicada e sistemas em domínios regulados.",
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
};

const topics = [
  {
    pillar: "GovTech",
    items: [
      "A diferença entre um sistema que funciona e um que implementa política pública",
      "Cidade inteligente não é dashboard bonito — é infraestrutura de decisão no território",
      "Multi-tenancy em sistemas institucionais: o que muda quando o cliente é uma prefeitura",
    ],
  },
  {
    pillar: "Engenharia de Software",
    items: [
      "Vibe coding não é engenharia — e por que isso importa agora",
      "Requisitos formais em contextos de GovTech: como escrever o que precisa ser construído",
      "Como a IA muda (e não muda) a prática de engenharia de software",
    ],
  },
  {
    pillar: "Impacto Social",
    items: [
      "Rastreabilidade de dispositivos cardíacos no SUS: o problema que ninguém vê",
      "Prevenção à evasão escolar com dados: o que o SPTE aprendeu em dois anos",
      "Tecnologia de qualidade não é privilégio do eixo SP-RJ",
    ],
  },
  {
    pillar: "IA Aplicada",
    items: [
      "AI Engineering não é ML Engineering — é uma disciplina nova",
      "RAG em produção: o que funciona, o que não funciona e o que ninguém conta",
      "Agentes autônomos em domínios regulados: como calibrar autonomia com responsabilidade",
    ],
  },
  {
    pillar: "Produto & Negócio",
    items: [
      "Empreender com mentalidade de engenheiro: sistemas, não apostas",
      "Portfolio como estratégia: por que construí 9 produtos antes de levantar capital",
      "Product builder em domínio regulado: o que muda quando compliance não é opcional",
    ],
  },
];

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function EscritaPage() {
  const posts = getAllPosts();
  const totalTopics = topics.reduce((acc, { items }) => acc + items.length, 0);

  return (
    <div className="min-h-screen px-[clamp(24px,4.5vw,80px)] max-w-[1280px] mx-auto">

      {/* ── Breadcrumb ── */}
      <div className="pt-[calc(56px+clamp(40px,6vh,80px))] mb-16">
        <nav
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted
                     flex items-center gap-2.5"
          aria-label="Breadcrumb"
        >
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

      {/* ── Posts ou estado vazio ── */}
      {posts.length === 0 ? (
        <div className="flex flex-col divide-y divide-border">

          {/* Intro */}
          <div className="section-grid pb-[clamp(40px,5vh,64px)]">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted h-fit">
              Em breve
            </div>
            <p className="text-foreground/80 text-[16px] leading-relaxed max-w-[52ch]">
              Artigos em elaboração. Escrevo sobre o que construo e o que estudo —
              sem genérico, sem superficial. Cada texto nasce de um problema real
              resolvido ou de uma questão que ainda não tem resposta satisfatória.
            </p>
          </div>

          {/* Tópicos planejados por pilar */}
          {topics.map(({ pillar, items }) => (
            <section key={pillar} className="section-grid py-[clamp(36px,5vh,64px)]">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted h-fit">
                {pillar}
              </div>
              <div className="flex flex-col gap-0 border-t border-border">
                {items.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-border/40 last:border-0"
                  >
                    <span className="font-mono text-[10px] text-muted w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14px] text-foreground/80 leading-snug">{t}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Rodapé */}
          <div className="py-[clamp(40px,5vh,64px)]">
            <p className="font-mono text-[11px] text-muted tracking-[0.12em]">
              {totalTopics} tópicos em desenvolvimento · publicação a partir de mai/2026
            </p>
          </div>

        </div>
      ) : (
        /* Grid de cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[clamp(64px,8vh,100px)]">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/escrita/${post.slug}`}
              className="group flex flex-col p-6 rounded-lg border border-border bg-surface-low
                         hover:border-primary/30 hover:bg-surface transition-all duration-200
                         min-h-[260px]"
            >
              {/* Tag principal */}
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-primary/70 mb-4">
                {post.tags[0]}
              </span>

              {/* Título */}
              <h2 className="font-headline font-bold text-fg-bright text-[20px] leading-[1.2]
                             tracking-tight mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-muted text-[13px] leading-relaxed flex-1 mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Rodapé do card */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="font-mono text-[10px] text-muted-2 tracking-[0.1em] uppercase">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="mx-2">·</span>
                  {post.readTime} min
                </div>
                <span className="text-muted-2 group-hover:text-primary transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}
