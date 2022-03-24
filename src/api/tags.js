import { req } from './https'

export const getTags = () => {
  return req.get('/tags/')
}

export const addTag = (newTag) => {
  return req.post('/tags/', [newTag])
}

export const getTag = (tagId) => {
  return req.get(`/tags/${tagId}`)
}

export const updateTag = (tagId, data) => {
  return req.put(`/tags/${tagId}`, {
    data
  })
}

export const deleteTag = (tagId) => {
  return req.delete(`/tags/${tagId}`)
}

export const searchTag = (name) => {
  return req.get('/tags/search', {
    params: {
      name
    }
  })
}
