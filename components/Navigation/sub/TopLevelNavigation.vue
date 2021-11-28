<template>
  <v-row class="mt-2" justify="center">
    <div
      v-for="item in menu.tree"
      :key="item.id"
    >
      <v-btn
        v-if="!item.HasChild && handleVisibility(item.visibility_level)"
        :color="color"
        :text="text"
        :rounded="rounded"
        class="my-2"
        @click="handleLink(item)"
      >
        <v-icon v-if="item.icon_name">
          {{ item.icon_family }}-{{ item.icon_name }}
        </v-icon> {{ item.text }}
        <v-icon v-if="item.HasChild">
          mdi-chevron-down
        </v-icon>
      </v-btn>
      <v-menu v-if="item.HasChild && handleVisibility(item.visibility_level)" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            :color="color"
            :text="text"
            :rounded="rounded"
            class="my-2"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon v-if="item.icon_name">
              {{ item.icon_family }}-{{ item.icon_name }}
            </v-icon> {{ item.text }}
            <v-icon v-if="item.HasChild">
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <div
            v-for="(child, index) in item.children"
            :key="index"
          >
            <v-list-item
              v-if="handleVisibility(child.visibility_level)"
              @click="handleLink(child)"
            >
              <v-list-item-action>
                <v-icon v-if="item.icon_name">
                  {{ item.icon_family }}-{{ item.icon_name }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </div>
  </v-row>
</template>
<script>
export default {
  name: 'TopLevelNavigation',
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
      return this.$store.state.auth.loggedIn ? this.$store.state.auth.user.Role : 'guest'
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
