/*
 * @Description: Do not edit
 * @Author: wangsx
 * @Date: 2021-03-23 16:44:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-20 16:29:36
 */

// import { PageEnum } from "@/enums/pageEnum";
import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types'

const modules: any = require.context('./modules', true, /\.ts$/)

const routeModuleList: AppRouteModule[] = []

modules.keys().forEach((key: any) => {
  const mod = modules(key).default || modules(key)
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
const routeList: AppRouteRecordRaw[] = routeModuleList.map((item: AppRouteRecordRaw) => {
  return Object.values(item)
}).flat()

export const asyncRoutes = [...routeModuleList]

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'index',
  component: () => import('@/layout/index.vue'),
  // redirect: PageEnum.BASE_HOME,
  redirect: '/consumerOrders',
  meta: {
    title: 'index'
  },
  children: [...routeList]
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/Login.vue'),
  meta: {
    title: 'routes.basic.login'
  }
}
// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw[] = [{
  path: '/404',
  name: '404',
  component: () => import('@/views/error-page/404.vue'),
  meta: {
    title: '404',
    hideBreadcrumb: true
  }
}, {
  path: '/*',
  name: 'errorPage',
  redirect: '/404',
  meta: {
    title: 'errorPage'
  }
}]
// Basic routing without permission
export const basicRoutes = [LoginRoute, RootRoute, ...PAGE_NOT_FOUND_ROUTE]
