<!--
 * @Author: your name
 * @Date: 2021-03-31 17:10:54
 * @LastEditTime: 2021-04-03 12:41:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \han-ui-next\website\play\index.vue
-->
<template>
  <h-container>
    <h-aside width="200px">Aside</h-aside>
    <h-container>
      <h-header>Header</h-header>
      <h-main>
        <h-table-block
          :method="getTable"
          :table-option="tableOption"
          :show-paging="true"
          :page-sizes="[10, 20, 50, 100]"
          :table-columns="tableColumns"
          @selection-change="selectionChange"
        >
          <template #demoslot="{ row }">
            <span> 94651651651561 {{ row.anme }} </span>
          </template>
        </h-table-block>
      </h-main>
    </h-container>
  </h-container>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
interface IList {
  date: string
  name:string
  address:string
}
interface ITableData {
  list: IList[]
  pageNum: number
  pageSize: number
  total:number
}
type BtnType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
type BtnSize = 'medium'| 'small'| 'mini'
interface IOperates{
  name: string
  type?: BtnType
  size?:BtnSize
}
interface IColumn{
  title: string
  prop?: string
  width?: string
  hidden?: boolean
  operates?:IOperates[]
  slot?:string
  type?:string
}

interface ITableOption{
  showRadio?: boolean
  showIndex?: boolean
}

interface IState {
  tableOption:ITableOption
  tableColumns:IColumn[]
}
export default defineComponent({
  name: 'Index',
  setup() {
    const getTable = ():ITableData => {
      return {
        list: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        pageNum: 1,
        pageSize: 10,
        total: 20
      }
    }
    const state = reactive<IState>({
      tableOption: {
        showRadio: true,
        showIndex: true // 一个函数
      },
      tableColumns: [
        { prop: 'name', title: '姓名' },
        { prop: 'date', title: '时间' },
        { title: '自定义', hidden: true, slot: 'demoslot' },
        { prop: 'address', title: '地址' },
        {
          title: '操作',
          type: 'operate',
          operates: [
            { name: '详情', type: 'primary', size: 'mini' }
          ]
        }
      ]
    })
    const selectionChange = () => {
      // console.log(data);
    }
    return {
      ...toRefs(state),
      getTable,
      selectionChange
    }
  }
})
</script>

<style lang="scss" scoped>
#index {
  width: 100%;
  height: 100%;
}
</style>
