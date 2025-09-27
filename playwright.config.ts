import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";
import type { ConfigOptions } from "@nuxt/test-utils/playwright";
import { useSSRContext } from "vue";

export default defineConfig<ConfigOptions>({
  testDir: "./test/e2e",
  timeout: 30 * 1000,
  retries: 0,
  use: {
    nuxt: {
      app: {
        port: 3002,
      },
      rootDir: fileURLToPath(new URL(".", import.meta.url)),
      useSSRContext: false,
    },
    headless: false,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    actionTimeout: 5000,
  },
  projects: [
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
