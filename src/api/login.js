/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2020-06-02 14:51:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-22 15:26:13
 */
import request from "@/utils/request";

// 新系统登录
// 获取用户详细信息
export const login = (data) => {
  return request({
    url: "/api/HZ-USER-ROLE/jwt/doLogin/v2",
    method: "post",
    data: data,
  });
};
// 登出
export const loginOut = (data) => {
  return request({
    url: "/api/HZ-USER-ROLE/jwt/loginOut",
    params: data,
    method: "get",
  });
};

// 新系统登录
export const inverseLogin = (data) => {
  return request({
    url: "/api/HZ-USER-ROLE/jwt/inverseLogin",
    params: data,
  });
};
