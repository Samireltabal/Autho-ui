<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <h3 class="text-center">Please Input Code Delievered to your email</h3>
    </v-col>
    <v-col cols="3" />
    <v-col cols="6">
      <v-alert v-if="error" dark color="error">
        {{ error }}
      </v-alert>
    </v-col>
    <v-col cols="3" />
    <v-col cols="4">
      <v-otp-input
        length="6"
        type="number"
        @finish="onFinish"
      />
      <v-overlay absolute :value="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-overlay>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Verify',
  data () {
    return {
      loading: false,
      splitted: [],
      error: null
    }
  },
  methods: {
    onFinish (event) {
      this.error = null
      this.loading = true
      this.splitted = [
        parseInt(event[0]),
        parseInt(event[1]),
        parseInt(event[2]),
        parseInt(event[3]),
        parseInt(event[4]),
        parseInt(event[5])
      ]
      this.$axios.post('/auth/verify', { otp: this.splitted }).then((response) => {
        console.log(response.data)
        this.loading = false
        this.$router.push('/')
      }).catch((err) => {
        this.error = err.response.data.message
        this.loading = false
      })
    }
  }
}
</script>
