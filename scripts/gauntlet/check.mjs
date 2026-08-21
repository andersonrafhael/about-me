#!/usr/bin/env node
/**
 * Gauntlet exit predicate (Classe A) — andersonrafhael.requiemcompany.com.br
 *
 * Builds the site (unless --no-build), serves the static export (`out/`) with
 * `wrangler dev` on a local port and measures it against
 * scripts/gauntlet/thresholds.json:
 *
 *   1. Lighthouse (mobile + desktop) on a representative route set
 *   2. axe-core WCAG 2.2 AA on EVERY route listed in /sitemap.xml
 *   3. HTML contract per route (lang, title, description, canonical, OG image,
 *      JSON-LD, single h1, main landmark, skip link, console errors)
 *   4. Keyboard: first Tab lands on the skip link; focus ring is visible
 *   5. Links: every internal link resolves (< 400); external links reported,
 *      hosts in `mustBeReachable` enforced
 *   6. Extra URLs (robots, sitemap, manifest, feed, OG image) respond 200
 *
 * Exit 0 only when every check passes. Report → scripts/gauntlet/reports/latest.json
 * Screens → scripts/gauntlet/screens/<route>-<viewport>.png (for the critics)
 *
 * Usage:
 *   node scripts/gauntlet/check.mjs                # full run
 *   node scripts/gauntlet/check.mjs --no-build     # reuse out/
 *   node scripts/gauntlet/check.mjs --skip=lighthouse   # fast inner loop
 *   node scripts/gauntlet/check.mjs --port=3100
 *   node scripts/gauntlet/check.mjs --base=https://andersonrafhael.requiemcompany.com.br   # audita a URL pública (sem build/serve)
 */
import { spawn, execFileSync, execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const PORT = Number(args.port ?? 3377); // porta alta pouco usual; o pré-voo abaixo garante que está livre
// 127.0.0.1 on purpose: Node's fetch resolves `localhost` to ::1 first and the
// first cold request to the local server can exceed a short per-attempt timeout.
const REMOTE = typeof args.base === "string" ? args.base.replace(/\/$/, "") : null;
const BASE = REMOTE ?? `http://127.0.0.1:${PORT}`;
const SKIP = new Set(String(args.skip ?? "").split(",").filter(Boolean));
const T = JSON.parse(readFileSync(path.join(here, "thresholds.json"), "utf8"));
const reportsDir = path.join(here, "reports");
const screensDir = path.join(here, "screens");
mkdirSync(reportsDir, { recursive: true });
mkdirSync(screensDir, { recursive: true });

const failures = [];
const warnings = [];
const fail = (scope, msg) => failures.push({ scope, msg });
const warn = (scope, msg) => warnings.push({ scope, msg });
const log = (...m) => console.log(...m);
const slug = (route) => (route === "/" ? "home" : route.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-"));

// ───────────────────────── 0. build + serve ─────────────────────────
if (!args["no-build"] && !REMOTE) {
  log("▶ build");
  execSync("npm run build", { cwd: root, stdio: "inherit" });
}

let server = null;
let serverLog = "";
const stopServer = () => {
  if (!server) return;
  // `npx wrangler dev` is a tree (npx → wrangler → workerd); signalling only the
  // root leaves workerd listening on the port. The server is spawned detached in
  // its own process group, so the whole tree gets the signal.
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    try {
      server.kill("SIGTERM");
    } catch {}
  }
};
if (!REMOTE) {
// pre-flight: the port must be free, otherwise we would audit someone else's server
try {
  await fetch(BASE + "/", { signal: AbortSignal.timeout(2000) });
  console.error(`✗ something already answers on ${BASE} — pick another --port`);
  process.exit(2);
} catch {}

log(`▶ serve ${BASE}`);
// wrangler dev serves out/ exactly like Workers static assets in production:
// _headers, _redirects, html_handling and 404.html are all honoured.
server = spawn("npx", ["wrangler", "dev", "--port", String(PORT), "--ip", "127.0.0.1"], {
  cwd: root,
  stdio: ["ignore", "pipe", "pipe"],
  detached: true, // own process group — see stopServer()
  env: { ...process.env, NODE_ENV: "production" },
});
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));
}
log(`▶ target ${BASE}`);
process.on("exit", stopServer);
process.on("SIGINT", () => {
  stopServer();
  process.exit(130);
});

async function waitFor(url, ms = 120_000) {
  const t0 = Date.now();
  let lastErr = "";
  while (Date.now() - t0 < ms) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(15_000) });
      if (r.ok) {
        log(`  server answered ${r.status} after ${((Date.now() - t0) / 1000).toFixed(1)}s`);
        return;
      }
      lastErr = `HTTP ${r.status}`;
    } catch (e) {
      lastErr = e.cause?.code ?? e.name ?? String(e);
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`server did not answer at ${url} (last: ${lastErr})\n${serverLog}`);
}
await waitFor(BASE + "/");

// ───────────────────────── 1. routes from sitemap ─────────────────────────
const sitemapXml = await (await fetch(BASE + "/sitemap.xml")).text();
const routes = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname)
  .map((p) => (p.length > 1 ? p.replace(/\/$/, "") : p));
if (routes.length === 0) fail("sitemap", "sitemap.xml has no <loc> entries");
log(`▶ ${routes.length} routes from sitemap`);

// ───────────────────────── 2. playwright pass (axe + html + keyboard + links) ─────────────────────────
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const viewports = {
  desktop: { width: 1440, height: 900, isMobile: false },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
};
const internalLinks = new Map(); // path -> first seen on
const externalLinks = new Map(); // href -> first seen on
const htmlReport = {};
const axeReport = {};

const browser = await chromium.launch();
const writePartial = (err) => {
  const partial = { at: new Date().toISOString(), ok: false, aborted: String(err?.message ?? err), routes, failures, warnings, axe: axeReport, html: htmlReport };
  writeFileSync(path.join(reportsDir, "latest.json"), JSON.stringify(partial, null, 2));
};
process.on("uncaughtException", (err) => { writePartial(err); stopServer(); console.error("✗ aborted:", err); process.exit(1); });
process.on("unhandledRejection", (err) => { writePartial(err); stopServer(); console.error("✗ aborted:", err); process.exit(1); });
for (const route of routes) {
  const url = BASE + route;
  for (const [vpName, vp] of Object.entries(viewports)) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch ?? false,
      deviceScaleFactor: vp.deviceScaleFactor ?? 1,
      locale: "pt-BR",
      colorScheme: "dark",
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("pageerror", (e) => consoleErrors.push(String(e.message)));
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });
    try {
      await page.goto(url, { waitUntil: "load", timeout: 45_000 });
      // networkidle is flaky by design (long-polling, analytics); settle instead
      await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => {});
    } catch (e) {
      fail(`goto ${route} ${vpName}`, String(e.message).slice(0, 200));
      await context.close();
      continue;
    }
    // espera a hidratação e rola a página inteira para disparar os reveals
    await page.waitForFunction(() => document.querySelector('.reveal[data-observed="true"]') || !document.querySelector(".reveal"), null, { timeout: 20_000 }).catch(() => {});
    await page.evaluate(async () => {
      const step = Math.max(300, window.innerHeight * 0.5);
      for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 800));
    });

    // html contract — once per route (desktop)
    if (vpName === "desktop") {
      const facts = await page.evaluate(() => {
        const q = (s) => document.querySelector(s);
        const meta = (n) => q(`meta[name="${n}"]`)?.getAttribute("content") ?? q(`meta[property="${n}"]`)?.getAttribute("content") ?? null;
        const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
          try {
            const j = JSON.parse(s.textContent || "");
            return { ok: true, type: j["@type"] ?? (Array.isArray(j["@graph"]) ? j["@graph"].map((g) => g["@type"]).join("+") : "?") };
          } catch {
            return { ok: false, type: "INVALID" };
          }
        });
        const anchors = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
        return {
          lang: document.documentElement.lang,
          title: document.title,
          description: meta("description"),
          canonical: q('link[rel="canonical"]')?.getAttribute("href") ?? null,
          ogImage: meta("og:image"),
          ogTitle: meta("og:title"),
          h1Count: document.querySelectorAll("h1").length,
          mainCount: document.querySelectorAll("main").length,
          contentinfoCount: [...document.querySelectorAll("footer")].filter((f) => !f.closest("article, aside, main, nav, section")).length,
          skipLink: !!q('a[href="#main-content"], a[href="#conteudo"], a.skip-link'),
          imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
          jsonLd,
          anchors,
        };
      });
      htmlReport[route] = { ...facts, consoleErrors };
      const H = T.html;
      if (facts.lang !== H.lang) fail(`html ${route}`, `lang="${facts.lang}" (expected ${H.lang})`);
      if (!facts.title) fail(`html ${route}`, "missing <title>");
      else if (facts.title.length > H.titleMax) warn(`html ${route}`, `title ${facts.title.length} chars > ${H.titleMax}`);
      if (!facts.description) fail(`html ${route}`, "missing meta description");
      else if (facts.description.length < H.descriptionMin || facts.description.length > H.descriptionMax)
        fail(`html ${route}`, `description ${facts.description.length} chars (want ${H.descriptionMin}–${H.descriptionMax})`);
      if (H.requireCanonical && !facts.canonical) fail(`html ${route}`, "missing rel=canonical");
      if (H.requireOgImage && !facts.ogImage) fail(`html ${route}`, "missing og:image");
      if (H.requireJsonLd && (facts.jsonLd.length === 0 || facts.jsonLd.some((j) => !j.ok)))
        fail(`html ${route}`, `JSON-LD missing or invalid (${JSON.stringify(facts.jsonLd)})`);
      if (H.singleH1 && facts.h1Count !== 1) fail(`html ${route}`, `${facts.h1Count} <h1> (want exactly 1)`);
      if (H.requireMainLandmark && facts.mainCount !== 1) fail(`html ${route}`, `${facts.mainCount} <main> (want exactly 1)`);
      if (H.requireContentinfo && facts.contentinfoCount !== 1) fail(`html ${route}`, `${facts.contentinfoCount} contentinfo landmarks (want exactly 1)`);
      if (H.requireSkipLink && !facts.skipLink) fail(`html ${route}`, "skip link not found");
      if (facts.imgsNoAlt > 0) fail(`html ${route}`, `${facts.imgsNoAlt} <img> without alt`);
      for (const href of facts.anchors) {
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
        if (href.startsWith("/")) {
          const p = href.split("#")[0].split("?")[0] || "/";
          if (!internalLinks.has(p)) internalLinks.set(p, route);
        } else if (/^https?:\/\//.test(href)) {
          const u = new URL(href);
          if (u.host === `localhost:${PORT}` || u.host === `127.0.0.1:${PORT}` || (REMOTE && u.origin === new URL(REMOTE).origin)) {
            const p = u.pathname.replace(/\/$/, "") || "/";
            if (!internalLinks.has(p)) internalLinks.set(p, route);
          } else if (!externalLinks.has(href)) externalLinks.set(href, route);
        }
      }

      // keyboard: first Tab → skip link; focus visible after a few tabs
      if (T.keyboard?.skipLinkFirst) {
        await page.keyboard.press("Tab");
        const first = await page.evaluate(() => {
          const el = document.activeElement;
          return el ? { tag: el.tagName, href: el.getAttribute("href"), text: (el.textContent || "").trim().slice(0, 40) } : null;
        });
        if (!first || !(first.href === "#main-content" || first.href === "#conteudo"))
          fail(`keyboard ${route}`, `first Tab focused ${JSON.stringify(first)} (expected the skip link)`);
      }
      if (T.keyboard?.focusVisible) {
        for (let i = 0; i < 3; i++) await page.keyboard.press("Tab");
        const ring = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return { none: true };
          const cs = getComputedStyle(el);
          return { tag: el.tagName, outline: cs.outlineStyle, outlineWidth: cs.outlineWidth, boxShadow: cs.boxShadow };
        });
        const visible = !ring.none && ((ring.outline && ring.outline !== "none" && ring.outlineWidth !== "0px") || (ring.boxShadow && ring.boxShadow !== "none"));
        if (!visible) fail(`keyboard ${route}`, `focus ring not visible on 4th Tab: ${JSON.stringify(ring)}`);
      }
    }

    // axe — both viewports
    await page.addScriptTag({ content: axeSource });
    const axeResult = await page.evaluate(
      (tags) => window.axe.run(document, { runOnly: { type: "tag", values: tags }, resultTypes: ["violations"] }),
      T.axe.tags,
    );
    const violations = axeResult.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.length,
      targets: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
    }));
    axeReport[`${route} [${vpName}]`] = violations;
    if (violations.length > T.axe.maxViolations)
      fail(`axe ${route} [${vpName}]`, violations.map((v) => `${v.id}(${v.impact}×${v.nodes}: ${v.targets[0]})`).join("; "));

    if (consoleErrors.length > (T.maxConsoleErrors ?? 0))
      fail(`console ${route} [${vpName}]`, consoleErrors.slice(0, 3).join(" | ").slice(0, 300));

    await page.screenshot({ path: path.join(screensDir, `${slug(route)}-${vpName}.png`), fullPage: true });
    await context.close();
  }
  log(`  ✓ ${route}`);
}
await browser.close();

// ───────────────────────── 3. links ─────────────────────────
log(`▶ links: ${internalLinks.size} internal, ${externalLinks.size} external`);
const linkReport = { internal: {}, external: {} };
for (const [p, from] of internalLinks) {
  try {
    const r = await fetch(BASE + p, { redirect: "follow" });
    linkReport.internal[p] = r.status;
    if (r.status >= 400) fail("links", `internal ${p} → ${r.status} (linked from ${from})`);
  } catch (e) {
    fail("links", `internal ${p} → ${e.message} (linked from ${from})`);
  }
}
const allowedStatus = (host, status) =>
  Object.entries(T.links.externalAllowedStatus ?? {}).some(([h, codes]) => host.endsWith(h) && codes.includes(status));
for (const [href, from] of externalLinks) {
  const host = new URL(href).host.replace(/^www\./, "");
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15_000);
    const r = await fetch(href, { redirect: "follow", signal: ctrl.signal, headers: { "user-agent": "Mozilla/5.0 (gauntlet link-check)" } });
    clearTimeout(t);
    linkReport.external[href] = r.status;
    const bad = r.status >= 400 && !allowedStatus(host, r.status);
    if (bad) {
      const must = (T.links.mustBeReachable ?? []).some((h) => host.endsWith(h));
      (must || T.links.failOnExternal ? fail : warn)("links", `external ${href} → ${r.status} (from ${from})`);
    }
  } catch (e) {
    linkReport.external[href] = String(e.cause?.code ?? e.message);
    const must = (T.links.mustBeReachable ?? []).some((h) => host.endsWith(h));
    (must || T.links.failOnExternal ? fail : warn)("links", `external ${href} → ${e.cause?.code ?? e.message} (from ${from})`);
  }
}

// ───────────────────────── 4. extra urls ─────────────────────────
const extraReport = {};
for (const p of T.extraUrls ?? []) {
  try {
    const r = await fetch(BASE + p);
    extraReport[p] = `${r.status} ${r.headers.get("content-type") ?? ""}`;
    if (!r.ok) fail("extra", `${p} → ${r.status}`);
  } catch (e) {
    fail("extra", `${p} → ${e.message}`);
  }
}

// ───────────────────────── 5. lighthouse ─────────────────────────
const lhReport = {};
if (!SKIP.has("lighthouse")) {
  const lhBin = path.join(root, "node_modules", ".bin", "lighthouse");
  const runLh = (url, ff, run = 1) => {
    const out = path.join(reportsDir, `lh-${slug(new URL(url).pathname)}-${ff}-run${run}.json`);
    const flags = [
      url,
      "--output=json",
      `--output-path=${out}`,
      "--quiet",
      "--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage",
      "--only-categories=performance,accessibility,best-practices,seo",
      ff === "desktop" ? "--preset=desktop" : "--form-factor=mobile",
    ];
    execFileSync(lhBin, flags, { cwd: root, stdio: ["ignore", "ignore", "pipe"] });
    const j = JSON.parse(readFileSync(out, "utf8"));
    const scores = Object.fromEntries(Object.entries(j.categories).map(([k, v]) => [k, Math.round((v.score ?? 0) * 100)]));
    const a = j.audits;
    const failing = Object.values(j.audits)
      .filter((x) => x.score !== null && x.score < 0.9 && (x.scoreDisplayMode === "binary" || x.scoreDisplayMode === "numeric"))
      .map((x) => `${x.id}${x.displayValue ? `=${x.displayValue}` : ""}`)
      .slice(0, 12);
    return {
      scores,
      lcp: a["largest-contentful-paint"]?.displayValue,
      cls: a["cumulative-layout-shift"]?.displayValue,
      tbt: a["total-blocking-time"]?.displayValue,
      metrics: {
        lcp: a["largest-contentful-paint"]?.numericValue,
        cls: a["cumulative-layout-shift"]?.numericValue,
        tbt: a["total-blocking-time"]?.numericValue,
      },
      failing,
    };
  };
  for (const route of T.lighthouseRoutes) {
    for (const ff of ["mobile", "desktop"]) {
      const url = BASE + route;
      let res;
      try {
        // performance é ruidosa: duas execuções sempre, fica a PIOR (gate conservador,
        // sem viés para cima — o retry só-quando-falha inflava o resultado)
        const a1 = runLh(url, ff, 1);
        const a2 = runLh(url, ff, 2);
        res = a1.scores.performance <= a2.scores.performance ? a1 : a2;
        res.metrics = {
          lcp: Math.max(a1.metrics.lcp ?? 0, a2.metrics.lcp ?? 0),
          cls: Math.max(a1.metrics.cls ?? 0, a2.metrics.cls ?? 0),
          tbt: Math.max(a1.metrics.tbt ?? 0, a2.metrics.tbt ?? 0),
        };
        res.runs = [a1.scores.performance, a2.scores.performance];
      } catch (e) {
        fail(`lighthouse ${route} [${ff}]`, String(e.stderr ?? e.message).slice(0, 200));
        continue;
      }
      lhReport[`${route} [${ff}]`] = res;
      for (const [cat, min] of Object.entries(T.lighthouse[ff])) {
        if ((res.scores[cat] ?? 0) < min) fail(`lighthouse ${route} [${ff}]`, `${cat} ${res.scores[cat]} < ${min} (runs ${res.runs.join("/")}; failing: ${res.failing.join(",")})`);
      }
      const M = T.lighthouse.metrics ?? {};
      if (M.cls !== undefined && res.metrics.cls > M.cls) fail(`lighthouse ${route} [${ff}]`, `CLS ${res.metrics.cls.toFixed(3)} > ${M.cls}`);
      if (M.tbt !== undefined && res.metrics.tbt > M.tbt) fail(`lighthouse ${route} [${ff}]`, `TBT ${Math.round(res.metrics.tbt)}ms > ${M.tbt}ms`);
      if (M.lcp !== undefined && res.metrics.lcp > M.lcp) fail(`lighthouse ${route} [${ff}]`, `LCP ${Math.round(res.metrics.lcp)}ms > ${M.lcp}ms`);
      log(`  ${ff.padEnd(7)} ${route.padEnd(40)} perf ${res.scores.performance} a11y ${res.scores.accessibility} bp ${res.scores["best-practices"]} seo ${res.scores.seo}  LCP ${res.lcp} CLS ${res.cls} TBT ${res.tbt}`);
    }
  }
}

// ───────────────────────── 6. report ─────────────────────────
stopServer();
// keep the local server's own output next to the report: when wrangler dev dies
// mid-run (ERR_CONNECTION_REFUSED on every later route) this is the only trace
if (serverLog) writeFileSync(path.join(reportsDir, "server.log"), serverLog);
const report = {
  at: new Date().toISOString(),
  ok: failures.length === 0,
  routes,
  failures,
  warnings,
  lighthouse: lhReport,
  axe: axeReport,
  html: htmlReport,
  links: linkReport,
  extra: extraReport,
};
writeFileSync(path.join(reportsDir, "latest.json"), JSON.stringify(report, null, 2));
writeFileSync(path.join(reportsDir, `run-${report.at.replace(/[:.]/g, "-")}.json`), JSON.stringify(report, null, 2));

log("\n══════════ GAUNTLET ══════════");
log(`routes: ${routes.length} · failures: ${failures.length} · warnings: ${warnings.length}`);
for (const f of failures) log(`  ✗ [${f.scope}] ${f.msg}`);
for (const w of warnings) log(`  ⚠ [${w.scope}] ${w.msg}`);
log(report.ok ? "\nRESULT: PASS" : "\nRESULT: FAIL");
process.exit(report.ok ? 0 : 1);
