/*
 * @Author: wsx
 * @Date: 2021-03-27 10:31:01
 * @LastEditTime: 2021-04-06 20:04:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finance\src\types\global.d.ts
 */

declare type Recordable<T extends any = any> = Record<string, T>;

declare type Indexable<T extends any = any> = {
    [key: string]: T;
};
interface ITable {
    list: IList[]
    pageNum: number
    pageSize: number
    total: number
}
interface ITablefy {
    area: number
    pageNum: number
    pageSize: number
    total: number
}
// 分页数据的返回结构
interface ITableData<T> {
    list: T[]
    pageNum: number
    pageSize: number
    total: number
}

// tabel-block 操作按钮的样式
type BtnType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
// tabel-block 操作按钮的大小
type BtnSize = 'medium' | 'small' | 'mini'
// tabel-block 操作按钮的接口
interface IOperates {
    name: string
    type?: BtnType
    size?: BtnSize
    show?: boolean
}
type ColumnType = 'nested' | 'operate'
// tabel-block 表头的设置
interface IColumn {
    title: string
    prop?: string
    width?: string
    hidden?: boolean
    operates?: IOperates[]
    slot?: string
    type?: ColumnType
}
// tabel-block 设置显示序号和多选的接口
interface ITableOption {
    showRadio?: boolean
    showIndex?: boolean
}

type Nullable<T> = T | null;
type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
