import { auth } from '@/api'

const state = () => ({
  requesting: false,
  user: !!localStorage.getItem('api_token'),
  isLoggedIn: !!localStorage.getItem('api_token')
})

const getters = {
  requesting: state => state.requesting,
  user: state => state.user,
  isLoggedIn: state => state.isLoggedIn
}

const actions = {
  login({ commit }, data) {
    commit('LOGIN_REQUEST', data)

    return new Promise(resolve => {
      auth.login(data)
        .then(response => {
          localStorage.setItem('api_token', response.data.token)

          commit('LOGIN_SUCCESS', response.data.user)
          resolve(response)
        })
        .catch(error => commit('LOGIN_FAILURE', error.toString()))
    })
  },
  logout({ commit }) {
    commit('LOGOUT_REQUEST')

    return new Promise(resolve => {
      auth.logout()
        .then(response => {
          localStorage.removeItem('api_token')

          commit('LOGOUT_SUCCESS')
          resolve(response)
        })
        .catch(error => commit('LOGOUT_FAILURE', error.toString()))
    })
  },
  user({ commit }) {
    return new Promise(resolve => {
      auth.user()
        .then(response => {
          commit('LOGIN_SUCCESS', response.data)
          resolve(response)
        })
        .catch(error => commit('LOGIN_FAILURE', error.toString()))
    })
  },
  register({ commit }, data) {
    commit('REGISTER_REQUEST', data)

    return new Promise(resolve => {
      auth.register(data)
        .then(response => {
          localStorage.setItem('api_token', response.data.token)

          commit('REGISTER_SUCCESS', response.data.user)
          resolve(response)
        })
        .catch(error => commit('REGISTER_FAILURE', error.toString()))
    })
  },
}

const mutations = {
  LOGIN_REQUEST: (state, data) => state.requesting = true,
  LOGIN_SUCCESS: (state, user) => { state.isLoggedIn = true, state.requesting = false, state.user = user },
  LOGIN_FAILURE: (state, error) => state.requesting = false,

  LOGOUT_REQUEST: state => state.requesting = true,
  LOGOUT_SUCCESS: state => { state.isLoggedIn = false, state.requesting = false, state.user = null },
  LOGOUT_FAILURE: (state, error) => state.requesting = false,

  REGISTER_REQUEST: (state, data) => state.requesting = true,
  REGISTER_SUCCESS: (state, user) => { state.isLoggedIn = true, state.requesting = false, state.user = user },
  REGISTER_FAILURE: (state, error) => state.requesting = false,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
