<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-card>
        <v-card-title>
          <h3>Accounts..</h3>
        </v-card-title>
        <v-card-text>
          <p>Registered accounts</p>
        </v-card-text>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="accounts.data"
            item-key="name"
            dense
            hide-default-footer
            class="elevation-0"
          >
            <template #[`top`]>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="search"
                    prepend-icon="mdi-magnify"
                    label="Search"
                    hint="Search using Name, Phone Or email"
                    persistent-hint
                    class="mx-4"
                  />
                </v-col>
                <v-col cols="2">
                  <v-btn class="ma-2" @click="$fetch">
                    <v-icon>mdi-refresh</v-icon> refresh
                  </v-btn>
                </v-col>
                <v-col cols="2">
                  <v-checkbox v-model="verified_only" label="verified only" />
                </v-col>
              </v-row>
            </template>
            <template #[`item.avatar`]="{ item }">
              <v-avatar size="38">
                <v-img :src="item.avatar" :alt="item.name" />
              </v-avatar>
            </template>
            <template #[`item.options`]="{ item }">
              <v-btn
                fab
                color="error"
                x-small
                icon
                disabled
                class="elevation-0"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn
                fab
                color="success"
                x-small
                :disabled="item.email_verified_at != null"
                icon
                class="elevation-0"
                @click="verify(item.id)"
              >
                <v-icon>mdi-email-check</v-icon>
              </v-btn>
              <v-menu
                rounded
                offset-y
              >
                <template #activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template #activator="{ on: tooltip }">
                      <v-btn
                        color="success"
                        :disabled="user.id === item.id"
                        icon
                        class="elevation-0"
                        x-small
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }"
                      >
                        <v-icon>mdi-account-alert</v-icon>
                      </v-btn>
                    </template>
                    <span>Change Role</span>
                  </v-tooltip>
                </template>
                <v-list>
                  <v-list-item
                    v-for="role in roles"
                    :key="role.name"
                    link
                    @click="attachRole(item.id, role.name)"
                  >
                    <v-list-item-title v-text="role.name" />
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
            <template #[`item.services`]="{ item }">
              <v-btn v-for="(social, index) in item.services" :key="social+index" icon small disabled>
                <v-icon>mdi-{{ social }}</v-icon>
              </v-btn>
            </template>
            <template #[`footer`]>
              <v-row>
                <v-col cols="9">
                  <v-pagination
                    v-model="page"
                    :length="accounts.last_page"
                    class="elevation-0"
                    circle
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                  />
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="per_page"
                    :items="[1,5,10,50,100]"
                    label="result per page"
                  />
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Accounts',
  layout: 'admin',
  data () {
    return {
      accounts: {},
      search: null,
      verified_only: false,
      roles: [],
      headers: [
        { text: '#', value: 'avatar' },
        { text: 'id', value: 'id' },
        { text: 'name', value: 'name' },
        // { text: 'phone', value: 'phone' },
        { text: 'email', value: 'email' },
        { text: 'Services', value: 'services' },
        { text: 'Role', value: 'role' },
        { text: 'options', value: 'options' }
      ]
    }
  },
  async fetch () {
    const uri = `auth/admin/accounts?search=${this.search}&per_page=${this.per_page}&verified=${this.verified_only}&page=${this.page}`
    this.accounts = await this.$axios.$get(uri)
    if (this.page > this.accounts.to) {
      this.page = 1
    }
    this.roles = await this.$axios.$get('auth/roles')
  },
  computed: {
    page: {
      get () {
        return parseInt(this.$route.query.page) ? parseInt(this.$route.query.page) : parseInt(1)
      },
      set (val) {
        this.$router.replace({ query: { page: val, per_page: this.per_page } })
      }
    },
    per_page: {
      get () {
        return parseInt(this.$route.query.per_page) ? parseInt(this.$route.query.per_page) : parseInt(10)
      },
      set (val) {
        this.$router.replace({ query: { per_page: val, page: this.page } })
      }
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  watch: {
    search () {
      this.$fetch()
    },
    page () {
      this.$fetch()
    },
    per_page () {
      this.$fetch()
    },
    verified_only () {
      this.$fetch()
    }
  },
  methods: {
    attachRole (id, role) {
      const data = {
        user_id: id,
        role_name: role
      }
      this.$swal.fire(
        'Synciing..',
        `Syncing Role ${role} for user id : ${id}`,
        'info'
      )
      this.$axios.post('/auth/roles/attach', data).then((response) => {
        this.$swal.fire(
          'success',
          response.data.message,
          'success'
        )
      }).finally(() => {
        this.$fetch()
      })
    },
    verify (id) {
      const data = {
        user_id: id
      }
      this.$axios.post('/admin/accounts/verify', data).then((response) => {
        this.$toast.success(response.data.message)
      }).finally(() => {
        this.$fetch()
      })
    }
  }
}
</script>
