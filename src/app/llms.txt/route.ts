import { site } from "@/data/site";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const pages = [
  {
    path: "/",
    label: "Início — visão geral de Anderson Rafhael e da Requiem Company.",
  },
  {
    path: "/projetos",
    label: "Projetos — portfólio de produtos e sistemas em produção.",
  },
  {
    path: "/escrita",
    label:
      "Escrita — artigos sobre GovTech, engenharia de software e IA aplicada.",
  },
  {
    path: "/pesquisa",
    label: "Pesquisa — publicações acadêmicas e atuação em pesquisa aplicada.",
  },
  {
    path: "/sobre",
    label: "Sobre — trajetória, formação e princípios de trabalho.",
  },
  {
    path: "/contato",
    label: "Contato — canais para propor projetos ou conversas.",
  },
];

export async function GET() {
  const posts = getAllPosts();

  const pagesSection = pages
    .map((page) => `- [${page.path}](${site.url}${page.path}): ${page.label}`)
    .join("\n");

  const articlesSection =
    posts.length > 0
      ? posts
          .map((post) => `- [${post.title}](${site.url}/escrita/${post.slug})`)
          .join("\n")
      : "- Nenhum artigo publicado no momento.";

  const body = `# ${site.name}

${site.description}

## Páginas

${pagesSection}

## Artigos

${articlesSection}

## Contato

- E-mail: ${site.email}
- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
