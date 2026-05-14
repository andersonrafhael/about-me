import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post } from "@/app/escrita/page";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return data as Post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);
    if (data.slug === slug) return data as Post;
  }
  return undefined;
}

export function getPostContent(slug: string): string | undefined {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    if (data.slug === slug) return content;
  }
  return undefined;
}
