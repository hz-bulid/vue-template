/*
 * @Author: your name
 * @Date: 2021-03-29 13:56:24
 * @LastEditTime: 2021-03-29 15:09:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finance\src\store\modules\user.ts
 */
import {
  ActionTree,
  MutationTree,
  Module
} from 'vuex'
import { RootState } from '@/store'
import { IUserState, IMutations, IActions, IUserInfo } from './state-types'

const state: IUserState = {
  token: '',
  userName: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: ''
}

const mutations: MutationTree<IUserState> & IMutations = {
  SET_TOKEN: (state: IUserState, token: string) => {
    state.token = token
  }
}

const actions: ActionTree<IUserState, RootState> & IActions = {
  ACTION_LOGIN: ({ commit }, userInfo: IUserInfo) => {
    const { username } = userInfo
    commit('SET_TOKEN', username)
  }
}

export const store: Module<IUserState, RootState> = {
  state,
  mutations,
  actions
  // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
  // But without it, a bigger store might have clashes in namings
  // namespaced: true,
}
