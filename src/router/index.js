/*
 * @Description: In User Settings Edit
 * @Author: wangsx
 * @Date: 2020-04-10 11:45:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-22 16:28:41
 */
import Vue from "vue";
import VueRouter from "vue-router";
import * as util from "@/utils/util";
// 路由数据
import routesData from "./router";
Vue.use(VueRouter);

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? "/security" : "/",
  mode: 'history',// 需要服务端支持
  scrollBehavior: () => ({ y: 0 }),
  routes: routesData,
});

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some((r) => r.meta.auth)) {
    // 不需要身份校验 直接通过
    next();
  } else {
    const UrlToken = util.analysisUrl("token");
    if (UrlToken && UrlToken !== "undefined") {
      util.setStorage("token", UrlToken);
    } else {
      // 验证是否登录。通过token或cookie
      const token = util.getStorage("token");
      if (token && token !== "undefined") {
        if (to.path === "/login") {
          next();
        } else {
    

          if (to.matched.length === 0) {
            next("/404"); // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
          }

          next(); // 如果匹配到正确跳转
        }
        // next()
      } else {
        // 没有登录的时候跳转到登录界面
        // 携带上登陆成功之后需要跳转的页面完整路径
        next({
          name: "login",
          query: {
            redirect: to.fullPath,
          },
        });
      }
    }
  }
});
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch((error) => error);
};
export default router;
