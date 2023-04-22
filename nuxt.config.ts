// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",

    app: {
        baseURL: "/"
    },

    content: {
        documentDriven: true,
        sources: {
            content: {
                driver: "fs",
                prefix: "/articles",
                base: "src/content/articles"
            }
        }
    },

    modules: [
        "@nuxt/content",
        "nuxt-jsonld"
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