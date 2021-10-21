/*
 * @Author: your name
 * @Date: 2021-04-01 15:55:40
 * @LastEditTime: 2021-04-03 13:02:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\types\vue.d.ts
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
