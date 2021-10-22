/*
 * @Author: your name
 * @Date: 2021-10-22 16:21:13
 * @LastEditTime: 2021-10-22 16:30:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-template\src\plugins\initStyle.js
 */
import { themeList } from './themeVariable'

export function initStyle() {
  const styleID = window.localStorage.getItem('themeId') || 'simple'
  const colors = themeList[styleID]
  Object.keys(colors).forEach(key => {
    const colorKey = key
    const colorValue = colors[key]
    document.documentElement.style.setProperty(colorKey, colorValue)
  })
}
