import { defineConfig, devices } from "@playwright/test";

/**
 * E2E contra o export estático (`out/`) servido por `wrangler dev`, que aplica
 * `_headers`, `_redirects`, `html_handling` e `404.html` como em produção.
 * O webServer roda `npm run build` quando `out/` não existe; para forçar um
 * build novo, rode `npm run build` antes de `npm test`.
 * O servidor sobe em :3001 (ou reutiliza um já aberto nessa porta).
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3001",
    trace: "on-first-retry",
    locale: "pt-BR",
    colorScheme: "dark",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "test -d out || npm run build; npx wrangler dev --port 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
