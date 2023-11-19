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

    components: {
        dirs: [
            "~/components/controls",
            "~/components/embeds",
            "~/components/layout"
        ]
    },

    content: {
        contentHead: false,
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
                "dark-mode": "github-dark"
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

    css: [
        "@/assets/css/main.css"
    ],

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