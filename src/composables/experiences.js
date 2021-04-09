import { useRequest } from './useRequest'
import * as api from '@/api/experiences'

export const useGetExperiences = () => {
  return useRequest(api.getExperiences)
}
export const useGetExperience = () => {
  return useRequest(api.getExperience)
}
export const useAddExperience = () => {
  return useRequest(api.addExperience)
}
export const useUpdateExperience = () => {
  return useRequest(api.updateExperience)
}
export const useDeleteExperience = () => {
  return useRequest(api.deleteExperience)
}
export const useGetExperienceTags = () => {
  return useRequest(api.getExperienceTags)
}
