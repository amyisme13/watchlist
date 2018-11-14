import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import shared from './shared';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shared,
    user,
  },
  plugins: [createPersistedState()],
});
