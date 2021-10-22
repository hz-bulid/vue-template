/*
 * @Author: your name
 * @Date: 2021-10-22 14:35:25
 * @LastEditTime: 2021-10-22 17:01:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-template\src\router\router.js
 */
import RouterConfig from "./modules"; // 引入业务逻辑模块

let pageRouters = [];
// 加载需要自动配置路由的页面
// eslint-disable-next-line no-undef
const viewsFiles = require.context("@/views", true, /\.vue$/);
viewsFiles.keys().forEach((key) => {
  // 筛选需要自动配置路由的页面
  // 若页面需要自动配置路由则设置属性  configRoute = true;
  if (viewsFiles(key).default.configRoute) {
    let path = key.replace(/(\.\/|\/index|\.vue)/g, ""), //将./ /index  .vue 置换为空白
      fileUrl = key.replace(/\.\//g, ""), //匹配路径
      len = path.split("/").length,
      name = viewsFiles(key).default.name || path.split("/")[len - 1], //获取文件夹名
      title = viewsFiles(key).default.title || name; // 功能名称

      console.log('%c [ `@/views/${fileUrl}` ]', 'font-size:13px; background:pink; color:#bf2c9f;', `@/views/${fileUrl}`)
    pageRouters.push({
      path: `/${name}`,
      name: name,
      meta: {
        title: title,
      },
      component: () => import(`@/views/${fileUrl}`),
    });
  }
});
const router = [
  {
    path: "/",
    name: "indxe",
    redirect: "Home",
    hidden: true,
    meta: { title: "首页", affix: true },
    component: () => import("@/layout/index.vue"),
    children: RouterConfig.concat(pageRouters),
  },
  {
    path: "/login",
    name: "login",
    hidden: false,
    meta: { title: "登录", auth: true },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import("@/views/error/404.vue"),
    hidden: true,
  },
];
export default router;
