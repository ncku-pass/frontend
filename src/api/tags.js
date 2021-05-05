import { req } from './https'

export const getTags = () => {
  return req.get('/tags/')
}

export const addTag = (newTag) => {
  return req.post('/tags/', [newTag])
}

export const getTag = async (tagId) => {
  return req.get(`/tags/${tagId}`)
}

export const updateTag = async (tagId, data) => {
  return req.put(`/tags/${tagId}`, {
    data
  })
}

export const deleteTag = async (tagId) => {
  return req.delete(`/tags/${tagId}`)
}
