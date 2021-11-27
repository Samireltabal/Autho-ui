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
          v-if="!item.HasChild"
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
          v-if="item.HasChild"
          no-action
        >
          <template #activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-item-action>
                  <v-icon>{{ item.icon_family }}-{{ item.icon_name }}</v-icon>
                </v-list-item-action>
                <v-list-tile-title>
                  <small>
                    {{ item.text }}
                  </small>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
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
            <v-list-item-content>
              <v-list-item-title v-text="child.text" />
            </v-list-item-content>
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
    }
  }
}
</script>
