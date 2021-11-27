<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="false"
    fixed
    app
  >
    <v-list>
      <div
        v-for="(item, i) in menu.tree"
        :key="i"
      >
        <v-list-item
          v-if="!item.HasChild && handleVisibility(item.visibility_level)"
          :to="item.route"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon_family }}-{{ item.icon_name }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-if="item.HasChild && handleVisibility(item.visibility_level)"
          no-action
          class="mx-0"
        >
          <template #activator>
            <v-list-item-action>
              <v-icon>{{ item.icon_family }}-{{ item.icon_name }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="(child, key) in item.children"
            :key="key"
            :to="child.route"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ child.icon_family }}-{{ child.icon_name }}</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="child.text" />
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'SideNavigation',
  props: {
    menu: {
      required: true,
      type: [Array, Object]
    },
    color: {
      default: 'indigo',
      type: String
    },
    rounded: {
      default: false,
      type: Boolean
    },
    text: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {

    }
  },
  computed: {
    drawer: {
      get () {
        return this.$store.state.sideMenu
      },
      set (val) {
        this.$store.dispatch('SetSideMenu', val)
      }
    },
    role () {
      return this.$store.state.auth.user.Role
    },
    loggedIn () {
      return this.$store.state.auth.loggedIn
    }
  },
  methods: {
    handleLink (item) {
      switch (item.type) {
        case 'link':
          this.$router.push(item.route)
          break
        case 'page':
          this.$router.push(`/page/${item.route}`)
          break
        case 'external':
          window.open(item.route)
          break
        default:
          break
      }
    },
    handleVisibility (level) {
      if (level === 'all') {
        return true
      } else if (level === 'registered' && this.loggedIn) {
        return true
      } else if (level === 'admin_only' && this.role === 'admin') {
        return true
      } else if (level === 'guest_only' && !this.loggedIn) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
