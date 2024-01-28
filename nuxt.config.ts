/*
 * Copyright (c) 2023-2024 Leon Linhart
 * All rights reserved.
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",

    app: {
        baseURL: "/",
        pageTransition: { name: "page", mode: "out-in" },

        head: {
            link: [
                { rel: "preload", href: "/assets/fonts/Inter.var.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" },
                { rel: "preload", href: "/assets/fonts/JetBrainsMono-Regular.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" },
            ]
        }
    },

    colorMode: {
        preference: "system",
        fallback: "dark"
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
        "@nuxt/image",
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