<template>
  <v-app class="main_app">
    <Nav navigation-name="general-side-menu-12" />
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <Nav navigation-name="top-level-menu-13" />
      <v-spacer />
      <user-menu v-if="$auth.loggedIn" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} Autho App</span>
    </v-footer>
  </v-app>
</template>

<script>
import UserMenu from '../components/Main/UserMenu.vue'
import Nav from '../components/Navigation/Nav.vue'
export default {
  components: {
    UserMenu,
    Nav
  },
  data () {
    return {
      clipped: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Admin Protected',
          to: '/admin'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'User Protected',
          to: '/user'
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/login'
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/logout'
        }
      ],
      miniVariant: false,
      right: true,
      title: 'Vuetify.js'
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.isLogged
    },
    drawer: {
      get () {
        return this.$store.state.sideMenu
      },
      set (val) {
        this.$store.dispatch('SetSideMenu', val)
      }
    }
  }
}
</script>
