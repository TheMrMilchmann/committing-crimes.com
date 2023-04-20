// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        baseURL: "/"
    },

    content: {
        documentDriven: true,
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
                "/rss.xml",
                "/sitemap.xml"
            ]
        }
    },

    typescript: {
        strict: true,
        typeCheck: true
    }
})