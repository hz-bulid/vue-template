export interface IStockListDate {
  jgh: string
  qybh?:string
}
export interface IDeliverGoodsTableData {
  bh?: string[]
  ddbh:string
  jgh: string
}
export interface IStockOrderListData {
  isPage: boolean
  pageNum:number
  pageSize :number
  id:string
  bhr:string
  isFh:string
  endTime:string
  startTime:string
}
export interface IStockUpData {
  id:string
  isPage:boolean
  jgh: string

}
export interface IProgressData {
  jgh: string
  bh?: string[]
}
export interface IChangeDeliverGoods {
  bhqIds:string[],
  type: string
  jgh: string
}
