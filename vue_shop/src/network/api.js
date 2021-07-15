import { request } from './axios'

// 请求用户列表
export function users(userObj) {
  return request({
    url: '/users',
    method: 'get',
    params: userObj
  })
}

// 修改用户状态
export function usersState(uid, type) {
  return request({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}

// 添加用户
export function addUser(userInfo) {
  return request({
    url: '/users',
    method: 'post',
    data: userInfo
  })
}

// 获取修改用户信息
export function editUserInfo(id) {
  return request({
    url: `/users/${id}`,
    method: 'get'
  })
}

// 修改用户
export function editUser(id, email, mobile) {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data: {
      email,
      mobile
    }
  })
}

// 删除用户
export function delUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}
