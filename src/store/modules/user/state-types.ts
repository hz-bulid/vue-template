/*
 * @Author: your name
 * @Date: 2021-03-29 13:59:32
 * @LastEditTime: 2021-04-03 12:33:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finance\src\store\modules\user\state-types.ts
 */

import { RootState } from '@/store'
import {
  ActionContext,
  Store,
  CommitOptions,
  DispatchOptions
} from 'vuex'

export interface IUserState {
  token: string
  userName: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

export interface IMutations<T = IUserState> {
  SET_TOKEN(state: T, token: string): void
}

export type AugmentedActionContext = {
  commit<K extends keyof IMutations>(
    key: K,
    payload: Parameters<IMutations[K]>[1],
  ): ReturnType<IMutations[K]>
} & Omit<ActionContext<IUserState, RootState>, 'commit'>

export interface IUserInfo {
  username: string,
  password: string
}

export interface IActions {
  ACTION_LOGIN(
    { commit }: AugmentedActionContext,
    userInfo: IUserInfo
  ): void
}

export type IUserStore<S = IUserState> = Omit<Store<S>, 'getters' | 'commit' | 'dispatch'>
  & {
    commit<K extends keyof IMutations, P extends Parameters<IMutations[K]>[1]>(
      key: K,
      payload: P,
      options?: CommitOptions
    ): ReturnType<IMutations[K]>
  } & {
    dispatch<K extends keyof IActions>(
      key: K,
      payload: Parameters<IActions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<IActions[K]>
  };
