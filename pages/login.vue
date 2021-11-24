<template>
  <v-row justify="center" align="center">
    <v-col cols="4">
      <div class="auth-wrapper auth-v1">
        <div class="auth-inner">
          <v-card class="auth-card single_form">
            <!-- logo -->
            <v-card-title class="d-flex align-center justify-center py-7">
              <router-link
                to="/"
                class="d-flex align-center"
              >
                <v-img
                  :src="require('@/assets/images/logos/logo.svg')"
                  max-height="30px"
                  max-width="30px"
                  alt="logo"
                  contain
                  class="me-3 "
                />

                <h2 class="text-2xl font-weight-semibold">
                  Autho
                </h2>
              </router-link>
            </v-card-title>
            <v-card-text v-if="Errors">
              <v-alert
                v-for="(error, key) in Errors"
                :key="key"
                color="error"
                dense
                dark
                icon="mdi-information-outline"
              >
                {{ handleValidationErrors(key).message[0] }}
              </v-alert>
            </v-card-text>
            <!-- title -->
            <v-card-text>
              <p class="text-2xl font-weight-semibold text--primary mb-2">
                Welcome to Autho! 👋🏻
              </p>
              <p class="mb-2">
                Please sign-in to your account and start the adventure
              </p>
            </v-card-text>

            <!-- login form -->
            <v-card-text>
              <v-form @submit.prevent="userLogin">
                <v-text-field
                  v-model="login"
                  outlined
                  label="Login"
                  placeholder="john@example.com"
                  :error="handleValidationErrors('login').has_error"
                  :error-messages="handleValidationErrors('login').has_error ? handleValidationErrors('login').message : ''"
                  hide-details
                  class="mb-3"
                />

                <v-text-field
                  v-model="password"
                  outlined
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="Password"
                  placeholder="············"
                  :error="handleValidationErrors('password').has_error"
                  :error-message="handleValidationErrors('password').has_error ? handleValidationErrors('password').message : ''"
                  :append-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  hide-details
                  @click:append="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center justify-space-between flex-wrap">
                  <v-checkbox
                    label="Remember Me"
                    hide-details
                    class="me-3 mt-1"
                  />

                  <!-- forgot link -->
                  <nuxt-link to="/password/forgot">
                    Forgot Password?
                  </nuxt-link>
                </div>

                <v-btn
                  block
                  color="indigo"
                  dark
                  class="mt-6"
                  @click="userLogin"
                >
                  Login
                </v-btn>
              </v-form>
            </v-card-text>

            <!-- create new account  -->
            <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
              <span class="me-2">
                New on our platform?
              </span>
              <nuxt-link to="/register">
                Create an account
              </nuxt-link>
            </v-card-text>

            <!-- divider -->
            <v-card-text class="d-flex align-center mt-2">
              <v-divider />
              <span class="mx-5">or</span>
              <v-divider />
            </v-card-text>

            <!-- social links -->
            <v-card-actions class="d-flex justify-center">
              <v-btn
                v-for="link in socialLink"
                :key="link.icon"
                icon
                class="ms-1"
                @click="$router.push(`/social/${link.service}/login`)"
              >
                <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
                  {{ link.icon }}
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Login',
  layout: 'noMenu',
  middleware: 'guest',
  data () {
    return {
      login: null,
      password: null,
      Errors: [],
      isPasswordVisible: false,
      socialLink: [
        {
          icon: 'mdi-facebook',
          service: 'facebook',
          color: '#4267b2',
          colorInDark: '#4267b2'
        },
        {
          icon: 'mdi-github',
          service: 'github',
          color: '#272727',
          colorInDark: '#fff'
        },
        {
          icon: 'mdi-google',
          service: 'google',
          color: '#db4437',
          colorInDark: '#db4437'
        }
      ]
    }
  },
  methods: {
    async userLogin () {
      await this.$auth.loginWith('laravelJWT', { data: { login: this.login, password: this.password } }).then((response) => {
        this.$auth.setUserToken(response.data.access_token).then(() => {
          this.$axios.setToken(response.data.access_token, 'Bearer')
          this.$store.dispatch('login')
          this.$store.dispatch('setToken', response.data.access_token)
          this.$store.dispatch('setUser', response.data.user_data)
        })
        this.$auth.setUser(response.data.user_data)
      }).catch((err) => {
        if (err.response.status === 401) {
          this.Errors = [
            [err.response.data.message]
          ]
        } else if (err.response.status === 422) {
          this.Errors = err.response.data.errors
        }
      })
    },
    handleValidationErrors (name) {
      const errorData = {
        has_error: this.Errors[name] != null,
        message: this.Errors[name]
      }
      return errorData
    }
  }
}
</script>
