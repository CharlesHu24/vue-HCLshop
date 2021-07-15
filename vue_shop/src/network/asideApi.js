import { request } from './axios'

export function aside() {
  return request({
    url: '/menus',
    method: 'get'
  })
}
