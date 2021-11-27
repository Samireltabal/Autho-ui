<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="12">
      <v-breadcrumbs
        divider="/"
        :items="[
          {text: 'Home', disabled: false, href: '/'},
          {text: 'Admin Panel', disabled: false, href: '/admin'},
          {text: 'Menus', disabled: true, href: '/admin/menu'}
        ]"
      />
    </v-col>
    <v-col cols="12" sm="12" md="12" lg="12">
      <h3>Menu Manager</h3>
    </v-col>
    <v-col cols="8">
      <v-data-table
        dense
        :items="menus"
        :headers="table_headers"
      >
        <template #[`item.options`]="{ item }">
          <v-btn icon small color="indigo" @click="viewItem(item.slug)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn icon small color="error" @click="deleteItem(item.slug)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon small :color="item.active ? 'warning' : 'success'" @click="item.active ? disableItem(item.slug) : enableItem(item.slug)">
            <v-icon>mdi-publish-off</v-icon>
          </v-btn>
        </template>
        <template #[`item.active`]="{ item }">
          <v-icon :color="item.active ? 'green' : 'red' ">
            mdi-circle
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="4">
      <h3 class="my-2">
        Create New Menu
      </h3>
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
      <v-form>
        <v-text-field
          v-model="menu_name"
          label="Menu Name"
          hint="Unique Menu Name"
          :error="handleValidationErrors('menu_name').has_error"
          :error-message="handleValidationErrors('menu_name').has_error ? handleValidationErrors('menu_name').message : ''"
          solo
          persistent-hint
          outlined
        />
        <v-select
          v-model="component_name"
          label="Component Name"
          hint="Component Name Used in front end"
          solo
          persistent-hint
          flat
          clearable
          :error="handleValidationErrors('component_name').has_error"
          :error-message="handleValidationErrors('component_name').has_error ? handleValidationErrors('component_name').message : ''"
          outlined
          :items="components"
        />
        <v-checkbox
          v-model="menu_state"
          label="Active"
          hint="Active Status For Menu"
          persistent-hint
        />
        <v-btn class="mt-2 rounded-0" color="success" block :loading="loading" @click="addMenu()">
          <v-icon class="mx-1">
            mdi-plus
          </v-icon> Add Menu
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Menus',
  layout: 'admin',
  data () {
    return {
      loading: false,
      menu_name: null,
      component_name: null,
      menu_state: null,
      menus: [],
      components: [],
      Errors: [],
      icons: [],
      groups: [],
      table_headers: [
        { text: 'id', value: 'id' },
        { text: 'name', value: 'menu_name' },
        { text: 'slug', value: 'slug' },
        { text: 'component', value: 'component_name' },
        { text: 'status', value: 'active' },
        { text: 'options', value: 'options' }
      ]
    }
  },
  async fetch () {
    this.loading = true
    this.menus = await this.$axios.$get('/menus/list')
    this.components = await this.$axios.$get('/menus/components/list')
    this.groups = await this.$axios.$get('/menus/icons/groups/list')
    this.loading = false
  },
  head: {
    title: 'Menu Manager',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  },
  methods: {
    addMenu () {
      this.loading = true
      const data = {
        menu_name: this.menu_name,
        active: this.menu_state,
        component_name: this.component_name
      }
      this.$axios.post('/menus/create', data).then(() => {
        this.menu_name = null
        this.menu_state = true
        this.component_name = null
        this.Errors = []
        this.$fetch()
      }).catch((err) => {
        this.Errors = err.response.data.errors
      }).finally(() => {
        this.loading = false
      })
    },
    viewItem (slug) {
      const uri = `/admin/menu/${slug}`
      this.$router.push(uri)
    },
    deleteItem (slug) {
      this.$swal.fire({
        title: 'هل انت متأكد ؟',
        text: 'لن تتمكن من إستعادة البيانات المحذوفة',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'نعم احذف',
        cancelButtonText: 'الغاء الامر'
      }).then((result) => {
        if (result.isConfirmed) {
          const uri = `/menus/delete/${slug}`
          this.$axios.get(uri).then(() => {
            this.$fetch()
            this.$swal.fire({
              title: 'تم الحذف بنجاح',
              text: 'نجاح العلية',
              icon: 'success'
            })
          })
        } else {
          this.$swal.fire({
            title: 'تم الالغاء',
            text: 'تم الغاء الامر',
            icon: 'warning'
          })
        }
      })
    },
    enableItem (slug) {
      const uri = `/menus/enable/${slug}`
      this.$axios.get(uri).then(() => {
        this.$fetch()
      })
    },
    disableItem (slug) {
      const uri = `/menus/disable/${slug}`
      this.$axios.get(uri).then(() => {
        this.$fetch()
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
