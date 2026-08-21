import { defineConfig, devices } from "@playwright/test";

/**
 * E2E contra o build de produção: rode `npm run build` antes de `npm test`.
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
    command: "npx next start -p 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
