import { experiencesRequest as req } from './https'

req.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('auth')}`
  return config
}, function (error) {
  return Promise.reject(error)
})

export const getExperiences = () => {
  return req.get('/')
}

export const getExperience = async (experienceId) => {
  return req.get(`/${experienceId}`)
}

export const addExperience = (data) => {
  return req.post('/', data)
}

export const updateExperience = async (experienceId, data) => {
  return req.put(`/${experienceId}`, data)
}

export const deleteExperience = async (experienceId) => {
  return req.delete(`/${experienceId}`)
}

export const getExperienceTags = async (experienceId) => {
  return req.get(`/${experienceId}/Tags`)
}
