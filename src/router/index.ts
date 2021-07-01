import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import('@/views/home/index.vue')
const Login = () => import('@/views/login/index.vue')
const Test = () => import('@/views/test/index.vue')

// 路由信息
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  }
];

// 导出路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router;

