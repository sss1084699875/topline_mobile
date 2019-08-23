import Vue from 'vue'
import Vuex from 'vuex'

import { getUser, setUser } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录状态信息
    user: getUser(),
    // 控制replyList弹出层显示隐藏
    showReplyList: false,
    // 点击回复按钮的时候,记录当前评论对象
    currentComment: null
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setUser(data)
    },
    setShowReplyList (state, value) {
      state.showReplyList = value
    },
    setCurrentComment (state, value) {
      state.currentComment = value
    }
  },
  actions: {

  }
})
