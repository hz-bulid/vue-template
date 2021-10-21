/*
 * @Author: your name
 * @Date: 2021-03-23 17:38:23
 * @LastEditTime: 2021-04-03 12:29:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lerna-cil\packages\hz-main\src\router\guard\index.ts
 */
/*
 * @Description: Do not edit
 * @Author: wangsx
 * @Date: 2021-03-23 17:38:23
 * @LastEditors: LastEditors
 * @LastEditTime: 2021-03-23 17:40:08
 */
import router from '@/router'

import { createProgressGuard } from './progressGuard'
import { createPermissionGuard } from './permissionGuard'
createProgressGuard(router)
createPermissionGuard(router)
