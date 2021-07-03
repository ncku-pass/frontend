import { createStore, createLogger } from 'vuex'
import auth from './auth'
import tags from './tags'
import resumes from './resumes'
import experiences from './experiences'

export default createStore({
  state: () => ({
  }),
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    tags,
    resumes,
    experiences
  },
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})
