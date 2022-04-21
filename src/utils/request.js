import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use()
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
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)
export default service
