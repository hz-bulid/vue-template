/*
 * @Author: your name
 * @Date: 2021-03-22 20:45:12
 * @LastEditTime: 2021-04-03 12:30:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lerna-cil\packages\hz-main\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import { basicRoutes, LoginRoute, asyncRoutes } from './routers'
import { REDIRECT_NAME } from './constant'
const WHITE_NAME_LIST = [LoginRoute.name, REDIRECT_NAME]

const router = createRouter({
  history: createWebHashHistory((window as any).__POWERED_BY_QIANKUN__ ? '/prisons3DMap' : '/'),
  routes: (basicRoutes as unknown) as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})
export { asyncRoutes }
// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
