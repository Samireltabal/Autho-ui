<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-card>
        <v-row class="px-2 py-2">
          <v-col cols="9">
            <v-text-field
              v-model="title"
              label="Post Title"
              hint="Post Title that is shown"
              solo
              persistent-hint
              outlined
              flat
            />
            <tiptap-vuetify
              v-model="content"
              :extensions="extensions"
            />
          </v-col>
          <v-col cols="3">
            <v-row>
              <v-col>
                <span>Featured Images :</span>
                <vue-core-image-upload
                  :class="['v-btn', 'v-size--small', 'indigo', 'theme--dark', 'v-btn--block', 'my-2']"
                  :crop="false"
                  :data="data"
                  text="Upload Featured Image"
                  is-xhr
                  :headers="uploadHeader"
                  :max-file-size="5242880"
                  :url="mediaUploadUrl"
                  @imageuploaded="imageuploaded"
                />
                <span>Category :</span>
                <v-select
                  v-model="category_id"
                  label="Categories"
                  class="my-1"
                  :items="categories"
                  item-text="text"
                  item-value="value"
                  solo
                  outlined
                  flat
                />
                <span>Tags :</span>
                <v-select
                  v-model="selected_tags"
                  label="Tags"
                  class="my-1"
                  multiple
                  :items="categories"
                  item-text="text"
                  item-value="text"
                  solo
                  outlined
                  flat
                />
              </v-col>
              <v-col cols="12">
                <v-btn color="primary" small block>
                  Submit
                </v-btn>
              </v-col>
            </v-row>
            <pre>
          {{ form }}
          </pre>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
import VueCoreImageUpload from 'vue-core-image-upload'

export default {
  name: 'NewPost',
  components: { TiptapVuetify, VueCoreImageUpload },
  layout: 'admin',
  data () {
    return {
      title: null,
      text: null,
      data: {},
      category_id: null,
      selected_tags: [],
      categories: [
        { text: 'Cat 1', value: 1 },
        { text: 'Cat 2', value: 2 },
        { text: 'Cat 4', value: 3 }
      ],
      tags: [
        'post',
        'php',
        'laravel'
      ],
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ],
      // starting editor's content
      content: `
      <h1>Yay Headlines!</h1>
      <p>All these <strong>cool tags</strong> are working now.</p>
      <hr>
      <p>hello world this is my first blog .. </p>
      <hr>
      <p>links are <a href="https://synciteg.xyz" rel="noopener noreferrer nofollow">here</a></p>
      <blockquote><p>Quotes are accepted </p></blockquote>
    `
    }
  },
  computed: {
    form () {
      return {
        title: this.title,
        content: this.content,
        selected_tags: this.selected_tags,
        category_id: this.category_id
      }
    },
    uploadHeader () {
      return {
        Accept: 'application/json',
        Authorization: this.$auth.strategy.token.get()
      }
    },
    mediaUploadUrl () {
      return process.env.NUXT_ENV_BASE_URL + 'blog/media/upload'
    }
  },
  watch: {
  },
  methods: {
    imageuploaded () {
      this.$swal.fire(
        'ok',
        'uploaded',
        'success'
      )
    }
  }
}
</script>
