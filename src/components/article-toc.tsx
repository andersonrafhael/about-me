import { slugify } from "@/lib/slugify";

export type TocItem = { slug: string; title: string };

/**
 * Extrai headings `##` do MDX cru via regex — a mesma fonte de texto que
 * `mdxComponents` usa para gravar `id` nos `<h2>` renderizados — e gera o
 * slug de cada um com `slugify`, garantindo que os links `#slug` batam com
 * os ids reais do artigo.
 */
export function extractHeadings(content: string): TocItem[] {
  const matches = content.matchAll(/^##\s+(.+)$/gm);
  return Array.from(matches, (match) => {
    const title = match[1].trim();
    return { slug: slugify(title), title };
  });
}

export function ArticleToc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Neste artigo" className="flex flex-col gap-3">
      <p className="mono-sublabel">Neste artigo</p>
      <ul className="flex flex-col gap-2 border-l border-border pl-4">
        {items.map((item) => (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              className="font-mono text-[12px] leading-snug text-foreground/75 transition-colors hover:text-fg-bright"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
