import axios from 'axios'

axios.defaults.timeout = 7000

const baseURL = 'http://139.162.83.11:5001/api'

export const experiencesRequest = axios.create({
  baseURL: `${baseURL}/Experiences`
})

export const tagRequest = axios.create({
  baseURL: `${baseURL}/Tags`
})
