/*
 * @Author: your name
 * @Date: 2021-04-03 11:16:06
 * @LastEditTime: 2021-04-03 11:42:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\layout\components\menu\menuHandel.ts
 */
import { createContext, useContext } from '@/hooks/core/useContext'
import { InjectionKey } from 'vue'
import common from '@/api/common'
import { IMenu, IState, baseMenu } from './menu-types'

export interface IMenuActive {
  defaultActive: number,
  setActive(val: number): void
}

export const MenuActiveKey: InjectionKey<IMenuActive> = Symbol('MenuActive')
// 设置菜单展开位置
export function createActiveContext(context: IMenuActive) {
  return createContext<IMenuActive>(context, MenuActiveKey, { native: true })
}

export function useActiveContext() {
  return useContext<IMenuActive>(MenuActiveKey)
}
// 获取菜单
export const initMenu = async (state: IState): Promise<IMenu[]> => {
  // return new Promise((resolve) => {
  //   state.listMenu = [baseMenu]
  //   resolve([baseMenu])
  // })
  const res = await common.initMenu()
  const menulist: IMenu[] = res.data.filter((item: any) => {
    if (item.method) {
      return true
    }
    return false
  })
  menulist.push(baseMenu)
  state.listMenu = menulist
  return menulist
}
