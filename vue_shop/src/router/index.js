import Vue from 'vue'
import VueRouter from 'vue-router'
// 配置懒加载
const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/home/home')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 配置路由守卫
router.beforeEach((to, from, next) => {
  // 1.访问login页面 正常放行
  if (to.path === '/login') return next()

  // 2.跳过login直接访问其他页面
  // 2.1.判断token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')

  // 3.有token 正常放行
  next()
})

export default router
