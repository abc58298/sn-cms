import http from '@/util/http'
// 用户登录
const login = (data) => {
  return http.post('/wxlogin', data)
}
//测试
const test = () => {
  return http.get('/test')
}

export default { login, test }
