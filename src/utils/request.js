import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isCheckTimeout()) {
      // token失效了
      store.dispatch('user/logout')
      return Promise.reject(new Error('token 已失效'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
service.interceptors.response.use(
  response => {
    let { code, data, msg } = response.data
    if (code === 200) {
      return data
    } else {
      if (Array.isArray(msg)) {
        msg = msg.join(',')
      }
      ElMessage.error(msg)
      return Promise.reject(new Error(msg))
    }
  },
  // 请求失败
  error => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)
export default service
