import request from '@/utils/request'

export const login = data => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET'
  })
}
