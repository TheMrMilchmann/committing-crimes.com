// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/content"
    ],

    nitro: {
        routeRules: {
            "/**": {
                ssr: false,
            }
        }
    },

    typescript: {
        strict: true,
        typeCheck: true
    }
})