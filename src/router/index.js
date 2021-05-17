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
    component: Thanks
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: "/detail/:shop_id/:reservationId",
    name: "Detail",
    component: Detail,
    props: true,
  },
  {
    path: '/done/:commentNum',
    name: 'Done',
    component: Done,
    props: true,
  },
  {
    path: "/managementstore/:shop_id",
    name: "ManagementStore",
    component: ManagementStore,
    props: true,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
