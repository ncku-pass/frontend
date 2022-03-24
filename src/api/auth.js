// import { authRequest as req } from './https'
import { req } from './https'

export const login = ({ studentId, password }) => {
  return req.post('/auth/login', {
    studentId,
    password
  })
}

export const checkNCKULogin = ({ key, keyval }) => {
  return req.post('/auth/ncku-login', {
    key,
    keyval
  })
}

export const register = ({
  email,
  name,
  password,
  confirmPassword,
  studentId,
  major,
  graduationYear
}) => {
  return req.post('/auth/register', {
    email,
    name,
    password,
    confirmPassword,
    studentId,
    major,
    graduationYear
  })
}

export const checkToken = () => {
  return req.post('/auth/check-token')
}
