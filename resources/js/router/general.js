import { AuthGuard, GuestGuard } from '@/router/guards'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import NotFound from '@/pages/NotFound'

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: AuthGuard
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: GuestGuard
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: GuestGuard
  },
  { path: '/404', name: '404', component: NotFound },
  { path: '*', redirect: '/404' },
]
