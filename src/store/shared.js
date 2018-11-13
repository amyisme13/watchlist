/* eslint no-param-reassign: off */

export default {
  state: {
    loading: false,
    error: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },
  actions: {
    clearError({ commit }) {
      commit('CLEAR_ERROR');
    },
    setError({ commit }, payload) {
      commit('SET_ERROR', payload);
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
};
