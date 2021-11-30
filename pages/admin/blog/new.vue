<template>
  <v-row align="center" justify="center">
    <v-col cols="9">
      <v-text-field
        v-model="title"
        label="Post Title"
        hint="Post Title that is shown"
        solo
        outlined
        flat
      />
      <Vueditor />
    </v-col>
    <v-col cols="3">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis vel asperiores obcaecati quod natus laudantium nam, repudiandae porro suscipit culpa debitis quas explicabo maiores exercitationem, et libero accusamus incidunt? Nemo?
      <pre>
        {{ form }}
      </pre>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'NewPost',
  layout: 'admin',
  data () {
    return {
      title: null,
      text: null
    }
  },
  computed: {
    form () {
      return document.getElementById('editorInstance')
    }
  },
  watch: {
    form (val) {
      console.log(val)
    }
  }
}
</script>
