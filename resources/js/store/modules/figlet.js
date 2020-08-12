import { figlet } from '@/api'

const state = () => ({
  requesting: false
})

const getters = {
  requesting: state => state.requesting
}

const actions = {
  process({ commit }, data) {
    commit('FIGLET_REQUEST', data)

    return new Promise(resolve => {
      figlet.process(data)
        .then(response => {
          commit('FIGLET_SUCCESS', response.data.output)
          resolve(response)
        })
        .catch(error => commit('FIGLET_FAILURE', error.toString()))
    })
  }
}

const mutations = {
  FIGLET_REQUEST: (state, data) => state.requesting = true,
  FIGLET_SUCCESS: (state, data) => state.requesting = false,
  FIGLET_FAILURE: (state, error) => state.requesting = false,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
