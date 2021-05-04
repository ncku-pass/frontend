import axios from 'axios'
import useAuth from '@/composables/useAuth'
const { logout } = useAuth()

// axios.defaults.timeout = 15000
// const baseURL = 'https://e-portfolio-ncku.herokuapp.com/api'

const errorHandler = ({ status, data }) => {
  switch (status) {
    case 400:
      console.error(data)
      break
    case 401:
      console.error(data)
      // 若出現未授權的情況則把使用者登出
      logout()
      break
    case 403:
      console.error(data)
      break
    case 404:
      console.error(data)
      break
    default:
      console.error(data)
  }
}

export const req = axios.create({
  baseURL: 'https://e-portfolio-ncku.herokuapp.com/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000
})

// 送出請求時加上JWT Token
req.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('auth')}`
  return config
}, function (error) {
  return Promise.reject(error)
})

// 收到Response時，檢查status code
req.interceptors.response.use(function (response) {
  return response
}, function (error) {
  errorHandler(error.response)
  return Promise.reject(error)
})

// export const experiencesRequest = axios.create({
//   baseURL: `${baseURL}/experiences`
// })

// export const tagsRequest = axios.create({
//   baseURL: `${baseURL}/tags`
// })

// export const authRequest = axios.create({
//   baseURL: `${baseURL}/auth`
// })
