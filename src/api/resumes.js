import { req } from './https'

export const getResumes = () => {
  return req.get('/resumes/')
}

export const saveResume = (resumeId, data) => {
  return req.post(`/resumes/${resumeId}/Save`, data)
}
