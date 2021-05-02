import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
const Login = () => import('@/views/login/Login')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router