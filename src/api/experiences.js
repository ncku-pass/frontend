// import { experiencesRequest as req } from './https'
import { req } from './https'

// req.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('auth')}`
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

export const getExperiences = () => {
  return req.get('/experiences/')
}

export const getExperience = async (experienceId) => {
  return req.get(`/experiences/${experienceId}`)
}

export const addExperience = (data) => {
  return req.post('/experiences/', data)
}

export const updateExperience = async (experienceId, data) => {
  return req.put(`/experiences/${experienceId}`, data)
}

export const deleteExperience = async (experienceId) => {
  return req.delete(`/experiences/${experienceId}`)
}

export const getExperienceTags = async (experienceId) => {
  return req.get(`/experiences/${experienceId}/Tags`)
}
