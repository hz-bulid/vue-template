/*
 * @Author: your name
 * @Date: 2021-04-01 09:25:26
 * @LastEditTime: 2021-04-01 15:58:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\types\shims-vue.d.ts
 */

/* eslint-disable */
import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import { Store } from 'vuex'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Store<any>;
    // 以下是在main.ts中挂载到Vue.prototype上的变量
    // $api: any;
    // $mock: any;
    // $configs: any;
  }
}
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }
