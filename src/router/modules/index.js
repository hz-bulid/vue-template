/*
 * @Author: your name
 * @Date: 2021-10-22 15:17:33
 * @LastEditTime: 2021-10-22 15:17:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-template\src\router\modules\index.js
 */
// eslint-disable-next-line no-undef
const files = require.context(".", true, /\.js$/);

let configRouters = [];

/**
 * inject routers
 */
files.keys().forEach((key) => {
  if (key === "./index.js") return;
  configRouters = configRouters.concat(files(key).default); // 读取出文件中的default模块
});

export default configRouters; // 抛出一个Vue-router期待的结构的数组
