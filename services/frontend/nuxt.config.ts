// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: false},
    modules: [
        // '@pinia/nuxt',
        '@nuxtjs/tailwindcss'
    ],
    css: [
        '~/assets/common.scss',
    ],
    // serverHandlers: [
    //     { route: '/api/*', handler: '~/server/api/apiProxy.js' }
    // ],
    tailwindcss: {
        // cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
        // configPath: 'tailwind.config',
        // exposeConfig: {
        //     level: 2
        // },
        // config: {},
        // viewer: true,
    }
    // vite: {
    //     css: {
    //         preprocessorOptions: {
    //             scss: {
    //                 additionalData: '~/assets/common.scss'
    //             }
    //         }
    //     }
    // }
})
