import { req } from './https'

export const getNCKUExperiences = ({ key, keyVal, type }) => {
  return req.post('​/ncku-protal​/experiences', {
    key,
    keyVal,
    type
  })
}
