import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import LoadingPage from '../views/LoadingPage.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Loading',
    component: LoadingPage
  },
  {
    path: '/start',
    name: 'Start',
    component: () =>
      import(/* webpackChunkName: "start" */ '../views/StartPage.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () =>
      import(/* webpackChunkName: "game" */ '../views/GamePage.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
