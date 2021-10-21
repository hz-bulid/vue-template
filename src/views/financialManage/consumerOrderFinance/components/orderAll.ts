// 表格
export interface IList {
  xm:string
  jsh:string
  xdsj: string
  xflx:string
  xfje:string
  dqye:string
  ddzt:string
  id?:string
  rybh?: string, // 人员编号 ,
}
// 表单
export interface IFormInline {
  xm: string,
  region: string,
  xdsj: string,
  jsh:any,
  xfzt:string,
  ddzt:string,
  pageNum:number,
  pageSize:number,
  total:number,
  isPage:boolean,
  xfsjks: string,
  xfsjjs:string,
  wcsjks?:string,
  wcsjjs?: string,
  gjspsjks?: string,
  gjspsjjs?:string,
  ddldspsjjs?: string, // (string, optional): 大队领导审批时间结束 ,
  ddldspsjks?: string,
  ffsjjs?: string, // (string, optional): 发货时间结束 ,
  ffsjks?: string,

}

export interface Ieditdata{
  id:string[],
  jgh: string, // 机构号 ,
  list: any[], // (Array[string], optional): id数组/监室号数组 ,
  rybh: string, // 人员编号 ,
  spjg: string, // 审批结果 1同意 2不同意 一定要传 ,
  spyj: string, // 审批意见 ,
  zt: string, // 状态 管教审批2 所领导3 备货4 发货5 完成6 取消8
}
export interface Itotallist{
  order:number,
  totalAmount:number,
  totalGoods:number,
}
// 周
export interface ItabList{
  label: string,
  value: string,
}
export interface IleftList{
  label: string,
  value: string,
  code: string,
}
// 下拉框
export interface INputLists{
  value:string,
  lable:string,
}
// 弹框
export interface Idialog{
  statue: boolean,
  title: string,
  row:IList[],
  typeapp?:string
}
