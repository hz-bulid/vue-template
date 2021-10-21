/*
 * @Author: your name
 * @Date: 2021-03-23 17:39:32
 * @LastEditTime: 2021-04-03 12:29:37
 * @LastEditors: Please set LastEditors
 * @Description: 路由跳转进度条设置
 * @FilePath: \lerna-cil\packages\hz-main\src\router\guard\progressGuard.ts
 */
import type { Router } from 'vue-router'

import nProgress from 'nprogress'

export function createProgressGuard(router: Router): void {
  router.beforeEach(async (to) => {
    // console.log("🚀 ~ file: progressGuard.ts ~ line 17 ~ router.beforeEach ~ nProgress.start", to);
    if (to.meta.loaded) return true
    nProgress.start()
    return true
  })
  router.afterEach(async () => {
    nProgress.done()
    // console.log("🚀 ~ file: progressGuard.ts ~ line 17 ~ router.beforeEach ~ nProgress.start");
  })
}
