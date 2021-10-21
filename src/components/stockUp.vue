<template>
  <div class="stockUp">
    <div class="upHeader">
      <h-button size="small" type="primary" @click="print()">打印</h-button>
    </div>
    <div class="upBody" id="content">
      <div class="upBodydh">
        <div>备货单号:{{ row.id }}</div>
      </div>

      <div class="upBodyList">
        <span
          >商品类型:&nbsp; &nbsp;{{ splb }}<span class="BodyListColor"></span
        ></span>
        <span
          >商品总数:&nbsp; &nbsp;{{ row.spsl
          }}<span class="BodyListColor"></span
        ></span>
        <span
          >总金额:&nbsp; &nbsp;{{ row.zje }}元<span class="BodyListColor"></span
        ></span>
        <span
          >包含订单:&nbsp; &nbsp;{{ row.dds }}条<span
            class="BodyListColor"
          ></span
        ></span>
      </div>
      <div class="upBodyTable">
        <h-table
          :header-cell-style="{ background: '#f6f8fa', color: '#333' }"
          :data="tableData"
          border
          style="width: 100%"
        >
          <h-table-column prop="spmc" label="商品名称"> </h-table-column>
          <h-table-column prop="num" label="数量"> </h-table-column>
          <h-table-column prop="price" label="商品单价"> </h-table-column>
          <h-table-column prop="gg" label="规格"> </h-table-column>
          <h-table-column prop="count" label="金额"> </h-table-column>
        </h-table>
      </div>
    </div>
    <div v-if="isButtonShow" class="stockUp_button">
      <h-button
        size="small"
        type="primary"
        style="margin-right: 30px"
        @click="changeStockUpState"
        >备货</h-button
      >
      <h-button size="small" @click="closeStockUpDialog">取消</h-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onUnmounted } from 'vue'
import { HMessageBox, HMessage } from '@hz-lib/han-ui-next'
import { callPrinter } from 'call-printer'
import StockList from '@/api/stockList/stockList'
interface ITableData {
      date: string,
      name: string,
      address: string,
      label: string
    }
interface IDatas {
      tableData:ITableData[]
      splb:string
    }
export default defineComponent({
  name: 'stockUp',
  props: {
    row: {
      default: null,
      type: Object
    },
    isButtonShow: {
      default: false,
      type: Boolean
    }
  },
  setup(props, context) {
    const state = reactive<IDatas>({
      tableData: [],
      splb: ''// 商品类别
    })
    // 获取备货单数据
    const getStockUp = async () => {
      const res = await StockList.getStockUpData({
        id: props.row.id,
        isPage: false,
        jgh: '420100131',
      })
      console.log('res1111', res)
      state.tableData = res.data.spxxList.list
      state.splb = res.data.splb
    }
    getStockUp()
    // 点击修改备货货状态
    const changeStockUpState = async () => {
      HMessageBox.confirm('对已选择单号备货操作，请确认选择无误！?', '确认备货', {
        confirmButtonText: '确认备货',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await StockList.getChangeDeliverGoods({
          // bh: props.row.id,
          bhqIds: [props.row.id],
          jgh: '420100131',
          type: '2'
        })
        if (res.code === '200') {
          context.emit('closeStockUpDialog')
          context.emit('refreshTable')
          HMessage({
            type: 'success',
            message: '备货成功!'
          })
        } else {
          HMessage({
            type: 'info',
            message: '备货失败!'
          })
        }
      }).catch(() => {

      })
    }
    // 关闭当前页面
    const closeStockUpDialog = () => {
      context.emit('closeStockUpDialog', false)
      context.emit('openStockUp', false)
    }
    onUnmounted(() => {
      context.emit('update:isButtonShow', false)
      console.log('aaaaaaaaaa')
    })
    const print = () => {
      const content:any = document.getElementById('content')
      callPrinter(content)
    }
    return {
      ...toRefs(state),
      getStockUp,
      changeStockUpState,
      closeStockUpDialog,
      print
    }
  }
})
</script>

<style lang="scss" scoped>
.stockUp {
  height: 450px;
  overflow: auto;
  .upHeader {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 16px;
    /* margin-bottom: 20px; */
    .headerSpan {
      width: 80%;
      text-align: center;
    }
  }
  .upBody {
    .upBodydh {
      display: flex;
      justify-content: space-between;
      height: 30px;
      line-height: 30px;
    }
    .upBodyList {
      border-bottom: 1px solid #f6f8fa;
      height: 45px;
      line-height: 45px;
      margin: 0px 0px 10px 0px;
    }
    .upBodyList {
      display: flex;
      justify-content: space-between;
      .BodyListColor {
        color: #d9001b;
      }
    }
  }
  .stockUp_button {
    position: absolute;
    bottom: 30px;
    left: 50%;
    margin-left: -76px;
  }
}
</style>
