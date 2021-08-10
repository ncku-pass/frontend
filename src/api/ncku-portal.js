import { req } from './https'

export const getNCKUExperiences = ({ key, keyval, type = 'all' }) => {
  return req.post('/ncku-portal/experiences', {
    key,
    keyval
  }, {
    params: {
      type
    }
  })
}
