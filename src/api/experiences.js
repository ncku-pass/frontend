import { req } from './https'

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
