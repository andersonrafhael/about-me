#!/usr/bin/env node
/**
 * Capturas de página inteira (desktop 1440 + mobile 390) com rolagem prévia
 * para disparar os reveals por IntersectionObserver.
 *
 * Uso: node scripts/gauntlet/shoot.mjs <baseUrl> <outDir> [/rota ...]
 *   node scripts/gauntlet/shoot.mjs http://127.0.0.1:3002 /tmp/shots / /projetos /sobre
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const [base, outDir, ...routes] = process.argv.slice(2);
if (!base || !outDir) {
  console.error("uso: shoot.mjs <baseUrl> <outDir> [/rota ...]");
  process.exit(2);
}
mkdirSync(outDir, { recursive: true });
const list = routes.length ? routes : ["/"];
const slug = (r) => (r === "/" ? "home" : r.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-"));

const browser = await chromium.launch();
for (const route of list) {
  for (const [name, vp] of Object.entries({ d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } })) {
    const ctx = await browser.newContext({
      viewport: vp,
      deviceScaleFactor: name === "m" ? 2 : 1,
      isMobile: name === "m",
      hasTouch: name === "m",
      colorScheme: "dark",
      locale: "pt-BR",
    });
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: "load", timeout: 90_000 });
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    // espera a hidratação (primeiro reveal marcado) antes de rolar
    await page.waitForFunction(() => document.querySelector('.reveal[data-observed="true"]'), null, { timeout: 60_000 }).catch(() => {});
    // rola em passos para que todo reveal seja observado
    await page.evaluate(async () => {
      const step = Math.max(300, window.innerHeight * 0.6);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 900));
    });
    const file = path.join(outDir, `${slug(route)}-${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log("✓", file);
    await ctx.close();
  }
}
await browser.close();
