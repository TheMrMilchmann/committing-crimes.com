// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        baseURL: "/"
    },

    content: {
        sources: {
            content: {
                driver: "fs",
                prefix: "/articles",
                base: "./content/articles"
            }
        }
    },

    modules: [
        "@nuxt/content"
    ],

    nitro: {
        prerender: {
            routes: [
                "/sitemap.xml"
            ]
        }
    },

    typescript: {
        strict: true,
        typeCheck: true
    }
})