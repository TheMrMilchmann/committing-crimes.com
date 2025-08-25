/*
 * Copyright (c) 2023-2025 Leon Linhart
 * All rights reserved.
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        baseURL: "/",
        pageTransition: { name: "page", mode: "out-in" },

        head: {
            htmlAttrs: { lang: "en" },
            link: [
                { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
                { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon.png" },
                { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
                { rel: "preload", href: "/assets/fonts/Inter.var.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" },
                { rel: "preload", href: "/assets/fonts/JetBrainsMono-Regular.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" },
            ],
            meta: [
                { name: "fediverse:creator", content: "@themrmilchmann@mastodon.social" }
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
                rehypePlugins: {
                    "rehype-katex": {
                        options: {
                            output: "mathml"
                        }
                    }
                },
                remarkPlugins: {
                    "remark-math": {}
                }
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

    vue: {
        compilerOptions: {
            isCustomElement: (tag) => tag == "MjxContainer"
        }
    }
})