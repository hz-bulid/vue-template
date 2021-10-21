export interface IleftList {
  code: string
  key: string
  num: string
  value: null
}
export interface IList {
  bhr: string | null, // 备货人 ,
  bhrq: string | null, // 备货日期 ,
  cjrq: string | null, // 创建日期 ,
  dds: string | null, // 包含订单数 ,
  ddzt: string | null, // 订单状态 ,
  ddztValue: string | null, // 订单状态中文 ,
  fhr: string | null, // 发货人 ,
  fhrq: string | null, // 发货日期 ,
  id: string | null, // 备货单编号 ,
  isFh: string | null, // 是否发货 已发货 1 未发货2 ,
  isJs: string | null, // 是否结算 1是 2否 ,
  jgh: string | null, // 机构号 ,
  jsrq: string | null, // 结算日期 ,
  qrrs: string | null, // 确认订单人数 ,
  spsl: string | null, // 商品总数 ,
  zje: string | null, // 总金额 ,
  zrs: string | null, // 订单总人数
}
export interface IFormInline {
  bhr?: string,
  endTime?: string,
  id?: string,
  isFh?: string,
  isPage?: boolean,
  jgh?: string,
  pageNum?: number,
  pageSize?: number,
  startTime?: string,
  zt?: string,

}
export interface IState {
  tableOption: ITableOption
  tableColumns: IColumn[]
  formInline: any,
  ruleFormRef: null | HTMLFormElement,
  leftList: IleftList[],
  showDialog: boolean,
  showDialogxq: boolean,
  showDialogup: boolean,
  showDialogin: boolean,
  showWardTable: boolean,
  row: any
}

export enum Direction {
  jsfs = 'jsfs',
  jsje = 'jsje',
  jsrq = 'jsrq',
  skf = 'skf',
  zfBh = 'zfBh',
}
export interface IRuleForm {
  bhdBh: string, // : 备货单编号 ,
  cjr?: string, // : 创建人Id(前端不用传) ,
  jsId?: string, // : 结算id(前端不用传) ,
  jsfs: string, // : 结算方式 ,
  jsje: string, // : 结算金额 ,
  jsrq: string, // : 结算日期 ,
  skf: string, // : 收款方 ,
  zfBh: string | Date, // : 转账/支票编号
  jgh: string | number, // :
}
export interface IRule {
  validator: any,
  trigger: string
}
export type IRules = {
  [key in Direction]?: IRule[]
}
export interface IShortcuts {
  text: string,
  value: Date
}
export interface IDatas {
  ruleForm: IRuleForm,
  rules: IRules,
  ruleFormRef: null | HTMLFormElement,
  shortcuts: IShortcuts[]
}
