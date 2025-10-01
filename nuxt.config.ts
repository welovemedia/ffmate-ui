import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/test-utils/module",
  ],

  ssr: false,
  css: ["~/assets/css/style.css"],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: '_nuxt/chunks/ff_[name].js',
          entryFileNames: '_nuxt/ff_[name].js',
          assetFileNames: '_nuxt/ff_[name].[ext]'
        }
      }
    }
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    baseURL: "/ui/",
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "icon",
          type: "image/webp",
          href: "/ui/icon_black.webp",
        },
      ],
      title: "ffmate",
      htmlAttrs: {
        class: "overflow-y-scroll",
      },
    },
  },

  googleFonts: {
    families: {
      Poppins: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
  },

  devServer: {
    port: 3001,
  },

  compatibilityDate: "2025-09-08",
});
