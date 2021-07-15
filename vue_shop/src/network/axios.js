import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 3000
  })

  instance.interceptors.request.use(config => {
    // 将token挂载到请求头中的Authorization字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }, error => {
    return error
  })

  instance.interceptors.response.use(result => {
    return result.data
  }, error => {
    return error
  })

  return instance(config)
}
