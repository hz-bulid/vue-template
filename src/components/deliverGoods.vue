
<template>
  <!-- 发货按钮弹框 -->
  <div id="deliverGoods">
    <h-container>
      <h-header>
        <div class="first-row">
          <h-button type="primary" size="small" @click="print()">打印</h-button>
        </div>
      </h-header>
      <!-- 数据表格内容显示区 -->
      <h-main>
        <h-tabs v-model="activeName" @tab-click="handleClick">
          <h-tab-pane
            :label="tableOption.qymc"
            :name="tableOption.qymc"
            v-for="tableOption in tableOptions"
            :key="tableOption.qybh"
            @click="getTableData"
          >
            <div id="content">
              <div>备货单号：{{ row.id }}</div>
              <div v-if="tableDatas.length !== 0" class="table_total">
                <div v-for="(tableData, index) in tableDatas" :key="index">
                  <div class="content">
                    <p class="table_title">{{ tableData.qymc }}</p>
                    <table border="1">
                      <tr>
                        <th>名称</th>
                        <th>数量</th>
                        <th>单价</th>
                        <th>金额</th>
                      </tr>
                      <tr
                        v-for="(spxx, index) in tableData.spxxList"
                        :key="index"
                      >
                        <td width="250px">{{ spxx.spmc }}</td>
                        <td width="250px">{{ spxx.jg }}</td>
                        <td width="250px">{{ spxx.sl }}</td>
                        <td width="250px">{{ spxx.amount }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div v-else class="not_data">
                <div>暂无数据</div>
              </div>
            </div>
          </h-tab-pane>
        </h-tabs>
      </h-main>
    </h-container>
    <div
      v-if="tableDatas.length !== 0 && isButtonShow"
      class="deliverGoods_button"
    >
      <h-button
        type="primary"
        style="margin-right: 30px"
        size="small"
        @click="changeDeliverGoodsState"
        >发货</h-button
      >
      <h-button size="small" @click="closeDeliverGoodsDialog">取消</h-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, watch, onUnmounted } from 'vue'
import { HMessageBox, HMessage } from '@hz-lib/han-ui-next'
import StockList from '@/api/stockList/stockList'
import { callPrinter } from 'call-printer'
interface IbqData {
        goods: string,
        number: number,
        price: number,
        amount: number,
        }
interface IbqId {
        bqId:string,
        bqDatas:IbqData[]
        }
interface ITableOption {
      qybh: string,
      qymc: string,
        }
interface IState {
  tableOptions:ITableOption[]
  tableDatas:IbqId[],
  IDs:string[],
  rowID:string[]
}
export default defineComponent({
  name: 'deliverGoods',
  props: {
    row: {
      default: null,
      type: Object
    },
    multipleSelection: {
      default: null,
      type: Array
    },
    batchDialog: {
      default: null,
      type: Object
    },
    isButtonShow: {
      default: false,
      type: Boolean
    }
  },
  setup(props:any, context) {
    const state = reactive<IState>({
      tableOptions: [
        {
          qybh: '1',
          qymc: '一大队',
        },
        {
          qybh: '2',
          qymc: '二大队',
        }
      ],
      tableDatas: [
      ],
      IDs: [],
      rowID: []
    })
    // // 获取批量发货中的ID数组
    // 获取所有大队+首个大队表单数据
    const getTableOption = async () => {
      const res = await StockList.getTableOptionData({
        jgh: '420100131',
        qybh: ''
      })
      state.tableOptions = res.data

      const respect = await StockList.getDeliverGoodsTableData({
        bh: props.row.id,
        ddbh: '1',
        jgh: '420100131',
      })
      state.tableDatas = respect.data
    }
    // 执行  获取所有大队+首个大队表单数据
    getTableOption()

    // 获取点击大队表格信息
    const getTableData = async () => {
    }
    const activeName = ref('一大队')
    const handleClick = async (tab:any) => { // #TODO:类型不明确
    // tab.index获取点击的序号
      const res = await StockList.getDeliverGoodsTableData({
        // bh: props.row.id,
        bh: props.row.id,
        ddbh: state.tableOptions[tab.index].qybh,
        jgh: '420100131',
      })
      state.tableDatas = res.data
    }
    watch(() => props.multipleSelection, (v) => {
      state.IDs = (v || []).map((obj:any) => {
        return obj.id
      }).join(',').split(',')

      console.log(state.IDs, 555555555555555555555)
    }, { immediate: true })
    // 点击修改发货状态
    const changeDeliverGoodsState = async () => {
      // 此请求实现弹窗打开后获取默认大队对应表单
      let id:any = []
      if (props.batchDialog.type === 'batchDeliverGoods') {
        id = state.IDs
        console.log('id1111111111', id)
      } else {
        id = [props.row.id]
        console.log('id222222222222', id)
      }
      HMessageBox.confirm('对已选择单号发货操作，请确认选择无误！?', '确认发货', {
        confirmButtonText: '确认发货',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await StockList.getChangeDeliverGoods({
          bhqIds: id,
          jgh: '420100131',
          type: '3'
        })
        if (res.code === '200') {
          context.emit('closeDeliverGoodsDialog')
          context.emit('refreshTable')
          HMessage({
            type: 'success',
            message: '发货成功!'
          })
        } else {
          HMessage({
            type: 'info',
            message: '发货失败!'
          })
        }
      }).catch(() => {

      })
    }
    // 关闭当前页面
    const closeDeliverGoodsDialog = () => {
      context.emit('closeDeliverGoodsDialog', false)
    }
    onUnmounted(() => {
      context.emit('update:isButtonShow', false)
      console.log('aaaaaaaaaa')
    })

    // 打印
    const print = () => {
      const content:any = document.getElementById('content')
      callPrinter(content)
    }
    return {
      ...toRefs(state),
      getTableOption,
      getTableData,
      activeName,
      handleClick,
      changeDeliverGoodsState,
      closeDeliverGoodsDialog,
      print
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~@/assets/style/utils.scss";
#deliverGoods {
  width: 100%;
  height: 100%;
  .h-header {
    height: 35px !important;
    .first-row {
      display: flex;
      justify-content: flex-end;
    }
  }
  .h-main {
    width: 100%;
    height: 400px;
    overflow: auto;
    padding: 0px 20px;
    .h-tabs {
      width: 100%;
      .table_total {
        .content {
          /* height: 100% !important; */
          .table_title {
            color: #333333;
            margin-bottom: 15px;
            margin-top: 5px;
            font-size: 16px;
            font-weight: 400;
          }
          table {
            border-collapse: collapse;
            margin: 0 auto;
            text-align: center;
            width: 100%;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 4px;
            tr {
              height: 44px;
            }
            th {
              background: #f6f8fa;
            }
          }
        }
      }

      .not_data {
        margin-top: 100px;
        padding-left: 45%;
      }
    }
  }
  .deliverGoods_button {
    width: 100%;
    position: absolute;
    bottom: 30px;
    margin-left: 40%;
  }
}
</style>
