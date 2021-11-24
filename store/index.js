const store = {
  state: () => ({
    isLogged: false,
    token: '',
    user: {},
    isLoading: false
  }),
  mutations: {
    login (state) {
      state.isLogged = true
    },
    logout (state) {
      state.isLogged = false
    },
    setUser (state, user) {
      state.user = user
    },
    clearUser (state) {
      state.user = {}
      state.token = null
    },
    Loading (state, loading) {
      state.isLoading = loading
    },
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
    login (context) {
      context.commit('login')
    },
    logout (context) {
      context.commit('logout')
      context.commit('clearUser')
    },
    setToken (context, token) {
      context.commit('setToken', token)
    },
    setUser (context, user) {
      context.commit('setUser', user)
    },
    Loading (context, loading) {
      context.commit('Loading', loading)
    }
  }
}
export default store
