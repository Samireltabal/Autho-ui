<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="12">
      <v-breadcrumbs
        divider="/"
        :items="[
          {text: 'Home', disabled: false, href: '/'},
          {text: 'Admin Panel', disabled: false, href: '/admin'},
          {text: 'Menus', disabled: false, href: '/admin/menu'},
          {text: menu.menu_name, disabled: true, href: '/'}
        ]"
      />
    </v-col>
    <v-col cols="8">
      <v-row>
        <v-col cols="12">
          <v-data-table
            :items="menu.items"
            :headers="table_headers"
          >
            <template #[`item.options`]="{ item }">
              <v-btn icon small color="indigo" @click="viewItem(item.slug)">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
              <v-btn icon small color="error" @click="deleteItem(item.id)">
                <v-icon>mdi-link-variant-remove</v-icon>
              </v-btn>
            </template>
            <template #[`item.visibility_level`]="{ item }">
              <edit-visibility
                :item="item"
                :levels="levels"
                @finished="$fetch()"
              />
            </template>
            <template #[`item.order`]="{ item }">
              <EditOrder :item="item" @finished="$fetch()" />
            </template>
            <template #[`item.ParentName`]="{ item }">
              <edit-parent :item="item" :parent-name="item.ParentName" :menu-items="menu.items" @finished="$fetch()" />
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4">
      <h3 class="my-2">
        Create New Menu
      </h3>
      <v-form>
        <v-text-field
          v-model="text"
          label="Menu item text"
          dense
          hint="Menu item visibile text"
          :error="handleValidationErrors('text').has_error"
          :rules="[! handleValidationErrors('text').has_error || handleValidationErrors('text').message]"
          solo
          flat
          persistent-hint
          outlined
        />
        <v-text-field
          v-model="route"
          label="Route"
          dense
          hint="Route that clicking link moves you to"
          :error="handleValidationErrors('route').has_error"
          :rules="[! handleValidationErrors('route').has_error || handleValidationErrors('route').message]"
          solo
          flat
          persistent-hint
          outlined
        />
        <v-text-field
          v-model="custom_class"
          label="Custom class"
          dense
          hint="custom class for the menu item"
          solo
          persistent-hint
          flat
          outlined
        />
        <v-select
          v-model="icon_family"
          label="Icon Group"
          dense
          hint="Icon Group used for this menu"
          solo
          persistent-hint
          flat
          outlined
          :items="groups"
          item-text="text"
          item-value="value"
        />
        <v-select
          v-model="icon_name"
          label="Menu Icon"
          dense
          hint="Icon used for this menu"
          solo
          clearable
          persistent-hint
          flat
          outlined
          :items="icons"
          :prepend-inner-icon="`${icon_family}-${icon_name}`"
          item-text="text"
          item-value="value"
        />
        <v-select
          v-model="type"
          label="Menu type"
          dense
          hint="type of the menu item"
          solo
          clearable
          persistent-hint
          flat
          outlined
          :items="types"
        />
        <v-select
          v-model="visibility_level"
          label="Visibility Level"
          dense
          hint="For Who this item will be visible"
          solo
          clearable
          persistent-hint
          flat
          outlined
          :items="levels"
        />
        <v-select
          v-model="parent_id"
          label="Parent Menu"
          dense
          hint="Parent Item of the created item"
          solo
          clearable
          persistent-hint
          item-text="text"
          item-value="id"
          flat
          outlined
          :items="menu.items"
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
import EditOrder from '../../../components/Navigation/admin/EditOrder.vue'
import EditParent from '../../../components/Navigation/admin/EditParent.vue'
import EditVisibility from '../../../components/Navigation/admin/EditVisibility.vue'
export default {
  name: 'SingleMenu',
  components: {
    EditOrder,
    EditParent,
    EditVisibility
  },
  layout: 'admin',
  data () {
    return {
      loading: false,
      text: null,
      route: null,
      custom_class: null,
      parent_id: null,
      type: 'link',
      icon_family: 'mdi',
      visibility_level: 'all',
      icon_name: 'cog',
      menus: [],
      Errors: [],
      menu: {},
      icons: [],
      groups: [],
      types: [],
      levels: [],
      table_headers: [
        { text: 'id', value: 'id' },
        { text: 'name', value: 'text' },
        { text: 'route', value: 'route' },
        { text: 'parent', value: 'ParentName' },
        { text: 'type', value: 'type' },
        { text: 'visibility', value: 'visibility_level' },
        { text: 'Order', value: 'order' },
        { text: 'options', value: 'options' }
      ]
    }
  },
  async fetch () {
    this.loading = true
    this.menu = await this.$axios.$get(`/menus/show/${this.slug}`)
    this.menus = await this.$axios.$get('/menus/list')
    this.icons = await this.$axios.$get('/menus/icons/list')
    this.groups = await this.$axios.$get('/menus/icons/groups/list')
    this.types = await this.$axios.$get('/menus/types/list')
    this.levels = await this.$axios.$get('/menus/levels/list')
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
  computed: {
    slug () {
      return this.$route.params.slug
    },
    itemForm () {
      return {
        text: this.text,
        route: this.route,
        class: this.custom_class,
        icon_name: this.icon_name,
        icon_family: this.icon_family,
        parent_id: this.parent_id,
        menu_id: this.menu.id,
        visibility_level: this.visibility_level,
        type: this.type
      }
    }
  },
  methods: {
    addMenu () {
      this.$axios.post('/menus/create/item', this.itemForm).then(() => {
        this.text = null
        this.route = null
        this.custom_class = null
        this.icon_name = null
        this.icon_family = 'mdi'
        this.parent_id = null
        this.type = 'link'
        this.Errors = []
        this.$fetch()
      }).catch((err) => {
        this.Errors = err.response.data.errors
      })
    },
    viewItem (slug) {
      const uri = `/menus/show/${slug}`
      this.$axios.get(uri).then(() => {
        this.$fetch()
      })
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
          const uri = `/menus/delete/item/${slug}`
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
