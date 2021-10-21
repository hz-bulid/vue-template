<template>
  <div id="stockList">
    <h-container>
      <!-- 左侧按钮数据栏 -->
      <h-aside width="16vw">
        <h-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>备货单 </span>
            </div>
          </template>
          <div class="card-bottom">
            <div
              :class="{ isactive: areaidclick == leftList.code }"
              class="card-list"
              v-for="(leftList, index) in leftLists"
              :key="index"
              @click="getleftListClick(leftList.code)"
            >
              <div class="h-statscard__header">{{ leftList.key }}</div>
              <div class="h-statscard__content">{{ leftList.num }}</div>
            </div>
          </div>
        </h-card>
      </h-aside>
      <h-container>
        <!-- 右侧头部信息栏   -->
        <h-header height="auto">
          <h-form
            :inline="true"
            :model="formInline"
            ref="ruleFormRef"
            class="demo-form-inline"
            size="small"
          >
            <!-- 右侧头部信息第一行 -->
            <div class="first_row">
              <div class="first_row_left">
                <h-form-item label="备货编号" prop="id">
                  <h-input
                    v-model="formInline.id"
                    placeholder="请输入内容"
                  ></h-input>
                </h-form-item>
                <h-form-item label="备货人" prop="bhr">
                  <h-input
                    v-model="formInline.bhr"
                    placeholder="请输入内容"
                  ></h-input>
                </h-form-item>
                <h-form-item label="是否完成发货" prop="isFh">
                  <h-select v-model="formInline.isFh" placeholder="请选择">
                    <h-option
                      v-for="(item, index) in inputList"
                      :key="index"
                      :label="item.lable"
                      :value="item.value"
                    ></h-option>
                  </h-select>
                </h-form-item>
              </div>
              <!-- 查询重置按钮 -->
              <div class="first_row_right">
                <h-form-item>
                  <h-button type="primary" size="small" @click="searchData"
                    >查询</h-button
                  >
                  <h-button type="primary" @click="resetForm('formInline')"
                    >重置</h-button
                  >
                </h-form-item>
              </div>
            </div>
            <!-- 右侧头部信息第二行 -->
            <div class="second_row">
              <h-form-item label="结算日期" prop="startTime">
                <h-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formInline.startTime"
                  style="width: 100%"
                  size="small"
                ></h-date-picker>
              </h-form-item>
              <h-form-item label="至" prop="endTime">
                <h-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formInline.endTime"
                  style="width: 100%"
                  size="small"
                ></h-date-picker>
              </h-form-item>
            </div>
            <!-- 右侧头部信息第三行 -->
            <div class="third_row">
              <!-- 发货、打印单据按钮 -->
              <h-form-item>
                <h-button
                  type="primary"
                  size="small"
                  @click="batchDeliverGoodsbtn"
                  >发货</h-button
                >
              </h-form-item>
              <h-form-item>
                <h-dropdown>
                  <h-button type="primary">
                    打印单据<i class="h-icon-arrow-down h-icon--right"></i>
                  </h-button>
                  <!-- <template #dropdown>
                    <h-dropdown-menu>
                      <h-dropdown-item>备货单</h-dropdown-item>
                      <h-dropdown-item>配货单</h-dropdown-item>
                      <h-dropdown-item>确认单</h-dropdown-item>
                    </h-dropdown-menu>
                  </template> -->
                </h-dropdown>
              </h-form-item>
            </div>
          </h-form>
        </h-header>
        <!-- 数据表格内容显示区 -->
        <h-main>
          <h-table-block
            ref="tableBlockRef"
            :method="getTable"
            :params="formInline"
            :table-option="tableOption"
            :show-paging="true"
            :page-sizes="[10, 20, 50, 100]"
            :table-columns="tableColumns"
            :showRadio="true"
            @selection-change="selectionChange"
          >
            <template #demoslot="{ row }" width="500px">
              <div class="leftBtn">
                <span
                  v-if="row.ddzt == '2'"
                  type="primary"
                  size="small"
                  @click="deliverGoodsClick(row.index, row)"
                  >发货</span
                >
                <span
                  type="primary"
                  size="small"
                  @click="detailsClick(row.index, row)"
                  >详情</span
                >
                <span
                  v-if="row.ddzt == '1'"
                  type="primary"
                  size="small"
                  @click="stockUpClick(row.index, row)"
                  >备货</span
                >
                <span>
                  <h-dropdown size="small" v-if="row.ddzt != '1'">
                    <span type="primary" size="small" style="margin-left: 10px">
                      打印单据<i class="h-icon-arrow-down h-icon--right"></i>
                    </span>
                    <template #dropdown>
                      <h-dropdown-menu>
                        <h-dropdown-item @click="stockUpClick(row.index, row)"
                          >备货单</h-dropdown-item
                        >
                        <h-dropdown-item
                          @click="deliverGoodsClick(row.index, row)"
                          >配货单</h-dropdown-item
                        >
                        <h-dropdown-item @click="confirmClick(row.index, row)"
                          >确认单</h-dropdown-item
                        >
                      </h-dropdown-menu>
                    </template>
                  </h-dropdown>
                </span>
                <span
                  type="danger"
                  @click="abnormalOrder(row.index, row)"
                  size="small"
                  class="normal"
                >
                  异常订单
                </span>
              </div>
            </template>
          </h-table-block>
        </h-main>
      </h-container>
    </h-container>
    <!-- 批量发货 -->
    <h-dialog-block
      ht="80%"
      :title="batchDialog.title"
      v-model:showViewModel="batchDialog.statue"
    >
      <deliverGoods
        :row="batchDialog.row"
        :multipleSelection="multipleSelection"
        :batchDialog="batchDialog"
        @refreshTable="searchData"
        @close="batchDialog.statue = false"
      ></deliverGoods>
    </h-dialog-block>
    <!-- 表格中  详情按钮 弹框 -->
    <h-dialog-block
      ht="60%"
      :title="bindDialog.title"
      v-model:showViewModel="bindDialog.detialDialog"
    >
      <particulars
        :row="bindDialog.row"
        @openStockUp="openStockUp"
        @openDeliverGoods="openDeliverGoods"
        @openInpatientWardTable="openInpatientWardTable"
      ></particulars>
    </h-dialog-block>
    <!-- 表格中  发货按钮 弹框 -->
    <h-dialog-block
      ht="60%"
      wd="60%"
      :title="bindDialog.title"
      v-model:showViewModel="bindDialog.deliverGoodsDialog"
    >
      <deliverGoods
        :row="bindDialog.row"
        :multipleSelection="multipleSelection"
        :batchDialog="batchDialog"
        v-model:isButtonShow="isButtonShow"
        @refreshTable="searchData"
        @closeDeliverGoodsDialog="closeDialog"
      ></deliverGoods>
    </h-dialog-block>
    <!-- 表格中  备货按钮  弹框 -->
    <h-dialog-block
      ht="60%"
      :title="bindDialog.title"
      v-model:showViewModel="bindDialog.stockUpShow"
    >
      <stock-up
        :row="bindDialog.row"
        v-model:isButtonShow="isButtonShow"
        @refreshTable="searchData"
        @closeStockUpDialog="closeDialog"
      ></stock-up>
    </h-dialog-block>
    <!-- 表格中  打印单据中确认按钮  弹框 -->
    <h-dialog-block
      ht="80%"
      :title="bindDialog.title"
      v-model:showViewModel="bindDialog.inpatientWardTableShow"
    >
      <inpatientWardTable
        :row="bindDialog.row"
        :isShowFormDate="isShowFormDate"
        @isShowFormDateDefault="isShowFormDateDefault"
      >
      </inpatientWardTable>
    </h-dialog-block>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { HMessage } from '@hz-lib/han-ui-next'
import deliverGoods from '@/components/deliverGoods.vue'
import stockUp from '@/components/stockUp.vue'
import particulars from '@/components/particulars.vue'
import inpatientWardTable from '@/components/inpatientWardTable.vue'
import { IColumn, ITableData, ITableOption } from '@/types/table'
import StockList from '@/api/stockList/stockList'
import { IStockOrderListData } from '@/api/stockList/model/stockList'
// 表格
interface IList {
  id:number
  spsl:string
  dds:string
  zje:string
  bhr:string
  bhrq:string
  ddzt:string
  fhrq:string
}
// 表单
interface IFormInline {
  id: string,
  bhr: string,
  isFh:string,
  zt:string
  jgh:string
  isPage: boolean,
  pageNum: number,
  pageSize: number,
}
interface IleftList{
  key: string,
  num: string,
}
// 下拉框
interface INputLists{
  value:string,
  lable:string,
}
interface IState {
  tableOption:ITableOption,
  tableColumns:IColumn[],
  formInline: IFormInline,
  ruleFormRef:null | HTMLFormElement,
  inputList:INputLists[]
  leftLists:IleftList[],
  activeTab:string,
  multipleSelection:IList[],
  bindDialog:{
    deliverGoodsDialog: boolean,
    detialDialog: boolean,
    stockUpShow: boolean,
    inpatientWardTableShow: boolean,
    title:string,
    id:number,
    row:IList
  },
  batchDialog:{
    statue:boolean,
    title:string,
    type:string,
    row:IList[]
  },
  isShowFormDate:boolean,
  isButtonShow:boolean,
  stateArry:[],
  areaidclick: string,

}

export default defineComponent({
  name: 'stockList',
  components: {
    stockUp,
    particulars,
    deliverGoods,
    inpatientWardTable
  },
  setup() {
    // 表格信息 已完成
    const getTable = async (data:IStockOrderListData) => {
      console.log('🚀 ~ file: index.vue ~ line 73 ~ getTable ~ data', data)
      const res = await StockList.getStockOrderListData(data)
      // console.log('111111111', res.data.list)
      const stateArry = res.data.list.map((obj:any) => {
        return obj.ddzt
      }).join(',').split(',')
      state.stateArry = stateArry
      return new Promise(resolve => {
        resolve(
          res.data
        )
      })
    }
    const state = reactive<IState>({
      tableOption: {
        showRadio: true,
        showIndex: true
      },
      tableColumns: [// type="selection" width="55"
        { prop: 'id', title: '备货单编号' },
        { prop: 'spsl', title: '商品总数' },
        { prop: 'dds', title: '包含订单数' },
        { prop: 'zje', title: '总金额' },
        { prop: 'bhr', title: '备货人' },
        { prop: 'bhrq', title: '备货日期' },
        { prop: 'ddztValue', title: '订单状态' },
        { prop: 'fhrq', title: '发货日期' },
        { title: '操作', slot: 'demoslot', width: '300px', }
      ],
      formInline: {
        id: '', // 备货编号
        bhr: '', // 备货人
        isFh: '', // 是否完成发货
        zt: '', // 状态
        jgh: '420100131', // 机构号
        isPage: true,
        pageNum: 1,
        pageSize: 5
      },
      ruleFormRef: null,
      inputList: [
        {
          value: '1',
          lable: '是'
        },
        {
          value: '2',
          lable: '否'
        }
      ],
      multipleSelection: [
        {
          id: 0,
          spsl: 'string',
          dds: 'string',
          zje: 'string',
          bhr: 'string',
          bhrq: 'string',
          ddzt: 'string',
          fhrq: 'string'
        }
      ],
      leftLists: [
        {
          key: '全部',
          num: '00'
        },
        {
          key: '待备货',
          num: '00'
        },
        {
          key: '待发货',
          num: '00'
        },
        {
          key: '已发货',
          num: '00'
        },
        {
          key: '待结算',
          num: '00'
        },
        {
          key: '已结算',
          num: '00'
        }
      ],
      activeTab: '全部',
      bindDialog: {
        deliverGoodsDialog: false,
        detialDialog: false,
        stockUpShow: false,
        inpatientWardTableShow: false,
        title: '',
        id: 12,
        row: {
          id: 0,
          spsl: '',
          dds: '',
          zje: '',
          bhr: '',
          bhrq: '',
          ddzt: '',
          fhrq: ''
        }
      },
      batchDialog: {
        statue: false,
        title: '批量确认收货',
        type: '',
        row: []
      },
      isShowFormDate: false,
      isButtonShow: false,
      stateArry: [],
      areaidclick: '',

    })
    // 复选框
    const selectionChange = (val:IList[]) => { // index:number,val:IList
      console.log('val', val)
      state.multipleSelection = val
    }
    // 左侧下方  已完成
    const leftTab = async () => {
      const res = await StockList.getStockListData({
        jgh: '420100131'
      })
      console.log(res.data)
      state.leftLists = res.data
    }
    leftTab()
    // 查询按钮  已完成
    const searchData = () => {
      if (tableBlockRef.value) {
        tableBlockRef.value.refresh()
      }
    }
    // 重置按钮  已完成
    const resetForm = (): void => {
      if (state.ruleFormRef) {
        state.ruleFormRef.resetFields()
      }
    }
    // 表单中 发货按钮
    const deliverGoodsClick = (index:number, row:IList) => {
      // datas.bindDialog
      state.bindDialog.id = 15
      state.bindDialog.deliverGoodsDialog = true
      state.isButtonShow = true
      state.bindDialog.row = row
      state.bindDialog.title = '发货'
      console.log('🚀 ~ file:tchReceiving ~ bindDialog.batchShow', state.bindDialog.id)
    }
    // 备货按钮
    const stockUpClick = (index:number, row:IList) => {
      // datas.bindDialog
      state.bindDialog.id = 15
      state.bindDialog.stockUpShow = true
      state.isButtonShow = true
      state.bindDialog.row = row
      state.bindDialog.title = '备货'
      console.log('🚀 ~ file:tchReceiving ~ bindDialog.batchShow', state.bindDialog.id)
      // console.log("'row'",row);
      // alert("batch");
    }
    // 打印表单中确认按钮
    const confirmClick = () => {
      state.bindDialog.inpatientWardTableShow = true
      state.bindDialog.title = '确认单'
    }
    // 详情按钮
    const detailsClick = (index:number, row:IList) => {
      // state.bindDialog.id = 15
      state.bindDialog.detialDialog = true
      state.bindDialog.row = row
      state.bindDialog.title = '订单详情'
      console.log('🚀 ~ file:tchReceiving ~ bindDialog.batchShow', row.id)
    }
    // 查看 详情页面备货弹窗
    const openStockUp = (params:boolean) => {
      state.bindDialog.stockUpShow = params
      state.bindDialog.title = '备货单'
    }
    // 查看 详情页面配货弹窗
    const openDeliverGoods = (params:boolean) => {
      state.bindDialog.deliverGoodsDialog = params
      state.bindDialog.title = '配货单'
    }
    // 查看 详情页面确认弹窗
    const openInpatientWardTable = (params:boolean) => {
      console.log(params)
      state.bindDialog.inpatientWardTableShow = params
      state.bindDialog.title = '确认单'
    }
    // 获取leftList数据状态
    const getleftListClick = (code:string) => {
      state.areaidclick = code
      state.formInline.zt = code
      tableBlockRef.value.refresh()
    }
    // 关闭弹窗
    const closeDialog = (params:boolean) => {
      state.bindDialog.deliverGoodsDialog = params
      state.bindDialog.stockUpShow = params
    }
    // 批量发货
    const batchDeliverGoodsbtn = (index:number, row:IList) => {
      const status = state.multipleSelection.filter((item:IList) => {
        return item.ddzt !== '2'
      })
      console.log(status.length)
      if (state.multipleSelection.length > 0 && status.length === 0) {
        state.batchDialog.statue = true
      } else {
        HMessage({
          type: 'warning',
          message: '请先选择要发货的列表!  或您的选择中包含已发货选项 '
        })
      }
      state.batchDialog.title = '批量发货'
      state.batchDialog.type = 'batchDeliverGoods'
      state.batchDialog.row = state.multipleSelection
    }
    // 查看异常订单
    const abnormalOrder = (index:number, row:IList) => {
      state.bindDialog.inpatientWardTableShow = true
      state.bindDialog.row = row
      state.isShowFormDate = true

      state.bindDialog.title = '异常订单'
    }
    const isShowFormDateDefault = (params:boolean) => {
      state.isShowFormDate = params
    }
    const tableBlockRef = ref()
    return {
      ...toRefs(state),
      getTable,
      selectionChange,
      searchData,
      resetForm,
      leftTab, // 左边按钮
      deliverGoodsClick, // 发货按钮
      detailsClick, // 详情按钮
      stockUpClick, // 备货按钮
      confirmClick, // 打印中确认
      getleftListClick, // 单击leftList数据
      openStockUp, // 查看 详情页面备货弹窗
      openDeliverGoods, // 查看 详情页面配货弹窗
      openInpatientWardTable, // 查看 详情页面确认弹窗
      closeDialog, // 关闭弹窗
      batchDeliverGoodsbtn, // 批量发货
      abnormalOrder, // 查看异常订单
      isShowFormDateDefault,
      tableBlockRef,
      print
    }
  }
})
</script>

<style lang="scss" spoced>
#stockList {
  width: 100%;
  height: 100%;
  display: flex;
  .box-card {
    height: 100%;
    width: 100%;
    display: flex;
    .h-card {
      width: 100%;
    }
    .card-bottom {
      .card-list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-radius: 4px;
        border: 1px solid #eee;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        padding: 10px 30px;
        font-size: 14px;
        margin-bottom: 20px;
        cursor: pointer;
        .h-statscard__header {
          color: #666;
        }
        .h-statscard__content {
          color: #0091ff;
        }
      }
      .isactive {
        border: 1px solid #388ff3;
        box-shadow: inset 4px 0 0 0 #388ff3;
      }
    }
  }
  .h-container {
    display: flex;
    .h-header {
      .first_row {
        display: flex;
        justify-content: space-between;
      }
    }
    .h-main {
      display: flex;
      .main_button {
        margin-top: 140px;
        width: 50px;
      }
      .leftBtn {
        display: flex;
        justify-content: flex-end;
        span {
          padding-right: 10px;
          color: #60a5f5;
          cursor: pointer;
        }
        .normal {
          color: #f55252;
        }
      }
    }
  }
}
</style>
