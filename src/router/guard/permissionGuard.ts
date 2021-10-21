/*
 * @Author: your name
 * @Date: 2021-03-26 21:27:39
 * @LastEditTime: 2021-04-02 18:32:17
 * @LastEditors: Please set LastEditors
 * @Description: 路由验证
 * @FilePath: \hz-finance\src\router\guard\permissionGuard.ts
 */
import type { Router } from 'vue-router'
import storage from '@/utils/library/storage'
import { analysisUrl, delParam } from '@/utils/library/urlFunc'
import { PageEnum } from '@/enums/pageEnum'

const LOGIN_PATH = PageEnum.BASE_LOGIN

const whitePathList: PageEnum[] = [LOGIN_PATH]
export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const token = analysisUrl('token')
    console.log('🚀 ~ file: permissionGuard.ts ~ line 21 ~ router.beforeEach ~ token', token)
    if (token) {
      storage.setItem('token', token)
      delParam('token')
    }
    // console.log("🚀 ~ file: progressGuard.ts ~ line 17 ~ router.beforeEach ~ nProgress.start", to);
    if (to.matched.length === 0) {
      next(PageEnum.ERROR_PAGE)
    } else {
      if (whitePathList.includes(to.path as PageEnum)) {
        next()
      } else {
        next()
      }
    }
    // return true;
  })
}
