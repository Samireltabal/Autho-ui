<template>
  <v-row class="text-center" justify="center">
    <v-btn
      v-for="item in menu.items"
      :key="item.id"
      :color="color"
      :text="text"
      :rounded="rounded"
      class="my-2"
      @click="handleLink(item)"
    >
      <v-icon v-if="item.icon_name">
        {{ item.icon_family }}-{{ item.icon_name }}
      </v-icon> {{ item.text }}
    </v-btn>
  </v-row>
</template>
<script>
export default {
  name: 'FooterNavigation',
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
