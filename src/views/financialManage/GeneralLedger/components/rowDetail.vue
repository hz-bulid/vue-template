
<template>
  <!-- 财务总账详情弹框 -->
  <div id="rowDetail">
    <h-container>
      <h-header>
        <div class="first-row">
          <h-row>
            <h-col :span="4"
              ><div>结算编号：{{ row.jsbh }}</div>
            </h-col>
            <h-col :span="6"
              ><div>
                结算周期：{{ new Date(row.jsqssj).toLocaleDateString() }}-{{
                  new Date(row.jsjzsj).toLocaleDateString()
                }}
              </div></h-col
            >
            <h-col :span="6"
              ><div>结算日期：{{ row.jsrq }}</div></h-col
            >
          </h-row>
        </div>
        <h-row>
          <h-col :span="3"
            ><div class="money">余额(元)： {{ row.dqye }}</div></h-col
          >
          <h-col :span="4"
            ><div>上期余额（元）：{{ row.sqye }}</div></h-col
          >
          <h-col :span="4"
            ><div>当期余额（元）：{{ row.dqye }}</div></h-col
          >
        </h-row>
        <h-row>
          <h-col :span="3"
            ><div class="money">收入(元)：{{ row.srje }}</div></h-col
          >
          <h-col :span="4"
            ><div>收入金额（元）：{{ row.srje }}</div></h-col
          >
          <h-col :span="4"
            ><div>收入笔数（笔）：{{ row.srbs }}</div></h-col
          >
        </h-row>
        <h-row>
          <h-col :span="3"
            ><div class="money">支出(元)：{{ row.zcje }}</div></h-col
          >
          <h-col :span="4"
            ><div>支出金额（元）：{{ row.zcje }}</div></h-col
          >
          <h-col :span="4"
            ><div>支出笔数（笔）：{{ row.zcbs }}</div></h-col
          >
        </h-row>
        <h-button
          :type="showTableIncome ? 'primary' : 'info'"
          size="small"
          icon="h-icon-caret-bottom"
          @click="showIncome(true)"
          >收入(家属汇款)</h-button
        >
        <h-button
          :type="showTableIncome ? 'info' : 'primary'"
          size="small"
          icon="h-icon-caret-bottom"
          @click="showIncome(false)"
          >支出(转账付款)</h-button
        ></h-header
      >
      <h-main>
        <div class="table-block" v-show="showTableIncome">
          <h-table-block
            height="350px"
            :method="getTableIncome"
            :show-paging="true"
            :table-columns="tableColumnsIncome"
          >
          </h-table-block>
        </div>
        <div class="table-block" v-show="!showTableIncome">
          <h-table-block
            height="350px"
            :method="getTableExpenditure"
            :show-paging="true"
            :table-columns="tableColumnsExpenditure"
          >
          </h-table-block>
        </div>
      </h-main>
    </h-container>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs } from 'vue'
import GeneralLedger from '@/api/generalLedger/generalLedger'
type BtnType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
type BtnSize = 'medium'| 'small'| 'mini'
type ColumnType = 'operate' |'selection'
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
interface IState {
  tableColumnsIncome:IColumn[]
  tableColumnsExpenditure:IColumn[]
  searchData:ISearchData
  showTableIncome:boolean,
  showTableExpenditure:boolean
}
export default defineComponent({
  name: 'rowDetail',
  props: {
    row: {
      default: null,
      type: Object
    }
  },
  setup(props:any) {
    // 获取收入表单数据
    const getTableIncome = async (data:any) => {
      console.log('🚀 ~ file: index.vue ~ line 73 ~ getTable ~ data')
      const res = await GeneralLedger.getTableIncomeData({
        bh: props.row.jsbh,
        id: 0,

      })
      // console.log('2222222222', res)
      return new Promise(resolve => {
        resolve(res.data)
      })
    }
    // 获取支出表单数据
    const getTableExpenditure = async () => {
      console.log('🚀 ~ file: index.vue ~ line 73 ~ getTable ~ data')
      const res = await GeneralLedger.getTableExpenditureData({
        bh: props.row.jsbh,
        id: 0,
      })
      // console.log('1111111111', res)
      return new Promise(resolve => {
        resolve(
          res.data
        )
      })
    }
    const tableBlockRef = ref<HTMLDivElement | null>(null)
    // 组件数据
    const state = reactive<IState>({
      tableColumnsIncome: [
        { prop: 'ddbh', title: '订单编号' },
        { prop: 'hkrq', title: '汇款日期' },
        { prop: 'qsrq', title: '签收日期' },
        { prop: 'ryxm', title: '被监管人姓名' },
        { prop: 'sfzh', title: '身份证号' },
        { prop: 'hkje', title: '汇款金额' },
        { prop: 'hkfy', title: '汇款附言' },
        // { title: "自定义", hidden: true, slot: "demoslot" },
      ],
      tableColumnsExpenditure: [
        { prop: 'zzbh', title: '转账编号' },
        { prop: 'jsbh', title: '结算编号' },
        { prop: 'jsrq', title: '结算日期' },
        { prop: 'jsje', title: '结算金额' },
        { prop: 'jsfs', title: '结算方式' },
        { prop: 'skf', title: '收款人' },
        { prop: 'dqzt', title: '当前状态' },
        // { title: "自定义", hidden: true, slot: "demoslot" },
      ],
      searchData: {
        area: 66
      },
      showTableIncome: true,
      showTableExpenditure: false
    })
    // 处理收入、支出表格切换
    const showIncome = (bool:boolean) => {
      state.showTableIncome = bool
      state.showTableExpenditure = !bool
    }

    return {
      ...toRefs(state),
      getTableIncome,
      getTableExpenditure,
      tableBlockRef,
      showIncome
    }
  }

})
</script>

<style lang="scss" scoped>
@import "~@/assets/style/utils.scss";
#rowDetail {
  width: 100%;
  height: 100%;
  display: flex;
  .h-header {
    height: auto !important;
    font-size: 16px;
    .first-row {
      border-bottom: 1px solid #eeeeee;
      padding: 30px 0px 20px 0px;
      margin-bottom: 20px;
    }
    .h-row {
      margin-bottom: 25px;
      /* font-size: 800; */
      &:last-child {
        margin-bottom: 0;
      }
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }
  .h-main {
    width: 100%;
  }
}
</style>
