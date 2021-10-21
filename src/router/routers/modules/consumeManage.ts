/*
 * @Author: wsx
 * @Date: 2021-04-01 09:48:52
 * @LastEditTime: 2021-04-03 11:43:24
 * @LastEditors: Please set LastEditors
 * @Description: 消费管理
 * @FilePath: \hz-finances\src\router\routers\modules\consumeManage.ts
 */
import type { AppRouteModule } from '@/router/types'
const consumerOrders: AppRouteModule = {
  path: 'consumerOrders',
  name: 'consumerOrders',
  component: () => import('@/views/consumeManage/consumerOrders/consumerOrders.vue'),
  meta: {
    title: '消费订单(管教)'
  }
}
const teamLeaderOrder: AppRouteModule = {
  path: 'teamLeaderOrder',
  name: 'teamLeaderOrder',
  component: () => import('@/views/consumeManage/consumerOrders/teamLeaderOrder.vue'),
  meta: {
    title: '消费订单(大队领导)'
  }
}
const limitedAdministrator: AppRouteModule = {
  path: 'limitedAdministrator',
  name: 'limitedAdministrator',
  component: () => import('@/views/consumeManage/limitedAdministrator/index.vue'),
  meta: {
    title: '消费订单'
  }
}
export default {
  consumerOrders,
  limitedAdministrator,
  teamLeaderOrder
}
