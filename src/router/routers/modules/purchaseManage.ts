/*
 * @Author: wsx
 * @Date: 2021-04-01 09:49:53
 * @LastEditTime: 2021-04-03 11:44:00
 * @LastEditors: Please set LastEditors
 * @Description: 采购管理
 * @FilePath: \hz-finances\src\router\routers\modules\purchaseManage.ts
 */
import type { AppRouteModule } from '@/router/types'

const stockList: AppRouteModule = {
  path: 'stockList',
  name: 'stockList',
  component: () => import('@/views/purchaseManage/StockList/stockList.vue'),
  meta: {
    title: '备货清单'
  }
}

const commodityManagement: AppRouteModule = {
  path: 'commodityManagement',
  name: 'commodityManagement',
  component: () => import('@/views/purchaseManage/commodityManagement/commodityManagement.vue'),
  meta: {
    title: '商品管理'
  }
}
export default {
  commodityManagement,
  stockList

}
