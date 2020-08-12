import Vue from 'vue'
import Router from 'vue-router'
import GeneralRoutes from '@/router/general'
import NProgress from 'nprogress'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    ...GeneralRoutes,
  ]
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
