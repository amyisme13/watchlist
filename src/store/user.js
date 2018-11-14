/* eslint no-param-reassign: off */

import firebase from 'firebase/app';

export default {
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    signUserInGoogle({ commit }) {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(user => {
          commit('SET_LOADING', false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit('SET_USER', newUser);
        })
        .catch(error => {
          commit('SET_LOADING', false);
          commit('SET_ERROR', error);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit('SET_USER', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL,
      });
    },
    signOut({ commit }) {
      firebase.auth().signOut();
      commit('SET_USER', null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
