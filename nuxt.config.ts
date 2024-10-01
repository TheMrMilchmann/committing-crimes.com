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

    compatibilityDate: "2024-07-18",

    components: {
        dirs: [
            "~/components/controls",
            "~/components/embeds",
            "~/components/layout"
        ]
    },

    content: {
        contentHead: false,
        documentDriven: {
            // See https://github.com/dan-bowen/nuxt-blog-starter/issues/2
            injectPage: false
        },
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

    fontMetrics: {
        // https://github.com/nuxt-modules/fontaine/issues/372
        fonts: ['Inter', 'JetBrains Mono']
    },

    modules: [
        "@nuxt/content",
        "@nuxt/image",
        "@nuxtjs/color-mode",
        "@nuxtjs/fontaine",
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