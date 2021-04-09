import { useRequest } from './useRequest'
import * as api from '@/api/tags'

export const useGetTags = () => {
  return useRequest(api.getTag)
}
export const useGetTag = () => {
  return useRequest(api.getTag)
}
export const useAddTag = () => {
  return useRequest(api.addTag)
}
export const useUpdateTag = () => {
  return useRequest(api.updateTag)
}
export const useDeleteTag = () => {
  return useRequest(api.deleteTag)
}
