<template>
  <span>
    <v-chip v-if="!editing" color="indigo" dark>
      {{ parentName ? parentName : null }}
      <v-btn icon text color="white" @click="editing = true">
        <v-icon>mdi-playlist-edit</v-icon>
      </v-btn>
    </v-chip>
    <v-select
      v-else
      v-model="parent_id"
      label="Order"
      :items="menuItems"
      item-text="text"
      clearable
      item-value="id"
      append-icon="mdi-check"
      prepend-inner-icon="mdi-cancel"
      @click:prepend-inner="cancelEdit"
      @click:append="submitOrder()"
    />
  </span>
</template>
<script>
export default {
  name: 'EditParent',
  props: {
    item: {
      required: true,
      type: [Array, Object]
    },
    menuItems: {
      required: true,
      type: [Array, Object]
    },
    parentName: {
      required: false,
      default: null,
      type: [String]
    }
  },
  data () {
    return {
      editing: false,
      parent_id: Number
    }
  },
  computed: {
    form () {
      return {
        id: this.item.id,
        parent_id: this.parent_id
      }
    }
  },
  created () {
    this.parent_id = this.item.parent_id
  },
  methods: {
    submitOrder () {
      this.$axios.post('menus/item/parent', this.form).then(() => {
        this.$swal.fire(
          'Order Updated',
          `Updated ${this.item.text} to parent ${this.parent_id}`,
          'success'
        )
        this.editing = false
        this.$emit('finished')
      }).catch((err) => {
        this.$swal.fire(
          'Something Went Wrong',
          err.response.data.message,
          'error'
        )
      })
    },
    cancelEdit () {
      this.$swal.fire('canceled', 'canceled', 'error')
      this.parent_id = this.item.parent_id
      this.editing = false
    }
  }
}
</script>
