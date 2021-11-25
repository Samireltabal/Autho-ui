<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h3>Menu Manager</h3>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'admin',
  head: {
    title: 'Menu Manager',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
</script>
