<template>
  <h-container class="viewSelected">
    <h-header height="30px">
      <totallistAll v-model:totallist="totallistGrandson"></totallistAll>
      <!-- <div class="batchCenter">
        <div>订单:<span class="colorRed">100</span>条</div>
        <div>总金额:<span class="colorRed">1588</span>元</div>
        <div>商品总数:<span class="colorRed">200</span></div>
      </div> -->
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
          <!-- {{row}} -->
          <div class="leftBtn">
          <span size="mini" @click="detailsClick(row.index, row)"
            >详情</span
          >
          </div>
          <!--  -->
          <!-- <h-popover
            placement="right"
            :width="400"
            trigger="click"
          >
            <template #reference>
              <span @click="childtable(row.index, row)">详情</span>
            </template>
            <h-table-block
              ref="tableBlockRef"
              :method="getTableChild"
              :table-option="tableOption"
              :show-paging="false"
              :page-sizes="[10, 20, 50, 100]"
              :table-columns="tableColumnsChild"
            >
            </h-table-block>
          </h-popover> -->
          <!--  -->
        </template>
      </h-table-block>
    </h-main>
  </h-container>
  <h-dialog-block
    ht="40%"
    wd="35%"
    :title="viewShow.title"
    v-model:showViewModel="viewShow.status"
  >
    <viewSelectedChiled :id="viewShow.id"></viewSelectedChiled>
  </h-dialog-block>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch, PropType, ref } from 'vue'
import { IColumn, ITableData, ITableOption } from '@/types/table'
import totallistAll from '@/views/financialManage/consumerOrderFinance/components/totallistAll.vue'
import viewSelectedChiled from '@/views/financialManage/consumerOrderFinance/components/viewSelectedChiled.vue'
// import row from 'node_modules/@hz-lib/han-ui-next/lib/h-col/src/row'
import ConsumerOrderFinance from '@/api/consumerOrderFinance/consumerOrderFinance'

interface IList {
  xm:string
  jsh:string
  xdsj: string
  xflx:string
  xfje:string
  dqye:string
  ddzt:string
  id?:string
}
interface IviewShow{
  title:string,
  status:boolean,
  id:any
}
interface Itotallist{
  order:number,
  totalAmount:number,
  totalGoods:number,
}
interface IState {
  tableOption:ITableOption
  tableColumns:IColumn[],
  tableColumnsChild:IColumn[]
  viewShow:IviewShow,
  totallistGrandson:Itotallist
}

export default defineComponent({
  name: 'Index',
  components: { viewSelectedChiled, totallistAll },
  props: {
    totallistArr: {
      type: Object as PropType<Itotallist>,
      default: {}
    },
    row: {
      type: Array
    }
  },
  setup(props) {
    const getTable = () => {
      return {
        list: props.row
      }
    }

    const state = reactive<IState>({
      tableOption: {
        showRadio: true,
        showIndex: true // 一个函数
      },
      tableColumns: [
        { prop: 'xm', title: '订单编号' },
        { prop: 'xm', title: '姓名' },
        { prop: 'jsh', title: '监室号' },
        { prop: 'xdsj', title: '消费时间' },
        { prop: 'xflx', title: '消费类型' },
        { prop: 'xfje', title: '消费金额' },
        { prop: 'dqye', title: '当前余额' },
        { title: '商品', hidden: true, slot: 'demoslot' }
      ],
      tableColumnsChild: [
        { prop: 'spmc', title: '商品' },
        { prop: 'jg', title: '价格' },
        { prop: 'sl', title: '数量' },
        { prop: 'je', title: '金额' },
        { prop: 'gg', title: '规格' },
      ],
      viewShow: {
        title: '商品详情',
        status: false,
        id: ''
      },
      totallistGrandson: {
        order: 0,
        totalAmount: 0,
        totalGoods: 0,
      }
    })
    watch(() => props.totallistArr.order, (v:any, c:any):void => {
      // console.log(v, 66666666666)
      state.totallistGrandson.order = v
    }, {
      immediate: true, // 绑定时加载
    })
    watch(() => props.totallistArr.totalAmount, (v:any, c:any):void => {
      state.totallistGrandson.totalAmount = v
    }, {
      immediate: true, // 绑定时加载
    })
    watch(() => props.totallistArr.totalGoods, (v:any, c:any):void => {
      state.totallistGrandson.totalGoods = v
      // console.log(v, c, 888)
    }, {
      immediate: true, // 绑定时加载
    })
    const selectionChange = () => {
      // console.log(data);
    }
    // 详情
    const detailsClick = async (index:number, row:IList) => {
      state.viewShow.status = true
      const id = row.id
      state.viewShow.id = id
    }
    let bool = false
    const tableBlockRef = ref()
    const childtable = async (index:number, row:IList) => {
      state.viewShow.id = row.id
      bool = true
      console.log('🚀 ~ file: viewSelected.vue ~ line 197 ~ childtable ~ tableBlockRef', tableBlockRef.value)
      if (tableBlockRef.value) {
        tableBlockRef.value.refresh()
      }
    }
    const getTableChild = async () => {
      let res:any = ''
      if (bool) {
        res = await ConsumerOrderFinance.shopDetailList({
          id: state.viewShow.id
        })
        bool = false
      }
      console.log(res !== '')
      return {
        list: res !== '' ? res.data : []
      }
    }
    return {
      ...toRefs(state),
      getTable,
      getTableChild,
      selectionChange,
      detailsClick, // 详情按钮
      childtable, //
      tableBlockRef,
    }
  }
})
</script>

<style lang="scss" scoped>
.viewSelected {
  height: 100%;
  width: 100%;
  .leftBtn{
    display: flex;
    justify-content: center;
    span{
      padding-right: 10px;
      color:#60a5f5;
      cursor: pointer;
    }
  }
  .batchCenter {
    display: flex;
    justify-content: space-around;
    // margin:10px 5px;
    .colorRed {
      color: #f00;
    }
  }
}
</style>
