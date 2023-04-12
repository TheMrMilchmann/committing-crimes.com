// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/content"
    ],

    content: {
        sources: {
            content: {
                driver: "fs",
                prefix: "/articles",
                base: "./content/articles"
            }
        }
    }
})