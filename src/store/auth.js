import router from '@/router/index';
import {
  login as loginAPI,
  register as registerAPI,
  checkToken as checkTokenAPI,
  checkNCKULogin as checkNCKULoginAPI
} from '@/api/auth';

const auth = {
  namespaced: true,
  state: () => ({
    tokenStr: localStorage.getItem('auth') || '',
    key: localStorage.getItem('key') || '',
    keyval: localStorage.getItem('keyval') || '',
    error: null,
    isPending: false
  }),
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenStr = token;
      localStorage.setItem('auth', token);
    },
    SET_NCKU_AUTH_KEY(state, { key = '', keyval = '' } = {}) {
      state.key = key;
      state.keyval = keyval;
      localStorage.setItem('key', key);
      localStorage.setItem('keyval', keyval);
    },
    LOGOUT(state) {
      state.tokenStr = '';
      state.key = '';
      state.keyval = '';
      localStorage.removeItem('auth');
      localStorage.removeItem('key');
      localStorage.removeItem('keyval');
    },
    SET_STATUS(state, { error = undefined, isPending = undefined }) {
      if (error !== undefined) state.error = error;
      if (isPending !== undefined) state.isPending = isPending;
    }
  },
  actions: {
    async login({ commit }, { studentId, password }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null });

        const { data } = await loginAPI({ studentId, password });

        commit('SET_TOKEN', data.tokenStr);
      } catch (error) {
        commit('SET_STATUS', { error });
      } finally {
        commit('SET_STATUS', { isPending: false });
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
      window.location.href = '/';
    },
    async register({ commit }, { email, name, password, confirmPassword, studentId, major, graduationYear }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null });

        const { data } = await registerAPI({
          email,
          name,
          password,
          confirmPassword,
          studentId,
          major,
          graduationYear
        });

        commit('SET_TOKEN', data.tokenStr);
      } catch (error) {
        commit('SET_STATUS', { error });
      } finally {
        commit('SET_STATUS', { isPending: false });
      }
    },
    async checkToken({ commit }) {
      try {
        await checkTokenAPI();
      } catch (error) {
        commit('LOGOUT');
        router.push({ name: 'Landing' });
      }
    },
    setNckuAuthKey({ commit }, { key = '', keyval = '' }) {
      commit('SET_NCKU_AUTH_KEY', { key, keyval });
    },
    async checkNCKULogin({ commit }, { key = '', keyval = '' }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null });

        const { data } = await checkNCKULoginAPI({ key, keyval });

        commit('SET_NCKU_AUTH_KEY', { key, keyval });
        commit('SET_TOKEN', data.tokenStr);
      } catch (error) {
        commit('SET_STATUS', { error });
      } finally {
        commit('SET_STATUS', { isPending: false });
      }
    }
  },
  getters: {}
};

export default auth;
