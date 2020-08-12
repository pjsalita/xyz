import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import figlet from './modules/figlet'
import { createLogger } from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    authentication,
    figlet
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
