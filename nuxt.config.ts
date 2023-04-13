// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    routeRoles: {
        "/**": {
            ssr: false,
            prerendering: true
        }
    },

    modules: [
        "@nuxt/content"
    ],

    typescript: {
        strict: true,
        typeCheck: true
    }
})