// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  css: ['@/assets/css/tailwind.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})