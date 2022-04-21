import { createRouter, createWebHashHistory } from 'vue-router'

// 公开路由表
const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
