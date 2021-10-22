/*
 * @Description:
 * @Author: lixiang
 * @Date: 2019-08-26 09:15:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-22 15:51:26
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)
// eslint-disable-next-line no-undef
const modulesFiles = require.context('./modules/', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  state: {
    name: 'security_web',
  },
  modules,
  getters
})

export default store
