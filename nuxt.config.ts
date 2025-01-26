// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt", "nuxt-umami"],
  ssr: false,
  css: ["~/assets/css/style.css"],
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
          href: "/admin/favicon.webp",
        },
      ],
      title: "ffmate",
      htmlAttrs: {
        class: "overflow-y-scroll",
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
