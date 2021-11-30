<template>
  <v-app class="main_app">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <div
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item
          v-if="!item.children"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-if="item.children"
          no-action
          class="mx-0"
        >
          <template #activator>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="(child, key) in item.children"
            :key="key"
            :to="child.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="child.title" />
          </v-list-item>
        </v-list-group>
      </div>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      flat
    >
      <v-app-bar-nav-icon @click.stop="miniVariant = !miniVariant" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <user-menu v-if="$auth.loggedIn" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <v-row justify="center" no-gutters>
        <Nav
          navigation-name="footer-navigation-11"
          color="indigo"
          :text="true"
          :rounded="true"
        />
        <v-col cols="12" class="text-center">
          <span>&copy; {{ new Date().getFullYear() }} Autho App</span>
        </v-col>
      </v-row>
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
  middleware: 'admin',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/admin'
        },
        {
          icon: 'mdi-menu',
          title: 'Menus',
          to: '/admin/menu'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Accounts',
          to: '/admin/accounts'
        },
        {
          icon: 'mdi-post',
          title: 'Blog',
          to: '/admin/blog',
          children: [
            {
              icon: 'mdi-post',
              title: 'New Post',
              to: '/admin/blog/new'
            },
            {
              icon: 'mdi-post',
              title: 'List Posts',
              to: '/admin/blog/list'
            }
          ]
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
        },
        {
          icon: 'mdi-home',
          title: 'Front End',
          to: '/'
        }
      ],
      miniVariant: false,
      title: 'Admin Panel'
    }
  },
  head: {
    titleTemplate: '%s - Admin Panel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  },
  computed: {
    loggedIn () {
      return this.$store.state.isLogged
    }
  }
}
</script>
