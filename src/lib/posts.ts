import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  /** Título curto para <title> (≤ 60 chars) quando o editorial é longo. */
  seoTitle?: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
};

type PostFile = { post: Post; content: string };

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Valida o frontmatter no boundary: campo faltando ou data inválida vira erro
 * de build nomeando o arquivo — em vez de `Invalid Date` silencioso no RSS,
 * no sitemap e na ordenação.
 */
function parsePost(file: string, raw: string): PostFile {
  const { data, content } = matter(raw);
  const fail = (msg: string) => {
    throw new Error(`[posts] ${file}: ${msg}`);
  };
  for (const key of ["slug", "title", "excerpt", "date", "tags", "readTime"]) {
    if (data[key] === undefined || data[key] === null || data[key] === "") fail(`frontmatter sem \`${key}\``);
  }
  if (typeof data.date !== "string" || !ISO_DATE.test(data.date) || Number.isNaN(new Date(`${data.date}T00:00:00Z`).getTime()))
    fail(`date inválida (${String(data.date)}); esperado YYYY-MM-DD`);
  if (!Array.isArray(data.tags) || data.tags.length === 0) fail("tags deve ser lista não vazia");
  if (typeof data.readTime !== "number") fail("readTime deve ser número");
  if (data.slug !== file.replace(/\.mdx$/, "")) fail(`slug (${String(data.slug)}) difere do nome do arquivo`);
  if (data.seoTitle !== undefined && (typeof data.seoTitle !== "string" || data.seoTitle.length > 60))
    fail("seoTitle deve ser string com até 60 caracteres");
  return { post: data as Post, content };
}

let cache: PostFile[] | null = null;

/** Lê e valida todos os posts uma vez por processo (build ou servidor). */
function readPosts(): PostFile[] {
  if (cache) return cache;
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx")).sort();
  cache = files
    .map((file) => parsePost(file, fs.readFileSync(path.join(POSTS_DIR, file), "utf8")))
    .sort((a, b) => (a.post.date < b.post.date ? 1 : a.post.date > b.post.date ? -1 : a.post.slug.localeCompare(b.post.slug)));
  return cache;
}

/** Posts ordenados por data decrescente (índice 0 = mais recente). */
export function getAllPosts(): Post[] {
  return readPosts().map((p) => p.post);
}

export function getPostBySlug(slug: string): Post | undefined {
  return readPosts().find((p) => p.post.slug === slug)?.post;
}

export function getPostContent(slug: string): string | undefined {
  return readPosts().find((p) => p.post.slug === slug)?.content;
}

/** Anterior = mais antigo; próximo = mais recente. */
export function getAdjacentPosts(slug: string): { previous: Post | null; next: Post | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return { previous: posts[index + 1] ?? null, next: posts[index - 1] ?? null };
}
