import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Thanks from '../views/Thanks.vue'
import Login from '../views/Login.vue'
import MyPage from '../views/MyPage.vue'
import Detail from '../views/Detail.vue'
import Done from '../views/Done.vue'
import ManagementStore from '../views/ManagementStore.vue'
import ManagementReservation from '../views/ManagementReservation.vue'
import Administrate from '../views/Administrate.vue'
import store from '../store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks,
    meta: {
      userAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
    meta: {
      userAuth: true,
    },
  },
  {
    path: '/detail/:shop_id/:reservationId',
    name: 'Detail',
    component: Detail,
    props: true,
  },
  {
    path: '/done/:commentNum',
    name: 'Done',
    component: Done,
    meta: {
      userAuth: true,
    },
    props: true,
  },
  {
    path: '/management-reservation',
    name: 'ManagementReservation',
    component: ManagementReservation,
    meta: {
      managerAuth: true,
    },
  },
  {
    path: '/management-store/:shop_id',
    name: 'ManagementStore',
    component: ManagementStore,
    meta: {
      managerAuth: true,
    },
    props: true,
  },
  {
    path: '/administrate',
    name: 'Administrate',
    component: Administrate,
    meta: {
      administratorAuth: true,
    },
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (
    (to.matched.some((record) => record.meta.userAuth) && !store.state.auth) ||
    (to.matched.some((record) => record.meta.managerAuth) && !store.state.manager) ||
    (to.matched.some((record) => record.meta.administratorAuth) && !store.state.administrator)
  ) {
    next({
      path: '/login',
      query: {redirect : to.fullPath},
    });
  }else{
    next();
  }
});

export default router
