import axios from 'axios'
import useAuth from '@/composables/useAuth'
const { logout, tokenStr } = useAuth()

const errorHandler = (error) => {
  if (error.response) {
    // 有收到回應，但後端回覆 > 300
    const { status } = error.response

    switch (status) {
      // 若出現未授權的情況則把使用者登出
      case 401:
        console.error(error.response)
        logout()
        break
      default:
        console.error(error.response)
    }
  } else if (error.request) {
    // 沒有收到回應
    if (error?.code === 'ECONNABORTED') {
      console.error('請求時間過長，取消請求')
    }
  } else {
    // 送出請求之前就遇到錯誤了
    console.error('請求沒有送出：', error.message)
  }
}

export const req = axios.create({
  baseURL: 'https://e-portfolio-ncku-dev.herokuapp.com/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000
})

// 送出請求時加上Auth Token
req.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${tokenStr.value}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 收到Response時，檢查status code
req.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    errorHandler(error)
    return Promise.reject(error)
  }
)
