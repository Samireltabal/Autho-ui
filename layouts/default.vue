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
      mqtt: null,
      client: null,
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
      return this.$auth.state.loggedIn
    },
    drawer: {
      get () {
        return this.$store.state.sideMenu
      },
      set (val) {
        this.$store.dispatch('SetSideMenu', val)
      }
    },
    clientId () {
      return this.$auth.user.email
    },
    username () {
      return this.$auth.user.uuid
    },
    token () {
      return this.$auth.strategy.token.get()
    },
    channels () {
      return `/${this.username}/notifications`
    }
  },
  watch: {
    loggedIn: {
      immediate: true,
      handler () {
        this.start_session()
      }
    }
  },
  mounted () {

  },
  methods: {
    async connectWs () {
      const options = {
        keepalive: 60,
        clientId: this.clientId,
        protocolId: 'MQTT',
        username: this.username,
        password: this.token,
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: 'WillMsg',
          payload: 'Connection Closed abnormally..!',
          qos: 0,
          retain: false
        },
        rejectUnauthorized: false
      }
      this.client = await this.$mqtt.connect(process.env.NUXT_ENV_WS_HOST, options)
      return this.client
    },
    start_session () {
      const uuid = this.$auth.user.uuid
      if (this.loggedIn) {
        this.connectWs().then((instance) => {
          instance.on('connect', function () {
            console.log(this.channels)
            instance.subscribe(`/${uuid}/notifications`, function (err) {
              if (!err) {
                instance.publish('presence', 'Hello mqtt')
              }
            })
          })
          instance.on('message', (topic, payload, packet) => {
            this.$swal.fire(
              topic,
              payload.toString(),
              'success'
            )
          })
        })
      }
      if (!this.loggedIn) {
        if (this.client) {
          this.client.end()
        }
      }
    }
  }
}
</script>
