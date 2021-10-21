/* eslint-disable vue/no-mutating-props */
<template>
  <div id="inpatientWardTable">
    <div class="upHeader">
      <span></span>
      <span>
        <h-button size="small" type="primary" @click="print()">打印</h-button>
      </span>
    </div>
    <div
      v-for="(formData, index) in formDatas"
      :key="index"
      style="display: inline; margin-right: 20px"
      v-show="isShowFormDate"
    >
      <span>{{ formData.title }}</span>
      <span>{{ formData.value }}</span>
    </div>
    <!-- 表格中渲染内容 -->
    <div>
      <h-tabs v-model="activeName" @tab-click="handleClick">
        <h-tab-pane
          :label="tableOption.qymc"
          :name="tableOption.qymc"
          v-for="tableOption in tableOptions"
          :key="tableOption.qybh"
        >
          <div id="content">
            <span>备货单号：{{ row.id }}</span>
            <div v-if="tableDatas.length !== 0">
              <div
                v-for="(tableData, index) in tableDatas"
                class="tableClass"
                :key="index"
              >
                <div>
                  <div class="jsTitle">{{ tableData.bqmc }}</div>
                  <div>
                    <table cellspacing="0" cellpadding="0">
                      <tr class="TableTh">
                        <th width="100">监室号</th>
                        <th width="100">姓名</th>
                        <th width="150px">商品</th>
                        <th>数量</th>
                        <th>单价</th>
                        <th>金额</th>
                        <th>签字</th>
                      </tr>
                      <template
                        v-for="(it, inx) in tableData.bsList"
                        :key="inx"
                      >
                        <template v-for="(spxx, j) in it.spxxList" :key="j">
                          <tr class="tableText">
                            <td v-show="j == 0" :rowspan="it.spxxList.length">
                              {{ it.jsmc }}
                            </td>
                            <td v-show="j == 0" :rowspan="it.spxxList.length">
                              {{ spxx.rymc }}
                            </td>
                            <td>
                              {{ spxx.spmc }}
                            </td>
                            <td>
                              {{ spxx.sl }}
                            </td>
                            <td>
                              {{ spxx.jg }}
                            </td>
                            <td>
                              {{ spxx.count }}
                            </td>
                            <td v-show="j == 0" :rowspan="it.spxxList.length">
                              {{}}
                            </td>
                          </tr>
                        </template>
                      </template>
                      <!-- <tr>
            <td v-for="(val, indexs) in it.spxxList" key="val"></td>
          </tr> -->
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="not_data">暂无数据</div>
          </div>
        </h-tab-pane>
      </h-tabs>
    </div>
    <!-- {{ row }} -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref, onUnmounted } from 'vue'
import StockList from '@/api/stockList/stockList'
import { callPrinter } from 'call-printer'
interface IBsList {
      count: string,
      ddId: string,
      ddmxId: string,
      gg: string,
      jg: string,
      jsh: string,
      jsmc: string,
      rybh: string,
      rymc: string,
      sl: string,
      spId: string,
      spmc: string,
      qz:string
    }
    interface ISspxxList {
      jsh: string,
      jsmc: string,
      spxxList: IBsList[]

    }
    interface ITableData {
      bqh: string
      bqmc: string
      bsList: ISspxxList[]
    }

    interface IObjectSpanMethod {
      rowspan: number,
      colspan: number
    }
    interface IColume {
      row:any,
      column:any,
      rowIndex:number,
      columnIndex:number
    }
    interface IformData {
      title:string
      value:string
    }
interface ITableOption {
      qybh: string,
      qymc: string,
        }
interface IState {
      tableDatas: ITableData[]
      formDatas:IformData[]
      tableOptions:ITableOption[]
    }
export default defineComponent({
  name: 'inpatientWardTable',
  props: {
    row: {
      default: null,
      type: Object
    },
    isShowFormDate: {
      default: false,
      type: Boolean
    },
    isShowPrint: {
      default: false,
      type: Boolean
    }
  },
  setup(props, context) {
    onUnmounted(() => {
      context.emit('isShowFormDateDefault', false)
    })
    const state = reactive<IState>({
      tableDatas: [],
      formDatas: [
        { title: '商品类型:', value: '0' },
        { title: '商品总数:', value: '0' },
        { title: '总金额:', value: '0' },
        { title: '包含订单数:', value: '0' },
      ],
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
    })
    // 查看有多少个
    const count = ():number[] => {
      const arr:number[] = []
      state.tableDatas.forEach(element => {
        let num = 0
        let name = element.bsList[0].spxxList[0].rymc
        element.bsList.forEach(tableData => {
          for (let index = 0; index < tableData.spxxList.length; index++) {
            const elements = tableData.spxxList[index]
            console.log(elements.rymc === name)
            if (elements.rymc === name) {
              num++
            } else {
              name = elements.rymc
              num = 1
              arr.push(num)
            }
          }
        })
      })
      return arr
    }
    // console.log(count())
    // 合并table
    const objectSpanMethod = ({ row, column, rowIndex, columnIndex }:IColume):any => {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
    // 获取所有大队+首个大队表单数据
    const getTableOption = async () => {
      const res = await StockList.getTableOptionData({
        jgh: '420100131',
        qybh: ''
      })
      state.tableOptions = res.data
      console.log('获取区域编号', res.data)
      const respect = await StockList.getAbnormalOrderData({
        bh: props.row.id,
        ddbh: '0',
        jgh: '420100131',
      })
      console.log('11111111111', respect)
      state.tableDatas = respect.data
    }
    getTableOption()
    const activeName = ref('一大队')
    const handleClick = async (tab:any) => { // #TODO:类型不明确
    // tab.index获取点击的序号
      const res = await StockList.getAbnormalOrderData({
        bh: props.row.id,
        ddbh: state.tableOptions[tab.index].qybh,
        jgh: '420100131',
      })
      state.tableDatas = res.data
    }
    getTableOption()
    const print = () => {
      const content:any = document.getElementById('content')
      callPrinter(content)
    }
    return {
      ...toRefs(state),
      objectSpanMethod,
      activeName,
      handleClick,
      print
    }
  }
})
</script>

<style lang="scss" scoped>
#inpatientWardTable {
  width: 100%;
  height: 600px;
  overflow: auto;
  padding: 0 30px;
  .upHeader {
    display: flex;
    justify-content: flex-end;
  }
  .tableClass {
    margin-top: 20px;
    table {
      width: 100%;
      border: 1px solid #eee;
      .TableTh {
        background: #f6f8fa !important;
        color: #333;
        font-size: 15px;
        height: 44px;
        th {
          border-left: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
      }
      .tableText {
        text-align: center;
        color: #333;
        font-size: 15px;
        height: 44px;
        td {
          border-left: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
  .jsTitle {
    color: #666;
    font-size: 16px;
    height: 50px;
    font-weight: bold;
  }
}
thead,
.h-table {
  color: black;
}
</style>
