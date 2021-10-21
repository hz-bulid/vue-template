/*
 * @Author: wsx
 * @Date: 2021-04-01 09:49:28
 * @LastEditTime: 2021-04-01 09:51:14
 * @LastEditors: Please set LastEditors
 * @Description: 财务管理
 * @FilePath: \hz-finances\src\router\routers\modules\financialManage.ts
 */
import type { AppRouteModule } from '@/router/types'

const generalLedger: AppRouteModule = {
  path: 'generalLedger',
  name: 'generalLedger',
  component: () => import('@/views/financialManage/GeneralLedger/generalLedger.vue'),
  meta: {
    title: '财务总账'
  }
}
const consumerOrderFinance: AppRouteModule = {
  path: 'consumerOrderFinance',
  name: 'consumerOrderFinance',
  component: () => import('@/views/financialManage/consumerOrderFinance/consumerOrderFinance.vue'),
  meta: {
    title: '消费订单(财务)'
  }
}
const accountManagement: AppRouteModule = {
  path: 'accountManagement',
  name: 'accountManagement',
  component: () => import('@/views/financialManage/AccountManagement/index.vue'),
  meta: {
    title: '账户管理'
  }
}
const procurementSettlement: AppRouteModule = {
  path: 'procurementSettlement',
  name: 'procurementSettlement',
  component: () => import('@/views/financialManage/procurementSettlement/index.vue'),
  meta: {
    title: '采购结算'
  }
}
export default {
  generalLedger,
  consumerOrderFinance,
  accountManagement,
  procurementSettlement
}
