<template>
  <component
    :is="menu.component_name"
    v-if="isLoaded"
    :menu="menu"
    :color="color"
    :text="text"
    :rounded="rounded"
  />
</template>
<script>
import FooterNavigation from './sub/FooterNavigation.vue'
import SideNavigation from './sub/SideNavigation.vue'
import TopLevelNavigation from './sub/TopLevelNavigation.vue'
export default {
  name: 'Nav',
  components: {
    FooterNavigation,
    SideNavigation,
    TopLevelNavigation
  },
  props: {
    navigationName: {
      required: true,
      type: String
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
      isLoaded: false,
      component: null,
      menu: {}
    }
  },
  async fetch () {
    this.isLoaded = false
    this.menu = {}
    this.menu = await this.$axios.$get(`menus/show/${this.navigationName}`)
    this.isLoaded = true
  }
}
</script>
