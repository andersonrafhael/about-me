import type { MetadataRoute } from "next";

// Static export: Turbopack requires metadata routes to declare themselves static.
export const dynamic = "force-static";

const siteUrl = "https://andersonrafhael.requiemcompany.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
