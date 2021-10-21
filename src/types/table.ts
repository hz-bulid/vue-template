/*
 * @Author: your name
 * @Date: 2021-04-01 10:11:16
 * @LastEditTime: 2021-04-03 12:34:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\types\table.ts
 */

// 分页数据的返回结构
export interface ITableData<T> {
  list: T[]
  pageNum: number
  pageSize: number
  total: number
}

// tabel-block 操作按钮的样式
export type BtnType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
// tabel-block 操作按钮的大小
export type BtnSize = 'medium' | 'small' | 'mini'
// tabel-block 操作按钮的接口
export interface IOperates {
  name: string
  type?: BtnType
  size?: BtnSize
  show?: boolean
}
type ColumnType = 'nested'|'operate'
// tabel-block 表头的设置
export interface IColumn {
  title: string
  prop?: string
  width?: string
  hidden?: boolean
  operates?: IOperates[]
  slot?: string
  type?: ColumnType
}
// tabel-block 设置显示序号和多选的接口
export interface ITableOption {
  showRadio?: boolean
  showIndex?: boolean
}

type Nullable<T> = T | null;
export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
