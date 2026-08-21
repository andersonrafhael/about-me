/**
 * Slug de heading em pt-BR: minúsculas, sem acentos/diacríticos, hífens no
 * lugar de espaços e pontuação. Usado para gerar `id` de `h2`/`h3` no MDX e
 * os links `#slug` do sumário (`ArticleToc`) — os dois lados precisam bater.
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
