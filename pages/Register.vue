<template>
  <v-row justify="center" align="center">
    <v-col cols="4">
      <div class="auth-wrapper auth-v1 single_form">
        <div class="auth-inner">
          <v-card class="auth-card">
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

            <!-- title -->
            <v-card-text>
              <p class="text-2xl font-weight-semibold text--primary mb-2">
                Welcome to Autho! 👋🏻
              </p>
              <p class="mb-2">
                Please create your new account and start the adventure
              </p>
            </v-card-text>
            <v-card-text>
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
            <!-- login form -->
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="name"
                  outlined
                  prepend-icon="mdi-account"
                  label="Name"
                  placeholder="John doe"
                  :error="handleValidationErrors('name').has_error"
                  :error-messages="handleValidationErrors('name').has_error ? handleValidationErrors('password').message : ''"
                  hide-details
                  class="mb-3"
                />

                <v-text-field
                  v-model="phone"
                  outlined
                  prepend-icon="mdi-phone"
                  label="Phone"
                  placeholder="01553655555"
                  :error="handleValidationErrors('phone').has_error"
                  :error-messages="handleValidationErrors('phone').has_error ? handleValidationErrors('password').message : ''"
                  hide-details
                  class="mb-3"
                />

                <v-text-field
                  v-model="email"
                  outlined
                  prepend-icon="mdi-email"
                  label="Email"
                  placeholder="john@example.com"
                  :error="handleValidationErrors('email').has_error"
                  :error-messages="handleValidationErrors('email').has_error ? handleValidationErrors('password').message : ''"
                  hide-details
                  class="mb-3"
                />

                <v-text-field
                  v-model="password"
                  outlined
                  prepend-icon="mdi-lock"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="Password"
                  placeholder="············"
                  :append-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  hide-details
                  :error="handleValidationErrors('password').has_error"
                  :error-message="handleValidationErrors('password').has_error ? handleValidationErrors('password').message : ''"
                  class="mb-3"
                  @click:append="isPasswordVisible = !isPasswordVisible"
                />

                <v-text-field
                  v-model="password_confirmation"
                  outlined
                  prepend-icon="mdi-lock"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="Password Confirmation"
                  placeholder="············"
                  :error="handleValidationErrors('password_confirmation').has_error"
                  :error-message="handleValidationErrors('password_confirmation').has_error ? handleValidationErrors('password').message : ''"
                  :append-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  hide-details
                  @click:append="isPasswordVisible = !isPasswordVisible"
                />

                <v-btn
                  block
                  color="indigo"
                  dark
                  class="mt-6"
                  @click="registerAccount"
                >
                  Register
                </v-btn>
              </v-form>
            </v-card-text>

            <!-- create new account  -->
            <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
              <span class="me-2">
                Already have an account
              </span>
              <nuxt-link to="/login">
                Login
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
  middleware: ['guest'],
  data () {
    return {
      name: null,
      phone: null,
      email: null,
      password: null,
      password_confirmation: null,
      Errors: [],
      isPasswordVisible: false,
      socialLink: [
        {
          icon: 'mdi-facebook',
          color: '#4267b2',
          colorInDark: '#4267b2'
        },
        {
          icon: 'mdi-github',
          color: '#272727',
          colorInDark: '#fff'
        },
        {
          icon: 'mdi-google',
          color: '#db4437',
          colorInDark: '#db4437'
        }
      ]
    }
  },
  methods: {
    registerAccount () {
      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }
      this.$axios.post('auth/register', data).then((response) => {
        this.$auth.loginWith('social', {
          data: { token: response.data.access_token }
        }).then((res) => {
          this.$store.dispatch('login')
          this.$store.dispatch('setToken', this.token)
          this.$store.dispatch('setUser', res.data)
        })
      }).catch((err) => {
        this.Errors = err.response.data.errors
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
