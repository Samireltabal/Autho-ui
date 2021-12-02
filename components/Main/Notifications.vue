<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon :color="user.unread_notifications.length ? 'success' : ''">
          {{ user.unread_notifications.length ? 'mdi-bell-badge' : 'mdi-bell' }}
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        notifications
      </v-list-item>
      <v-divider />
      <v-list-item v-if="!user.unread_notifications.length" class="text-center">
        no new notifications
      </v-list-item>
      <!-- Profile -->
      <v-list-item v-for="notification in user.notifications" :key="notification.id" link :color="notification.read_at ? '' : 'success'" @click="markSingleAsRead(notification.id)">
        <v-list-item-icon class="me-2">
          <v-avatar size="22">
            <v-img :src="notification.data.user_avatar" />
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ notification.data.message }}</v-list-item-title>
          <small>{{ $luxon(notification.created_at) }}</small>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn text icon @click="markSingleAsRead(notification.id)">
            <v-icon>
              {{ notification.read_at ? '' : 'mdi-circle-small' }}
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <v-btn text @click="markAllAsRead">
            mark all as read
          </v-btn>
          <v-btn text @click="deleteAll">
            <v-icon>mdi-delete</v-icon> delete all
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'Notifications',
  data () {
    return {
    }
  },
  computed: {
    user () {
      const data = {
        unread_notifications: [],
        notifications: []
      }
      return this.$auth.user ? this.$auth.user : data
    }
  },
  methods: {
    markAllAsRead () {
      this.$axios.get('/auth/notifications/markasread').then(() => {
        this.$auth.fetchUser()
      })
    },
    markSingleAsRead (id) {
      this.$axios.get(`/auth/notifications/markasread/${id}`).then(() => {
        this.$auth.fetchUser()
      })
    },
    deleteAll () {
      this.$axios.get('/auth/notifications/delete').then(() => {
        this.$auth.fetchUser()
      })
    }
  }
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
