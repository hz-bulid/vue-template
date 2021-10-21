/*
 * @Description: st
 * @Author: ZY
 * @Date: 2020-12-07 10:30:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-03 12:34:03
 */
import { createStore, createLogger } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
// import { store as settings, SettingStore, SettingsState } from "@/store/modules/settings";
import { store as permission, PermissionStore, PermissionState } from '@/store/modules/permission'
import { store as user } from '@/store/modules/user'
import { IUserState, IUserStore } from './modules/user/state-types'
import { store as tagViews, TagsStore, TagsViewState } from '@/store/modules/tagsview'

export interface RootState {
  user: IUserState,
  tagViews: TagsViewState,
  permission: PermissionState
}

export type Store = IUserStore<Pick<RootState, 'user'>> &
  TagsStore<Pick<RootState, 'tagViews'>> &
  PermissionStore<Pick<RootState, 'permission'>>

// define injection key
// export const key: InjectionKey<Store<RootState>> = Symbol();
// plugins.push(createPersistedState({ storage: window.sessionStorage }))
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export const store = createStore({
  plugins,
  // strict: debug,
  modules: {
    user,
    tagViews,
    permission
    // settings,
    // user,
    // tagViews
  }
})

// export function useStore(): Store {
//     return useVuexStore();
// }
export function useStore(): Store {
  return store as Store
}
