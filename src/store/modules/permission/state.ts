/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-25 14:15:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-03 12:33:40
 */

import type { AppRouteRecordRaw } from '@/router/types'

export interface PermissionState {
  routes: AppRouteRecordRaw[]
  dynamicRoutes: AppRouteRecordRaw[]
}

export const state: PermissionState = {
  routes: [],
  dynamicRoutes: []
}
