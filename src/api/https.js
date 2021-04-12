import axios from 'axios'

axios.defaults.timeout = 7000
axios.defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmJmIjoxNjE4MjA2NTY5LCJleHAiOjE2MTgyOTI5NjksImlzcyI6ImVwb3J0Zm9saW8ubmNrdS5lZHUudHciLCJhdWQiOiJlcG9ydGZvbGlvLm5ja3UuZWR1LnR3In0.-JA1yaakuJNXCTY4eMTsH_mI09u1mBucMRqyAN-TQbQ'

const baseURL = 'http://139.162.83.11:5003/api'

export const experiencesRequest = axios.create({
  baseURL: `${baseURL}/experiences`
})

export const tagRequest = axios.create({
  baseURL: `${baseURL}/tags`
})

export const authRequest = axios.create({
  baseURL: `${baseURL}/auth`
})
