/*
 * @Author: your name
 * @Date: 2021-04-02 11:04:02
 * @LastEditTime: 2021-04-03 11:18:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\layout\components\menu\menu-types.ts
 */

export interface IMenu {
  isapplication: string
  menuId: number
  menuLogo: string
  menuName: string
  menuRemark: null | number
  menuThumbnail: string
  method: string
  microMenuPath: string
  status: string
  menuPath: string
  child?: IMenu[]
  iconFont?: string
  menuLevel?: null | number

}
export interface IState {
  listMenu: IMenu[],
  defaultActive: number
}

export const baseMenu: IMenu = {
  isapplication: '0',
  menuId: 9999,
  menuLevel: null,
  menuLogo: '',
  menuName: '基础菜单',
  menuRemark: null,
  menuThumbnail: '',
  method: '0',
  menuPath: '',
  microMenuPath: '',
  status: '1',
  child: [
    {
      iconFont: '',
      isapplication: '0',
      menuId: 9991,
      menuLevel: null,
      menuLogo: '',
      menuName: '财务总账',
      menuPath: 'generalLedger',
      menuRemark: null,
      menuThumbnail: '',
      method: '0',
      microMenuPath: '',
      status: '1'
    }, {
      iconFont: '',
      isapplication: '0',
      menuId: 9992,
      menuLevel: null,
      menuLogo: '',
      menuName: '测试',
      menuPath: 'About',
      menuRemark: null,
      menuThumbnail: '',
      method: '0',
      microMenuPath: '',
      status: '1'
    },
  ],
}
