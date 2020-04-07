import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 面包屑列表数据
    breadListState: []
  },
  mutations: {
    // 更新面包屑
    breadListMutations (getters, list) {
      getters.breadListState = list
    }
  }
})

export default store
