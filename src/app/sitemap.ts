import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/posts";

const siteUrl = "https://andersonrafhael.requiemcompany.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { route: "", priority: 1 },
    { route: "/projetos", priority: 0.8 },
    { route: "/escrita", priority: 0.8 },
    { route: "/pesquisa", priority: 0.7 },
    { route: "/sobre", priority: 0.7 },
    { route: "/contato", priority: 0.6 },
  ].map(({ route, priority }) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projetos/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteUrl}/escrita/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
