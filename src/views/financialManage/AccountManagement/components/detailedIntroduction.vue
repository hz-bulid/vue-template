<template>
  <div id="index">
    <h-table-block
      height="480px"
      ref="tableBlockRef"
      :method="getTableIncome"
      :show-paging="false"
      :table-columns="tableColumnsData"
    >
      <template #hkrqslot="{ row }">
        <span>{{ formatDateYMD(new Date(row.hkrq)) }}</span>
      </template>
      <template #qsrqslot="{ row }">
        <span>{{ formatDateYMD(new Date(row.qsrq)) }}</span>
      </template>
    </h-table-block>
  </div>
</template>

<script lang='ts'>
import { formatDateYMD } from '@/utils/library/TimeOperations'
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import accountManagement from '@/api/accountManagement/accountManagement'
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
type ColumnType = 'nested'|'operate'
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
  type?:ColumnType
}
interface ISearchData{
  area:number
}
interface IRow {
  bhr: string
  bhrq: string
  cjrq: string
  dds: string
  ddzt: string
  ddztValue:string
  fhr: null
  fhrq: string
  id: string
  index: number
  isFh: string
  isJs:string
  jgh: string
  jsrq: null
  qrrs: string
  splb: string
  spsl: string
  zje: string
  zrs: string
}
interface IState {
  showRadio: boolean
  showIndex: boolean
  tableColumns:IColumn[]
  searchData:ISearchData
  tableColumnsIncome:IColumn[],
  tableColumnsData:IColumn[]
}
export default defineComponent({
  props: {
    detailData: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    let dataList:any = {}
    const getTableIncome = async () => {
      let res:any = { list: [] }
      if (dataList) {
        switch (dataList.jylx) {
          case '3':
            res = await accountManagement.orderDetailList({ id: dataList.id, jgh: 420100131 })
            state.tableColumnsData = state.tableColumnsIncome
            res = { list: res.data }
            break
          case '2':
            res = await accountManagement.particulars({ glid: dataList.glid, jgh: 420100131 })
            state.tableColumnsData = state.tableColumns
            res = { list: [res.data] }
            break
          default:
            break
        }
      }
      console.log(res)
      return res
    }
    const tableBlockRef = ref()
    const state = reactive<IState>({
      showRadio: false,
      showIndex: false, // 一个函数
      tableColumnsData: [],
      tableColumns: [
        { prop: 'ddbh', title: '订单编号' },
        { prop: 'hkfy', title: '汇款附言' },
        { prop: 'hkje', title: '汇款金额' },
        { title: '汇款日期', hidden: true, slot: 'hkrqslot' },
        { title: '签收日期', hidden: true, slot: 'qsrqslot' },
        { prop: 'sfzh', title: '身份证号' },
        { prop: 'zyr', title: '人员姓名' },
      ],
      searchData: {
        area: 66,
      },
      tableColumnsIncome: [
        { prop: 'bhdh', title: '备货单号' },
        { prop: 'bz', title: '备注' },
        { prop: 'dqye', title: '当前余额' },
        { prop: 'fssj', title: '监室号' },
        { prop: 'nr', title: '内容' },
        { prop: 'sjmc', title: '事件名称' },
        { prop: 'spjg', title: '审批结果' },
        { prop: 'spyj', title: '审批意见' },
        { prop: 'xfje', title: '消费金额' },
        { prop: 'xflx', title: '审批结果' },
        { prop: 'xm', title: '姓名' },
        // { title: "自定义", hidden: true, slot: "demoslot" },
      ],
    })
    const selectionChange = (data:any) => {
      console.log(data)
    }
    // 点击操作按钮
    const handleOperate = (operate:any, row:any, scope:any) => {
      console.log(operate, row, scope)
      if (tableBlockRef.value) {
        tableBlockRef.value.refresh()
      }
    }
    watch(() => (props.detailData), (v) => {
      dataList = v
      tableBlockRef.value && tableBlockRef.value.refresh()
    })
    return {
      ...toRefs(state),
      handleOperate,
      tableBlockRef,
      selectionChange,
      getTableIncome,
      formatDateYMD
    }
  }
})
</script>
