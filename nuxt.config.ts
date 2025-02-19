/*
 * Copyright (c) 2023-2025 Leon Linhart
 * All rights reserved.
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",

    app: {
        baseURL: "/",
        pageTransition: { name: "page", mode: "out-in" },

        head: {
            htmlAttrs: { lang: "en" },
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
        build: {
            markdown: {
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
    }
})