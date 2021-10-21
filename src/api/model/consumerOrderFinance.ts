/*
 * @Author: your name
 * @Date: 2021-03-27 15:03:26
 * @LastEditTime: 2021-03-27 15:06:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finance\src\api\login.ts
 */
export interface Ifinance {
  // isPage: boolean,
  xm: string,
  region: string,
  xdsj: string,
  jsh:string,
  xfzt:string,
  ddzt:string,
  wcsjks?:string,
  wcsjjs?: string,
  gjspsjks?: string,
  gjspsjjs?:string,
  ddldspsjjs?: string, // (string, optional): 大队领导审批时间结束 ,
  ddldspsjks?: string// (string, optional): 大队领导审批时间开始 ,
  ffsjjs?: string, // (string, optional): 发货时间结束 ,
  ffsjks?: string, // (string, optional): 发货时间开始 ,
}
export interface Iedit {
  jsh?: string[],
  id?:string[],
  jgh?: string, // 机构号 ,
  list?: string[], // (Array[string], optional): id数组/监室号数组 ,
  rybh: string, // 人员编号 ,
  spjg: string, // 审批结果 1同意 2不同意 一定要传 ,
  spyj: string, // 审批意见 ,
  zt: string, // 状态 管教审批2 所领导3 备货4 发货5 完成6 取消8
}
// 收货接口
export interface Ishouhuo {
  jsh?: string[],
  id?:string[],
  jgh?: string, // 机构号 ,
  list?: string[], // (Array[string], optional): id数组/监室号数组 ,
  rybh: string, // 人员编号 ,
  spjg: string, // 审批结果 1同意 2不同意 一定要传 ,
  spyj: string, // 审批意见 ,
  zt: string, // 状态 管教审批2 所领导3 备货4 发货5 完成6 取消8
}
export interface Ichild {
  id:string,
}
export interface IjshAll{
  jgh: string
}
export interface IjghAll{
  qybh?:string,
  jgh:string,
}
// 左侧修改商品管理
export interface IgoodsLeft{
  isPage?: boolean, // (boolean, optional): 是否支持分页 ,
  jgh?: string, // (string, optional): 机构编码 ,
  pageNum?: number, // (integer, optional): 页数 ,
  pageSize?: number, // (integer, optional): 每页数量 ,
  zt?:string,
  spmc?: string,
  spflid?: string,
  flmc?: string,
  flzt?: string,
  id?: number
}

// 商品管理
export interface Igoods{
  isPage?: boolean, // (boolean, optional): 是否支持分页 ,
  jgh: string, // (string, optional): 机构编码 ,
  pageNum?: number, // (integer, optional): 页数 ,
  pageSize?: number, // (integer, optional): 每页数量 ,
  zt?:number,
  spmc?: string,
  spflid?: string,
  id?: number, // (integer, optional): 商品
  flzt?:string,
}
export interface Iaddgoods{
  cjr?: number, // (integer, optional): 创建人 ,
  cjsj?:string, // (string, optional): 创建时间 ,
  flmc?:string, // (string, optional): 分类名称 ,
  flzt?:string, // (string, optional): 分类状态 1启用 2停用 ,
  id?: number, // (integer, optional): 商品分类ID ,
  jgh?:string, // (string, optional): 机构编码 ,
  rybh?:string, // (string, optional): 在押人员编号 ,
  xgr?: number, // (integer, optional): 修改人 ,
  xgsj?:string, // (string, optional): 修改时间 ,
  yxgmspzl?:string, // (string, optional): 在押人员编号允许购买商品种类 ,
  zt?:string, // (string, optional): 状态 1正常 2已删除
}
export interface Iaddgooslist{
  cjr?: number, // (integer, optional): 创建人 ,
  cjsj?:string, // (string, optional): 创建时间 ,
  gmsx?: number, // (integer, optional): 单次购买上限 ,
  id?: number, // (integer, optional): 商品ID ,
  jgh?:string, // (string, optional): 机构编码 ,
  sjzt?:string, // (string, optional): 上架状态 1上架 2不上架 ,
  spflid?:number, // (integer, optional): 商品分类ID ,
  spgg?:string, // (string, optional): 商品规格 ,
  spjg?: number, // (number, optional): 商品价格 ,
  spmc?:string, // (string, optional): 商品名称 ,
  sptp?:string, // (string, optional): 商品图片 ,
  zt?: number, // (integer, optional): 状态 1正常 2已删除
}
