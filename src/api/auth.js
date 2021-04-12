import { authRequest as req } from './https'

export const login = ({ studentId, password }) => {
  return req.post('/login', {
    studentId, password
  })
}

export const register = async ({ email, name, password, confirmPassword, studentId, major, graduationYear }) => {
  return req.post('/register', {
    email, name, password, confirmPassword, studentId, major, graduationYear
  })
}
