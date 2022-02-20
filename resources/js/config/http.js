import axios from 'axios'
import { removeToken } from '../utils/auth'
import { getToken } from '../utils/auth'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 360000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// request interceptor
http.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
http.interceptors.response.use(
  response => {
    // Token expired
    if (response.status === 401) {
      setTimeout(() => {
        removeToken()
      }, 4000)
      return Promise.reject(new Error(response.message || 'Error'))
    }
    return response
  },
  error => {
    if (error.response && error.response.status && (error.response.status === 401)) {
      setTimeout(() => {
        removeToken()
      }, 4000)
    }
    return Promise.reject(error)
  }
)

export { http }
