<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="3" class="text-center">
        please wait while logging using {{ service }} ..
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'SocialLogin',
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
    }
  },
  mounted () {
    if (this.service === 'token' && this.token) {
      console.log('call from login page')
      this.$auth.loginWith('social', {
        data: { token: this.token }
      })
    }
    setTimeout(() => {
      const uri = process.env.NUXT_ENV_BASE_URL + `auth/social/login/${this.service}`
      window.location.href = uri
    }, 500)
  }
}
</script>
