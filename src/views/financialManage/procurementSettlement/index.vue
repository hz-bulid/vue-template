<!--
 * @Author: your name
 * @Date: 2021-03-31 17:10:54
 * @LastEditTime: 2021-04-03 13:00:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \han-ui-next\website\play\index.vue
-->
<template>
  <div>
    <h-container>
      <h-aside width="16vw">
        <h-card>
          <template #header>
            <div class="card-header">
              <span>备货单</span>
            </div>
          </template>
          <div class="detailList">
            <div
              v-for="(item, index) in leftList"
              :key="index"
              @click="statisticsClick(item.code, index + 1)"
              :class="{ isHover: statisticsCount === index + 1 }"
            >
              <span>{{ item.key }}</span
              ><span class="number">{{ item.num }}</span>
            </div>
          </div>
        </h-card>
      </h-aside>
      <h-container>
        <h-header style="height: auto">
          <h-form
            size="small"
            ref="ruleFormRef"
            :inline="true"
            :model="formInline"
          >
            <h-form-item label="备货单编号" prop="id">
              <h-input
                clearable
                v-model="formInline.id"
                placeholder="备货单编号"
              ></h-input>
            </h-form-item>
            <h-form-item label="备货人" prop="bhr">
              <h-input
                clearable
                v-model="formInline.bhr"
                placeholder="备货人"
              ></h-input>
            </h-form-item>
            <h-form-item label="是否完成发货" prop="isFh">
              <h-select
                v-model="formInline.isFh"
                clearable
                placeholder="是否完成发货"
              >
                <h-option label="是" value="5"></h-option>
                <h-option label="否" value="4"></h-option>
              </h-select>
            </h-form-item>
            <br />
            <h-form-item label="发货日期" prop="Time">
              <h-date-picker
                v-model="formInline.Time"
                type="daterange"
                format="YYYY-MM-DD HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </h-date-picker>
            </h-form-item>
            <h-form-item>
              <h-button type="primary" @click="onSubmit">查询</h-button>
              <h-button @click="resetForm()">重置</h-button>
            </h-form-item>
          </h-form>
          <div>
            <h-button
              type="primary"
              size="small"
              @click="operationAllClick(-1, {}, 2)"
              >结算</h-button
            >
          </div>
        </h-header>
        <h-main style="height: 70vh">
          <h-table-block
            ref="tableRef"
            :method="getTable"
            :showRadio="tableOption.showRadio"
            :show-paging="true"
            :page-sizes="[10, 20, 50, 100]"
            :table-columns="tableColumns"
            @selection-change="selectionChange"
          >
            <template #xhSlot="{ row }">
              {{ row.index + 1 }}
            </template>
            <template #buttonslot="{ row }">
              <span
                class="spanColor"
                @click="operationAllClick(row.index, row, 1)"
                >详情</span
              >
              <span
                class="spanColor"
                v-if="row.ddzt === '4'"
                @click="operationAllClick(row.index, row, 2)"
                >结算</span
              >
            </template>
          </h-table-block>
        </h-main>
      </h-container>
    </h-container>
    <!-- 结算弹窗 -->
    <h-dialog-block
      wd="700px"
      ht="420px"
      v-model:showViewModel="showDialog"
      title="结算"
    >
      <settle-accounts
        @cancel="showDialog = $event"
        @upIs="showDialogup = $event"
        @showin="showDialogin = $event"
        :row="row"
      ></settle-accounts>
    </h-dialog-block>
    <!-- 详情弹窗 -->
    <h-dialog-block
      wd="1000px"
      ht="600px"
      v-model:showViewModel="showDialogxq"
      title="详情"
    >
      <particulars
        @openStockUp="showDialogup = $event"
        @openDeliverGoods="showWardTable = $event"
        @openInpatientWardTable="showDialogin = $event"
        :row="row"
      ></particulars>
    </h-dialog-block>
    <!-- 备货单清单 -->
    <h-dialog-block
      wd="800px"
      ht="620px"
      v-model:showViewModel="showDialogup"
      title="备货清单"
    >
      <stock-up
        @closeStockUpDialog="showDialogup = $event"
        :row="row"
      ></stock-up>
    </h-dialog-block>
    <!-- 配货清单 -->
    <h-dialog-block
      wd="1000px"
      ht="800px"
      v-model:showViewModel="showDialogin"
      title="配货清单"
    >
      <inventory :row="row" :isShowFormDate="false"></inventory>
    </h-dialog-block>
    <!-- 确认清单 -->
    <h-dialog-block
      wd="1000px"
      ht="600px"
      v-model:showViewModel="showWardTable"
      title="确认清单"
    >
      <deliver-goods :row="row"></deliver-goods>
    </h-dialog-block>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import SettleAccounts from '@/views/financialManage/procurementSettlement/components/settleAccounts.vue'
import particulars from '@/components/particulars.vue'
import StockUp from '@/components/stockUp.vue'
import inventory from '@/components/inventory.vue'
import DeliverGoods from '@/components/deliverGoods.vue'
import procurementSettlement from '@/api/procurementSettlement/procurementSettlement'
import { IList, IState } from '@/views/financialManage/procurementSettlement/procurementSettlement'
import moment from 'moment'
export default defineComponent({
  name: 'Index',
  components: { SettleAccounts, particulars, StockUp, inventory, DeliverGoods },
  setup() {
    // 页面左栏数据接口
    const getLeft = async () => {
      const ress = await procurementSettlement.leftList({ jgh: '420100131' })
      state.formInline.zt = ress.data[0].code
      state.leftList = ress.data
    }
    getLeft()
    // 表格的接口
    const getTable = async (fy:ITablefy):Promise<ITable> => {
      state.formInline.pageNum = fy.pageNum
      state.formInline.pageSize = fy.pageSize
      if (state.formInline.Time !== '') {
        state.formInline.startTime = moment(state.formInline.Time[0]).format('YYYY-MM-DD HH:mm:ss')
        state.formInline.endTime = moment(state.formInline.Time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      const data:any = {}
      // 把传到后端的数据不要空
      for (const key in state.formInline) {
        const element = state.formInline[key]
        if (element !== '' && key !== 'Time') {
          data[key] = element
        }
      }
      const res = await procurementSettlement.query(data)
      return res.data
    }
    const state = reactive<IState>({
      // 控制表格的序号以及多选框
      tableOption: {
        showRadio: true,
        showIndex: true
      },
      // 表格数据
      tableColumns: [
        { title: '序号', hidden: true, slot: 'xhSlot' },
        { prop: 'id', title: '备货单号' },
        { prop: 'splb', title: '商品类别数' },
        { prop: 'spsl', title: '商品总数' },
        { prop: 'dds', title: '包含订单数' },
        { prop: 'bhr', title: '备货人' },
        { prop: 'bhrq', title: '备货日期' },
        { prop: 'ddztValue', title: '订单状态' },
        { prop: 'fhrq', title: '发货日期' },
        {
          title: '操作', width: '200', hidden: true, slot: 'buttonslot'
        }
      ],
      // 表单数据
      formInline: {
        bhr: '',
        endTime: '',
        id: '',
        isFh: '',
        isPage: true,
        jgh: '420100131',
        pageNum: 1,
        pageSize: 10,
        startTime: '',
        zt: '99',
        Time: ''
      },
      ruleFormRef: null,
      // 左边导航
      leftList: [],
      // 结算弹窗
      showDialog: false,
      // 详情弹窗
      showDialogxq: false,
      // 查看备货清单
      showDialogup: false,
      // 配货清单
      showDialogin: false,
      // 确认清单
      showWardTable: false,
      // 保存每一行的数据
      row: {}
    })
    // 多选框事件
    const selectionChange = (data:any) => {
      console.log(data)
    }
    // 左侧导航的选中状态
    const statisticsCount = ref(1)
    // 表格的ref用来更新
    const tableRef = ref()
    // 侧边栏的点击事\数据
    const statisticsClick = (code:string, is:number):void => {
      statisticsCount.value = is
      state.formInline.zt = code
      if (code !== '99') {
        state.formInline.isFh = code
      } else {
        state.formInline.isFh = ''
      }
      tableRef.value && tableRef.value.refresh()
    }
    // 查询按钮
    const onSubmit = async () => {
      tableRef.value && tableRef.value.refresh()
    }
    // 重置按钮
    const resetForm = (): void => {
      if (state.ruleFormRef) {
        state.ruleFormRef.resetFields()
      }
    }

    // 点击按钮后的弹窗1详情2结算
    const operationAllClick = (index:number, row:IList, BName:number):void => {
      state.row = row
      switch (BName) {
        case 1:
          state.showDialogxq = true
          break
        case 2:
          state.showDialog = true
          break
        default:
          break
      }
    }

    watch(() => state.showDialog, () => {
      console.log(state.showDialog)
    }, { immediate: true })
    return {
      ...toRefs(state),
      onSubmit,
      resetForm,
      getTable,
      selectionChange,
      statisticsClick,
      statisticsCount,
      operationAllClick,
      tableRef
    }
  }
})
</script>

<style lang="scss" scoped>
.h-form {
  padding-top: 15px;
}
.detailList {
  height: 72vh !important;
  div {
    margin: 15px 0;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 7px;
    display: flex;
    font-size: 16px;
    color: #666;
    justify-content: space-between;
    cursor: pointer;
    .number {
      color: #0091ff;
    }
  }
  div:hover {
    border: 1px solid #388ff3;
    box-shadow: inset 4px 0 0 0 #388ff3;
  }
  .isHover {
    border: 1px solid #388ff3;
    box-shadow: inset 4px 0 0 0 #388ff3;
  }
}
</style>
