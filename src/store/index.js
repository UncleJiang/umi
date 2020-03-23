import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    // 存储登录的用户信息
    // 需转换成字符串格式存储在localStorage
    userLogInfo: {} || JSON.parse(localStorage.getItem('userLogInfo'))
  },
  mutations: {
    // 修改token,并存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
    },
    // 更新用户信息
    handleUserInfo (state, userLogInfo) {
      state.userLogInfo = userLogInfo
      // 把登录的用户信息保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      localStorage.setItem('userLogInfo', JSON.stringify(userLogInfo))
    }
  },
  getters: {
    // 获取登录的用户信息
    getLogInfo: (state) => state.userLogInfo
  }
})

export default store
