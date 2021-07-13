import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 3000
  })

  instance.interceptors.request.use(config => {
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
