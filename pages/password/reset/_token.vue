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
            <v-card-text v-if="response">
              <v-alert color="success" dark>
                {{ response }}
              </v-alert>
            </v-card-text>
            <!-- login form -->
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  outlined
                  prepend-icon="mdi-email"
                  label="Email"
                  placeholder="john@example.com"
                  hide-details
                  class="mb-3"
                />

                <v-text-field
                  v-model="password"
                  outlined
                  prepend-icon="mdi-lock"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="New Password"
                  placeholder="············"
                  :append-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  hide-details
                  class="mb-3"
                  @click:append="isPasswordVisible = !isPasswordVisible"
                />

                <v-text-field
                  v-model="password_confirmation"
                  outlined
                  prepend-icon="mdi-lock"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="New Password Confirmation"
                  placeholder="············"
                  :append-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  hide-details
                  @click:append="isPasswordVisible = !isPasswordVisible"
                />

                <v-btn
                  block
                  color="indigo"
                  dark
                  class="mt-6"
                  @click="changePass"
                >
                  Change Password
                </v-btn>
              </v-form>
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
  middleware: 'guest',
  data () {
    return {
      email: null,
      password: null,
      password_confirmation: null,
      response: null,
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
  computed: {
    token () {
      return this.$route.params.token
    }
  },
  methods: {
    changePass () {
      const data = {
        email: this.email,
        token: this.token,
        password: this.password,
        password_confirmation: this.password_confirmation
      }
      this.$axios.post('auth/password/reset', data).then((response) => {
        this.response = response.data.message
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      })
    }
  }
}
</script>
