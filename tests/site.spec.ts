import { expect, test, type APIRequestContext } from "@playwright/test";

async function sitemapRoutes(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname,
  );
}

test.describe("Plataforma", () => {
  for (const path of [
    "/robots.txt",
    "/sitemap.xml",
    "/feed.xml",
    "/manifest.webmanifest",
    "/llms.txt",
    "/opengraph-image",
    "/icon",
  ]) {
    test(`${path} responde 200`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    });
  }

  test("feed.xml é RSS válido com os artigos", async ({ request }) => {
    const xml = await (await request.get("/feed.xml")).text();
    expect(xml).toContain("<rss");
    expect((xml.match(/<item>/g) ?? []).length).toBeGreaterThanOrEqual(4);
  });

  test("slug antigo sgtu redireciona para unipass (308)", async ({
    request,
  }) => {
    const res = await request.get("/projetos/sgtu", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toContain("/projetos/unipass");
  });

  test("tela-brasil redireciona para /projetos (307)", async ({ request }) => {
    const res = await request.get("/projetos/tela-brasil", { maxRedirects: 0 });
    expect(res.status()).toBe(307);
  });

  test("rota inexistente devolve 404 com página própria", async ({ page }) => {
    const res = await page.goto("/nao-existe");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Não encontrado",
    );
  });

  test("cabeçalhos de segurança presentes", async ({ request }) => {
    const h = (await request.get("/")).headers();
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["x-powered-by"]).toBeUndefined();
  });
});

test.describe("Contrato de página (todas as rotas do sitemap)", () => {
  test("cada rota: 200, um h1, main, footer, título e canonical", async ({
    page,
    request,
  }) => {
    const routes = await sitemapRoutes(request);
    expect(routes.length).toBeGreaterThanOrEqual(15);
    for (const route of routes) {
      const res = await page.goto(route);
      expect(res?.status(), route).toBe(200);
      await expect(page.locator("h1"), route).toHaveCount(1);
      await expect(page.locator("main#main-content"), route).toHaveCount(1);
      await expect(page.getByRole("contentinfo"), route).toHaveCount(1); // rodapé da página; <footer> de artigo não é landmark
      expect(await page.title(), route).not.toBe("");
      await expect(page.locator('link[rel="canonical"]'), route).toHaveCount(1);
      await expect(
        page.locator('script[type="application/ld+json"]').first(),
        route,
      ).toBeAttached();
    }
  });
});

test.describe("Home", () => {
  test("hero, produtos e CTA aparecem ao rolar", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Infraestrutura digital",
    );
    await expect(
      page.getByRole("link", { name: /ver projetos/i }).first(),
    ).toBeVisible();
    await page
      .getByRole("heading", { name: /o que construo/i })
      .scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", { name: /o que construo/i }),
    ).toBeVisible();
    await page
      .getByRole("heading", { name: /vamos conversar/i })
      .scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", { name: /vamos conversar/i }),
    ).toBeVisible();
  });

  test("sem JavaScript o conteúdo continua visível", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /o que construo/i }),
    ).toBeVisible();
    await context.close();
  });
});

test.describe("Navegação e acessibilidade", () => {
  test("primeiro Tab foca o skip link e ele leva ao conteúdo", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.locator('a[href="#main-content"]');
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content$/);
  });

  test("links do nav marcam a página atual", async ({ page, isMobile }) => {
    test.skip(isMobile, "nav de desktop");
    await page.goto("/projetos");
    await expect(
      page
        .getByRole("navigation", { name: "Principal" })
        .getByRole("link", { name: /projetos/i }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("menu mobile abre, fecha no Escape e devolve o foco", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "só mobile");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /abrir menu/i });
    await toggle.click();
    await expect(
      page.getByRole("button", { name: /fechar menu/i }),
    ).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: /abrir menu/i }),
    ).toBeFocused();
  });

  test("imagens de produto têm alt e legenda de proveniência", async ({
    page,
  }) => {
    await page.goto("/projetos/sigma");
    const imgs = page.locator("figure img");
    expect(await imgs.count()).toBeGreaterThan(0);
    for (const img of await imgs.all()) {
      expect((await img.getAttribute("alt"))?.length ?? 0).toBeGreaterThan(10);
    }
    await expect(page.locator("figcaption").first()).toContainText(
      /captura|estudo|demonstração/i,
    );
  });
});

test.describe("Artigo", () => {
  test("tem barra de progresso, sumário e navegação entre artigos", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/escrita/sdd-spec-driven-development");
    await expect(page.locator(".reading-progress")).toBeAttached();
    await expect(page.locator("article h2").first()).toHaveAttribute(
      "id",
      /.+/,
    );
    if (!isMobile) await expect(page.getByText(/neste artigo/i)).toBeVisible();
    await expect(
      page.getByRole("link", { name: /todos os artigos/i }).first(),
    ).toBeVisible();
  });
});
