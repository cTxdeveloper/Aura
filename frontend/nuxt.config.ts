// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true, // Server-Side Rendering enabled for SEO and performance

  app: {
    head: {
      title: 'The Access Marketplace',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Unlock your network. Connect with value.' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        // We will add custom fonts later if needed
      ]
    }
  },

  css: [
    'vuetify/lib/styles/main.sass', // Vuetify styles
    '@mdi/font/css/materialdesignicons.min.css', // Material Design Icons for Vuetify
    '~/assets/css/main.css', // Main global styles
    '~/assets/css/animations.css' // Animations
  ],

  build: {
    transpile: ['vuetify', 'gsap', 'three'],
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    // Vuetify configuration will be handled via a plugin for more control
  ],

  tailwindcss: {
    // Options
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    // Potentially add other Vite specific configurations here
  },

  components: {
    dirs: [
      '~/components/ui', // Lower level UI components
      '~/components/layout', // Layout specific components
      '~/components/bounty', // Bounty related components
      '~/components/deal', // Deal related components
      '~/components', // Other general components
    ]
  },

  imports: {
    dirs: ['store', 'types', 'composables'],
  },

  // Runtime config can be used for environment variables
  // runtimeConfig: {
  //   public: {
  //     apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api/v1'
  //   }
  // },
})
