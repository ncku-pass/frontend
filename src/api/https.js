import axios from 'axios'

axios.defaults.timeout = 7000
// axios.defaults.headers.common.Authorization = `Bearer ${process.env.VUE_APP_AUTHORIZATION_TOKEN}`
// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('auth')}`

// const baseURL = 'http://139.162.83.11:5003/api'
const baseURL = 'https://e-portfolio-ncku.herokuapp.com/api'

export const experiencesRequest = axios.create({
  baseURL: `${baseURL}/experiences`
})

export const tagsRequest = axios.create({
  baseURL: `${baseURL}/tags`
})

export const authRequest = axios.create({
  baseURL: `${baseURL}/auth`
})
