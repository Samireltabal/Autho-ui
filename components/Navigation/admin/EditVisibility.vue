<template>
  <span>
    <v-chip v-if="!editing" color="indigo" dark>
      {{ item.visibility_level }}
      <v-btn icon text color="white" @click="editing = true">
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
    </v-chip>
    <v-select
      v-else
      v-model="visibility_level"
      label="Order"
      :items="levels"
      item-text="text"
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
  name: 'EditVisibility',
  props: {
    item: {
      required: true,
      type: [Array, Object]
    },
    levels: {
      required: true,
      type: [Array, Object]
    }
  },
  data () {
    return {
      editing: false,
      visibility_level: String
    }
  },
  computed: {
    form () {
      return {
        id: this.item.id,
        visibility_level: this.visibility_level
      }
    }
  },
  created () {
    this.visibility_level = this.item.visibility_level
  },
  methods: {
    submitOrder () {
      this.$axios.post('menus/item/level', this.form).then(() => {
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
