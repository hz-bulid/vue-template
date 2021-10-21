/*
 * @Author: your name
 * @Date: 2021-03-31 15:54:18
 * @LastEditTime: 2021-04-02 10:34:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\main.ts
 */
import './public-path'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import '@/router/guard'
import HanUINext from '@hz-lib/han-ui-next'
import '@hz-lib/han-ui-next/lib/theme-chalk/index.css'
import locale from '@hz-lib/han-ui-next/lib/locale/lang/zh-cn'

import '@/assets/style/index.scss'
import '@/assets/style/icon/iconfont.css';

(async () => {
  const app = createApp(App)
  // 注册vuex
  app.use(store)
  // 注册han-ui
  app.use(HanUINext, { locale })
  // 捕获异常
  app.config.errorHandler = (err, vm, info) => {
    console.error('🚀 捕获异常:', err, vm, info)
    // 处理错误
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  }
  app.config.warnHandler = function (msg, vm, trace) {
    console.error('🚀 ~ 警告捕获:', msg, vm, trace)
    // `trace` 是组件的继承关系追踪
  }
  // 注册路由
  app.use(router)
  // 路由准备好后挂载
  await router.isReady()
  app.mount('#app')
})()
