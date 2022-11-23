import { createStore, createLogger } from 'vuex'
import auth from './auth'
import tags from './tags'
import resumes from './resumes'
import experiences from './experiences'
import expQuickEdit from './expQuickEdit'

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
    experiences,
    expQuickEdit,
  },
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})
