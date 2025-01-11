// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', "@vueuse/nuxt"],
  ssr: false,
  app: {
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
    },
  },
  devServer: {
    port: 3001
  }
})