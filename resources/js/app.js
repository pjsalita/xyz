import Vue from 'vue'
import router from './router'
import store from './store'
import App from './layouts/App'
import '@/utils/validations'
import VueToast from 'vue-toast-notification'

Vue.use(VueToast)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
