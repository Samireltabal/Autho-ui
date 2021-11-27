<template>
  <span>
    <v-chip v-if="!editing" color="indigo" dark>
      {{ item.order }}
      <v-btn icon text color="white" @click="editing = true">
        <v-icon>mdi-playlist-edit</v-icon>
      </v-btn>
    </v-chip>
    <v-text-field
      v-else
      v-model="order"
      label="Order"
      append-icon="mdi-check"
      prepend-inner-icon="mdi-cancel"
      @click:prepend-inner="cancelEdit"
      @click:append="submitOrder()"
    />
  </span>
</template>
<script>
export default {
  name: 'EditOrder',
  props: {
    item: {
      required: true,
      type: [Array, Object]
    }
  },
  data () {
    return {
      editing: false,
      order: Number
    }
  },
  computed: {
    form () {
      return {
        id: this.item.id,
        order: this.order
      }
    }
  },
  created () {
    this.order = this.item.order
  },
  methods: {
    submitOrder () {
      this.$axios.post('menus/item/order', this.form).then(() => {
        this.$swal.fire(
          'Order Updated',
          `Updated ${this.item.text} to Order ${this.order}`,
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
      this.order = this.item.order
      this.editing = false
    }
  }
}
</script>
