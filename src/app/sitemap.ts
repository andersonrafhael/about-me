import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { now, site } from "@/data/site";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date(now.updatedAt);

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/projetos", priority: 0.9 },
    { path: "/escrita", priority: 0.8 },
    { path: "/pesquisa", priority: 0.7 },
    { path: "/sobre", priority: 0.7 },
    { path: "/contato", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/projetos/${p.slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/escrita/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
