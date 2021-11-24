import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Autho',
    title: 'Autho',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    ['vue-sweetalert2/nuxt'],
    { src: '@nuxtjs/axios', mode: 'client' },
    { src: '@nuxtjs/auth-next', mode: 'client' }
  ],
  sweetalert: {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  axios: {
    BaseURL: process.env.BASE_URL || 'https://api.synciteg.xyz/api/'
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  auth: {
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: process.env.BASE_URL || 'https://api.synciteg.xyz/api/',
        rewriteRedirects: true,
        fullPathRedirect: true,
        watchLoggedIn: false,
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'access_token' },
          logout: { url: 'auth/logout', method: 'post' },
          user: { url: 'auth/user', method: 'get' }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        }
      },
      social: { // new strategy
        scheme: '~/strategies/social.js',
        provider: 'laravel/jwt',
        url: process.env.BASE_URL || 'https://api.synciteg.xyz/api/',
        endpoints: {
          logout: { url: 'auth/logout', method: 'post' },
          user: { url: 'auth/user', method: 'get' }
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
