import PageNotFound from '../views/PageNotFound.vue';
import PeopleListView from '../views/PeopleListView.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/people',
  },
  {
    path: '/people',
    name: 'PeopleListView',
    component: PeopleListView,
  },
  {
    path: '*',
    component: PageNotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
