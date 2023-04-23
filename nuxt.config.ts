// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",

    app: {
        baseURL: "/"
    },

    colorMode: {
        preference: "system",
        fallback: "light"
    },

    content: {
        documentDriven: true,
        highlight: {
            preload: [
                "c",
                "java",
                "json",
                "kotlin",
                "rust"
            ],
            theme: {
                default: "github-light",
                dark: "github-dark"
            }
        },
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
        "@nuxtjs/color-mode",
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