/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2020-04-14 09:41:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-22 15:46:43
 */
import axios from "axios";
import { Notification } from "element-ui";
// import qs from 'qs' 暂未安装日后需要再装,功能是将url解析为对象或将对象转为url，方便和后台对接口。
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: '/api',
  // 超时
  timeout: 60000,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.common.token = token;

    let DEPTTYPE = localStorage.getItem("DEPTTYPE");
    if (DEPTTYPE && DEPTTYPE == "ZD") {
      let cusNumber = localStorage.getItem("prisonCusNumber");
      config.headers.common.cusNumber = cusNumber;
    }
    let timestamp = new Date().getTime();
    config.url += `?timestamp=${timestamp}`;
    return config;
  },
  (err) => {
    Notification.error({
      title: "网络错误",
      message: "请求超时，请检查网络链接",
    });
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status == 200 && response.headers["new-jwt"]) {
      const token = response.headers["new-jwt"];
      if (token) {
        localStorage.setItem("token", token);
      }
    }
    // 在这里处理全局响应
    if (response.data.rtnCode) {
      response.data.code = response.data.rtnCode;
    }
    if (response.status == 200 && !response.data) {
      // Notification.error({
      //   title: '返回数据为空'
      // })
      // return Promise.reject(response)
    } else if (response.status == 200 && response.data.code == 400) {
      // Notification.error({
      //   title: '返回数据错误',
      //   message: response.data.message
      // })
      return Promise.reject(response);
    }
    return response.data;
  },
  (error) => {
    // 在这里处理全局错误
    // if (!error.response) {
    //   Notification.error({
    //     title: '服务器未启动'
    //   })
    //   return Promise.reject('断网了，后端未启动')
    // }
    // if (error.response.status === 433 || error.response.status === 401) {
    //   toLogin()
    // } else {
    //   Notification.error({
    //     title: '服务器出错，请联系管理员',
    //     // message: error
    //   })
    // }
    return Promise.reject(error.response);
  }
);

export default service;
