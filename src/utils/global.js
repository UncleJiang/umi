// 用户缓存key
const loginKey = 'USER-LOGIN'
// 用户缓存工具类
export default {
  // 获取缓存
  getUser () {
    if (!window.sessionStorage) { return {} }
    return JSON.parse(window.sessionStorage.getItem(loginKey)) || {}
  },
  // 添加缓存
  setUser (user) {
    if (!window.sessionStorage) { return }
    window.sessionStorage.setItem(loginKey, JSON.stringify(user))
  },
  // 清除缓存
  clearUser () {
    if (!window.sessionStorage) { return }
    window.sessionStorage.clear()
  }
}
