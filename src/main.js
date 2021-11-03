/*
 * @Author: your name
 * @Date: 2021-10-22 11:30:05
 * @LastEditTime: 2021-11-02 17:35:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-template\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as util from "@/utils/util.js";
// 第三方模块引入
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import '@/assets/style/iconfont/iconfont.css'

// 初始化主题，
import {
  initStyle
} from './plugins/theme/initStyle'

initStyle();
Vue.config.productionTip = false;

Vue.use(Element);
Vue.prototype.$util = util;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
