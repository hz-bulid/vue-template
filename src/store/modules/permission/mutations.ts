/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-25 14:28:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-31 13:26:25
 */
import { MutationTree } from 'vuex'
import { PermissionState } from './state'
import { PermissionMutationType } from './mutation-types'
import type { AppRouteRecordRaw } from '@/router/types'

import { basicRoutes } from '@/router/routers'
export type Mutations<S = PermissionState> = {
  [PermissionMutationType.SET_ROUTES](state: S, routes: AppRouteRecordRaw[]): void
}

export const mutations: MutationTree<PermissionState> & Mutations = {
  [PermissionMutationType.SET_ROUTES](state: PermissionState, routes: AppRouteRecordRaw[]) {
    state.routes = basicRoutes.concat(routes)
    state.dynamicRoutes = routes
  }

}
