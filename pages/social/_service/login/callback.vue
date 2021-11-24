<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <h3>Successfully Logged In using {{ service }} ..</h3>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'SocialLoginCallback',
  layout: 'noMenu',
  middleware: ['guest'],
  data () {
    return {

    }
  },
  computed: {
    service () {
      return this.$route.params.service
    },
    token () {
      return this.$route.query.token
    },
    user () {
      return this.$store.$auth.$state
    }
  },
  mounted () {
    this.$auth.loginWith('social', {
      data: { token: this.$route.query.token }
    }).then((res) => {
      this.$store.dispatch('login')
      this.$store.dispatch('setToken', this.token)
      this.$store.dispatch('setUser', res.data)
    })
  }
}
</script>
