<template>
  <h-container class="orderApproval">
    <h-header height="30px">
      <div class="batchCenter">
        <div>订单:<span class="colorRed">100</span>条</div>
        <div>总金额:<span class="colorRed">1588</span>元</div>
        <div>商品总数:<span class="colorRed">200</span></div>
      </div>
    </h-header>
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
          <h-button size="mini" @click="detailsClick(row.index, row)"
            >详情</h-button
          >
          <!-- <span> 94651651651561 {{ row.anme }} </span> -->
        </template>
      </h-table-block>
    </h-main>
    <h-footer class="footer">
      <h-button type="primary" size="mini">全部通过</h-button>
      <h-button size="mini">全部驳回</h-button>
    </h-footer>
  </h-container>
  <h-dialog-block
    ht="40%"
    wd="35%"
    :title="viewShow.title"
    v-model:showViewModel="viewShow.status"
  >
    <viewSelectedChiled></viewSelectedChiled>
  </h-dialog-block>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { IColumn, ITableData, ITableOption } from '@/types/table'
import viewSelectedChiled from '@/views/financialManage/consumerOrderFinance/components/viewSelectedChiled.vue'

interface IList {
  date: string
  name:string
  address:string
}
interface IviewShow{
  title:string,
  status:boolean
}
interface IState {
  tableOption:ITableOption
  tableColumns:IColumn[],
  viewShow:IviewShow
}
export default defineComponent({
  name: 'Index',
  components: { viewSelectedChiled },
  setup() {
    const getTable = ():ITableData<IList> => {
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
        { prop: 'name', title: '病室' },
        { prop: 'name', title: '姓名' },
        { prop: 'date', title: '商品' },
        { prop: 'address', title: '合计' },
        // { prop: 'address', title: '消费类型' },
        // { prop: 'address', title: '消费金额' },
        // { prop: 'address', title: '当前余额' },
        // { title: '商品', hidden: true, slot: 'demoslot' }
      ],
      viewShow: {
        title: '商品详情',
        status: false
      }
    })
    const selectionChange = () => {
      // console.log(data);
    }
    // 详情
    const detailsClick = () => {
      state.viewShow.status = true
    }
    return {
      ...toRefs(state),
      getTable,
      selectionChange,
      detailsClick
    }
  }
})
</script>

<style lang="scss" scoped>
.orderApproval {
  height: 100%;
  width: 100%;
  .batchCenter {
    display: flex;
    justify-content: space-around;
    // margin:10px 5px;
    .colorRed {
      color: #f00;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    height: 30px !important;
  }
}
</style>
