import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** "article" para posts; default "website". */
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  /** Sobrescreve o título do OG (por padrão usa `title`). */
  ogTitle?: string;
  /**
   * "root" (default) injeta a imagem raiz — necessário em rotas estáticas, porque
   * a convenção de arquivo do layout NÃO cascateia para páginas que definem o
   * próprio `openGraph`. "file" deixa `images` de fora para que o
   * `opengraph-image.tsx` do próprio segmento (projetos/[slug], escrita/[slug])
   * seja anexado pelo Next — metadata declarada vence a convenção de arquivo.
   */
  ogImage?: "root" | "file";
};

/**
 * Metadata por rota com canonical, OG e Twitter coerentes. As imagens OG são
 * resolvidas pelas convenções de arquivo (`opengraph-image.tsx`) de cada rota.
 */
export function pageMetadata(meta: PageMeta): Metadata {
  const url = `${site.url}${meta.path}`;
  const ogTitle = meta.ogTitle ?? meta.title;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: meta.type ?? "website",
      locale: site.locale,
      url,
      siteName: site.name,
      title: ogTitle,
      description: meta.description,
      ...((meta.ogImage ?? "root") === "root"
        ? { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }] }
        : {}),
      ...(meta.type === "article"
        ? {
            publishedTime: meta.publishedTime,
            authors: [site.name],
            tags: meta.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: meta.description,
    },
  };
}

/** Garante descrições dentro da faixa que os buscadores exibem inteira. */
export function clampDescription(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${space > 0 ? cut.slice(0, space) : cut}…`;
}
