import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-umami",
    "@nuxtjs/google-fonts",
  ],
  ssr: false,
  css: ["~/assets/css/style.css"],
  vite: {
    plugins: [tailwindcss()],
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
  umami: {
    id: "ffmate",
    host: "http://localhost:3000",
    customEndpoint: "/metrics/umami",
    autoTrack: true,
  },
  devServer: {
    port: 3001,
  },
});
