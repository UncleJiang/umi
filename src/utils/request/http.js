/** axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import QS from 'qs'
import router from '../../router'
import { delCookie } from '../cookie'
// import store from '../store/index'

// 默认地址
axios.defaults.baseURL = 'http://api.123.com/api/v1/'
// 请求超时时间
axios.defaults.timeout = 10000
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 请求默认带cookie
axios.defaults.withCredentials = true

// 跳转登录页,携带当前页面路由，以期在登录页面完成登录后返回当前页面
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/* 因为在session cookie登录机制里，登录过期判断在后端完成，而且已设置请求默认都带上cookie，所以在这里不需要请求拦截里判断
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.Authorization
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  })
*/

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.code === '200') {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.code) {
      switch (error.response.code) {
        // 10001: 参数错误； 10005：未知错误
        case '10001':
        case '10005':
          toLogin()
          break

        // 10002 登录状态失效
        // 登录过期对用户进行提示、清除本地token、跳转登录页面
        case '10002':
          // 用$message代替
          console.log('登录过期，请重新登录')
          /*
          // 清除token
          localStorage.removeItem('Authorization')
          store.commit('changeLogin', null)
          */
          delCookie()
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            toLogin()
          }, 1000)
          break

          // 其他错误，直接抛出错误提示
        default:
          console.log(error.response.msg)
      }
      return Promise.reject(error.response)
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数] \
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
