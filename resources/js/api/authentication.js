import http from '@/utils/service.js'

export default {
  login(data) {
    return http.post('/login', data)
  },
  register(data) {
    return http.post('/register', data)
  },
  logout() {
    return http.get('/logout')
  },
  user() {
    return http.get('/user')
  }
}
