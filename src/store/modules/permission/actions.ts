/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-25 15:03:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-31 16:29:40
 */

import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { PermissionState } from './state'
import { Mutations } from './mutations'
import { PermissionMutationType } from './mutation-types'
import { PermissionActionType } from './action-types'
import { asyncRoutes } from '@/router/routers'
import type { AppRouteRecordRaw } from '@/router/types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, RootState>, 'commit'>

export const filterAsyncRoutes = (routes: AppRouteRecordRaw[], roles: string[]) => {
  const res: AppRouteRecordRaw[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (r.children) {
      r.children = filterAsyncRoutes(r.children, roles)
    }
    res.push(r)
  })
  return res
}

export interface Actions {
  [PermissionActionType.ACTION_SET_ROUTES](
    { commit }: AugmentedActionContext
    , roles: string[]): void
}

export const actions: ActionTree<PermissionState, RootState> & Actions = {
  [PermissionActionType.ACTION_SET_ROUTES](
    { commit }: AugmentedActionContext
    , roles: string[]) {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    commit(PermissionMutationType.SET_ROUTES, accessedRoutes)
  }
}
