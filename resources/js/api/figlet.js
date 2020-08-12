import http from '@/utils/service.js'

export default {
  process(data) {
    return http.get(`/${data.input}?direction=${data.direction}&size=${data.size}`)
  }
}
