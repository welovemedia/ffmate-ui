import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
  test: {
    environment: "nuxt",
    projects: [
      {
        test: {
          name: "unit",
          include: ["test/unit/**/*.{test,spec}.ts"],
          environment: "node",
        },
      },
      await defineVitestProject({
        test: {
          name: "e2e",
          include: ["test/e2e/**/*.{test,spec}.ts"],
          environment: "nuxt",
          environmentOptions: {
            nuxtRuntimeConfig: {
              app: {
                baseUrl: "/",
              },
            },
            nuxt: {
              url: "http://localhost:3001",
              rootDir: fileURLToPath(new URL(".", import.meta.url)),
            },
          },
          globals: true,
        },
      }),
      await defineVitestProject({
        test: {
          name: "nuxt",
          include: ["test/nuxt/**/*.{test,spec}.ts"],
          environment: "nuxt",
        },
      }),
    ],
  },
});
