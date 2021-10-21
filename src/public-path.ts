/*
 * @Author: your name
 * @Date: 2021-04-01 09:15:06
 * @LastEditTime: 2021-04-03 13:01:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\public-path.ts
 */
if ((window as any).__POWERED_BY_QIANKUN__) {
  // 动态设置 webpack publicPath，防止资源加载出错
  // eslint-disable-next-line camelcase
  __webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
