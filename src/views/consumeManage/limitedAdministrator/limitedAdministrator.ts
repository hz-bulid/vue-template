export interface IList {
  date: string
  name: string
  address: string
}
export interface ITableData {
  list: IList[]
  pageNum: number
  pageSize: number
  total: number
}
export type BtnType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
export type BtnSize = 'medium' | 'small' | 'mini'
export type ColumnType = 'operate' | 'selection'
export interface IOperates {
  name: string
  type?: BtnType
  size?: BtnSize
}
export interface IColumn {
  title: string
  prop?: string
  width?: string
  hidden?: boolean
  operates?: IOperates[]
  slot?: string
  type?: ColumnType
}
export interface ISearchData {
  area: number
}

export interface IName {
  validator: any,
  trigger: string
}
export interface IRules {
  name: IName[]
}
export interface IRuleForm {
  name: string
}
export interface ICities {
  id: number
  jgh: string
  jsh: string
  rybh: string
  ryxm: string
  xfxzid: number
  xzjsrq: null
  xzksrq: null
}
export interface ISelect {
  id: number
  index: number
  jgh: string
  jsh: string
  rybh: string
  ryxm: string
  xfxzid: number
  xzjsrq: string
  xzksrq: string
}
export interface IDatas {
  nameVal: string,
  showDialogry: boolean
  showRadio: boolean
  showIndex: boolean
  tableColumns: IColumn[]
  searchData: ISearchData,
  ruleForm: IRuleForm,
  rules: IRules,
  ruleFormRef: null | HTMLFormElement,
  bjxData: ICities[] | string,
  selectValue: string,
  multipleChoice: ISelect | ISelect[],
  options: []
}

// dateAdministrator
export type cityOptions = '周一' | '周二' | '周三' | '周四' | '周五' | '周六' | '周日';
export type cityType = cityOptions[]
export interface IItem {
  yi: Date[],
  er: Date[],
  san: Date[],
  si: Date[],
  wu: Date[],
  liu: Date[],
  ri: Date[],
}
export interface ICheckall {
  checkAll: boolean,
  checkedCities: cityType,
  cities: cityType,
  isIndeterminate: boolean,
  timeDate: IItem,
  isBool: boolean
}
