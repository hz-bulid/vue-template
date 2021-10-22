/*
 * @Descripttion:
 * @version:
 * @Author: xKai
 * @Date: 2019-09-02 16:44:50
 * @LastEditors:
 * @LastEditTime: 2019-11-23 16:33:51
 */
const state = {
  isBig: false,
  isVideoDom: false,
  isLoginPrompt: false,
  styleID: ''
}
const mutations = {

  setIsBig (state, flag) {
    state.isBig = flag
  },

  setIsVideoDom (state, flag) {
    state.isVideoDom = flag
  },

  setIsLoginPrompt (state, flag) {
    state.isLoginPrompt = flag
  },

  setStyleID (state, str) {
    state.styleID = str
  }
}
const actions = {}
export default {
  state,
  mutations,
  actions
}
