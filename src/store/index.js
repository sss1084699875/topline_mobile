import Vue from 'vue'
import Vuex from 'vuex'

import { getUser, setUser } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录状态信息
    user: getUser()
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setUser(data)
    }
  },
  actions: {

  }
})
