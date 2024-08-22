export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"],
  supabase: {redirect: false},
  devtools: { enabled: true },
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  compatibilityDate: "2024-08-22",
})