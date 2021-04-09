import { tagsRequest as req } from './https'

export const getTags = () => {
  return req.get('/')
}

export const addTag = (data) => {
  return req.post('/', {
    data
  })
}

export const getTag = async (tagId) => {
  return req.get(`/${tagId}`)
}

export const updateTag = async (tagId, data) => {
  return req.put(`/${tagId}`, {
    data
  })
}

export const deleteTag = async (tagId) => {
  return req.delete(`/${tagId}`)
}
