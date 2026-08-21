# andersonrafhael.requiemcompany.com.br

Site pessoal de [Anderson Rafhael](https://andersonrafhael.requiemcompany.com.br) — engenheiro de computação e fundador da Requiem Company, em Maceió. Produtos, escrita e pesquisa em infraestrutura digital para gestão pública, saúde e mobilidade.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS v4 · MDX · Docker standalone atrás de Traefik.

Sem CMS, sem analytics, sem cookies. Conteúdo vive em `src/data/*.ts` (projetos, site, pesquisa) e `src/content/posts/*.mdx` (artigos).

## Desenvolvimento

```bash
npm install
npm run dev            # http://localhost:3000
npm run quality        # tsc + eslint + build
npm run gauntlet       # build + Lighthouse + axe + contrato HTML/SEO + teclado + links
```

O gauntlet (`scripts/gauntlet/check.mjs`) é a barra mecânica do site: Lighthouse mobile ≥ 90/100/95/100, axe WCAG 2.2 AA sem violações em todas as rotas do sitemap, metadata e JSON-LD por rota, navegação por teclado e zero links internos quebrados. Relatório em `scripts/gauntlet/reports/latest.json`.

## Deploy

`docs/runbook.md` — DNS (Cloudflare), deploy manual (`infra/deploy.sh`), deploy por GitHub Action (`.github/workflows/deploy.yml`), rollback e verificação.

## Licença

Código sob MIT. Textos, imagens e identidade visual © Anderson Rafhael — todos os direitos reservados.
