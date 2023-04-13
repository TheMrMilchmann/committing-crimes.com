// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        baseURL: "/committing-crimes.com/"
    },

    modules: [
        "@nuxt/content"
    ],

    typescript: {
        strict: true,
        typeCheck: true
    }
})