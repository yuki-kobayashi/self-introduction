// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})