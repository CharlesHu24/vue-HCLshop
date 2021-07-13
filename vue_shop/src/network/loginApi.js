import { request } from './axios'

// 登录 post请求
export function login (loginData) {
  return request({
    url: '/login',
    method: 'post',
    data: loginData
  })
}
