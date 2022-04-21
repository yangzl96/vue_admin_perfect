import router from '@/router'
import store from '@/store'

// 白名单：
const whiteList = ['/login']

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 1. 已登录，不允许进入 login
  if (store.getters.token) {
    if (to.path === '/login') {
      // 回到首页
      next('/')
    } else {
      // 进入下一个路由钩子函数
      next()
    }
  } else {
    // 2. 未登录，只许进入 login
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
