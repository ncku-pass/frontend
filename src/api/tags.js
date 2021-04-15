import { tagsRequest as req } from './https'

req.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('auth')}`
  return config
}, function (error) {
  return Promise.reject(error)
})

export const getTags = () => {
  return req.get('/')
}

export const addTag = (newTag) => {
  return req.post('/', [newTag])
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
