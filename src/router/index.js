import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      beforeEnter: AuthGuard,
      component() {
        return import(/* webpackChunkName: "about" */ '../views/About.vue');
      },
    },
    {
      path: '/manage',
      name: 'manage',
      beforeEnter: AuthGuard,
      component() {
        return import(/* webpackChunkName: "manage" */ '../views/Manage.vue');
      },
    },
  ],
});
