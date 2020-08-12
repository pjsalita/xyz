import store from '@/store'

export function AuthGuard (to, from, next) {
  if (!store.getters['authentication/isLoggedIn']) return next('/login')
  next()
}

export function GuestGuard (to, from, next) {
  if (store.getters['authentication/isLoggedIn']) return next('/')
  next()
}
