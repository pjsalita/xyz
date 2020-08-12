import Vue from 'vue'
import axios from 'axios'
import NProgress from 'nprogress'
import config from '@/config'

const http = axios.create({
  baseURL: config.apiUrl
})

http.interceptors.request.use(config => {
  NProgress.start()
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('api_token')

  return config
})

http.interceptors.response.use(response => {
  handleResponse({ response: response, success: true })
  return response
}, error => {
  handleResponse({ response: error.response, success: false })
  return Promise.reject(error)
})

const validateErrors = (errors) => {
  errors = Object.values(errors)
  errors = errors.flat()

  return errors
}

const handleResponse = (data) => {
  NProgress.done()
  Vue.$toast.clear()

  if(data.success) {
    if (data.response.data.message) Vue.$toast.open({ type: 'success', message: data.response.data.message })
  }else {
    if (data.response.data.errors) {
      Vue.$toast.open({ type: 'error', message: validateErrors(data.response.data.errors).join() })
    }else if (data.response.status === 401) {
      localStorage.removeItem('api_token')
      window.location.replace('/login')

      Vue.$toast.open({ type: 'error', message: data.response.data.message })
    }else {
      Vue.$toast.open({ type: 'error', message: data.response.data.message })
    }
  }
}

export default http
