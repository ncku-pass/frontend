// import { authRequest as req } from './https'
import { req } from './https'

export const login = ({ studentId, password }) => {
  return req.post('/auth/login', {
    studentId,
    password
  })
}

export const register = async ({
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

export const checkToken = async () => {
  return req.post('/auth/check-token')
}
