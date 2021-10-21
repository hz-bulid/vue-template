<template>
  <h-container id="teamLeaderOrder">
    <h-aside width="auto">
      <h-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>消费统计</span>
            <!-- <h-button class="button" type="text">操作按钮</h-button> -->
          </div>
        </template>
        <!-- <h-statstabs  v-model="active" @tab-click="handleTabClick" >12222</h-statstabs> -->
        <div style="margin-bottom: 20px">
          <h-radio-group v-model="activeTab" size="small">
            <h-radio-button
              v-for="(item, index) in tabList"
              :key="index"
              :label="item.label"
              :value="item.value"
              @click="handleTabClick(item)"
            >
            </h-radio-button>
          </h-radio-group>
        </div>
        <div class="card-bottom">
          <!-- is-active -->
          <div
            :class="{ isactive: areaidclick == item.code }"
            class="card-list"
            v-for="(item, index) in leftList"
            :key="index"
            @click="leftTabClick(item)"
          >
            <div class="h-statscard__header">{{ item.value }}</div>
            <div class="h-statscard__content">{{ item.num }}</div>
          </div>
          <!-- <div class="card-list">
            <div class="h-statscard__header">已发货</div>
            <div class="h-statscard__content">10</div>
          </div> -->
        </div>
      </h-card>
    </h-aside>
    <h-container>
      <h-header height="auto">
        <!-- v-if="roleAll===3" -->
        <h-form
          :inline="true"
          size="mini"
          :model="formInline"
          ref="numberValidateFormRef"
          class="demo-form-inline"
        >
          <h-form-item label="被监管人员姓名" prop="xm">
            <h-input
              v-model="formInline.xm"
              placeholder="被监管人员姓名"
            ></h-input>
          </h-form-item>
          <h-form-item label="监室号" prop="jsh">
            <h-cascader
              v-model="formInline.jsh"
              clearable
              :options="options"
              @change="handleChange()"
            ></h-cascader>
          </h-form-item>
          <h-form-item label="消费时间" prop="valueDate">
            <h-date-picker
              v-model="valueDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </h-date-picker>
          </h-form-item>
          <h-form-item label="消费类型" prop="xfzt">
            <h-select v-model="formInline.xfzt" placeholder="监室号">
              <h-option label="支出" value="1"></h-option>
              <h-option label="收入" value="2"></h-option>
              <h-option label="回退" value="3"></h-option>
            </h-select>
          </h-form-item>
          <h-form-item label="订单状态" prop="ddzt">
            <h-select v-model="formInline.ddzt" placeholder="订单状态">
              <h-option
                v-for="(item, index) in leftList"
                :key="index"
                :label="item.value"
                :value="item.code"
              ></h-option>
              <!-- <h-option label="区域二" value="beijing"></h-option> -->
            </h-select>
          </h-form-item>
          <h-form-item label="完成时间" prop="valueDatetwo">
            <h-date-picker
              v-model="valueDatetwo"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </h-date-picker>
          </h-form-item>
          <h-form-item>
            <h-button type="primary" size="mini" @click="onSubmit"
              >查询</h-button
            >
            <h-button type="primary" size="mini" @click="onReset('formInline')"
              >重置</h-button
            >
            <h-button type="primary" size="mini" @click="exportClick"
              >导出</h-button
            >
            <h-button type="primary" size="mini" @click="batchReceiving()"
              >批量收货</h-button
            >
            <!-- <h-button type="primary" size="mini" @click="batchDeliverGoodsbtn()"
              >批量发货</h-button
            >
            <h-dropdown>
              <h-button type="primary" style="margin-left: 10px">
                批量审批<i class="h-icon-arrow-down h-icon--right"></i>
              </h-button>
              <template #dropdown>
                <h-dropdown-menu>
                  <h-dropdown-item @click="orderApproval">审批已选择订单</h-dropdown-item>
                  <h-dropdown-item  @click="wardApproval">按病室审批</h-dropdown-item>
                </h-dropdown-menu>
              </template>
            </h-dropdown> -->
          </h-form-item>
        </h-form>
        <totallistAll v-model:totallist="totallist"></totallistAll>
      </h-header>
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
          <template #demoslots="{ row }">
            <div class="tableClore">
              <span
                v-if="row.ddzt === '4' || row.ddzt === '6'"
                class="colorBlue"
                >{{ row.ddztValue }}</span
              >
              <span v-if="row.ddzt === '1'" class="colorYellow">{{
                row.ddztValue
              }}</span>
              <span
                v-if="row.ddzt === '2' || row.ddzt === '3'"
                class="colorYellow"
                >{{ row.ddztValue }}</span
              >
              <span v-if="row.ddzt === '7'" class="colorRed">{{
                row.ddztValue
              }}</span>
              <span v-if="row.ddzt === '5'" class="colorBlue">{{
                row.ddztValue
              }}</span>
            </div>
          </template>
          <template #demoslot="{ row }">
            <!-- <span> 94651651651561 {{ row.anme }} </span> -->
            <div class="leftBtn">
              <!-- zt (string, optional): 状态 ：1待管教审核 2待大队领导 3审核通过 4正在备货 5已发货 6已完成（确认收货） 7审核拒绝 8取消 -->
              <span @click="detailsClick(row.index, row)">详情</span>
              <!-- <span v-if="row.ddzt==='1'||row.ddzt==='2'"
              @click="approvalClick(row.index, row)"
              >审批</span> -->
              <span
                v-if="row.ddzt === '4'"
                @click="deliverGoods(row.index, row)"
                >发货</span
              >
              <span
                v-if="row.ddzt === '5'"
                @click="confirmReceipt(row.index, row)"
                >确认收货</span
              >
              <!-- <span
              @click="approvalClick(row.index, row)"
              >审批</span>
              <span
              @click="deliverGoods(row.index, row)">发货</span>
            <span
              @click="confirmReceipt(row.index, row)"
              >确认收货</span> -->
            </div>
          </template>
        </h-table-block>
      </h-main>
    </h-container>
    <!--  -->
    <h-dialog-block
      ht="35%"
      wd="28%"
      :title="batchReceDialog.title"
      v-model:showViewModel="batchReceDialog.statue"
    >
      <batchReceiving
        :totallist="totallist"
        :row="batchReceDialog.row"
        @refreshTable="onSubmit"
        @close="batchReceDialog.statue = false"
      ></batchReceiving>
    </h-dialog-block>
    <!--  批量发货-->
    <h-dialog-block
      ht="35%"
      wd="28%"
      :title="batchDialog.title"
      v-model:showViewModel="batchDialog.statue"
    >
      <batchDeliverGoods
        :totallist="totallist"
        :row="batchDialog.row"
        @refreshTable="onSubmit"
        @close="batchDialog.statue = false"
      ></batchDeliverGoods>
    </h-dialog-block>
    <!-- 详情 -->
    <h-dialog-block
      ht="80%"
      :title="bindDialog.title"
      v-model:showViewModel="bindDialog.batchShow"
    >
      <consumptionOrderDetails
        :id="bindDialog.id"
        :row="bindDialog.row"
        :batchShow="bindDialog.batchShow"
      ></consumptionOrderDetails>
    </h-dialog-block>
    <!-- 审批 -->
    <h-dialog-block
      ht="80%"
      :title="approvalDialog.title"
      v-model:showViewModel="approvalDialog.statue"
    >
      <approvalShow
        :row="approvalDialog.row"
        :id="approvalDialog.id"
        :type="approvalDialog.type"
        @refreshTable="onSubmit"
        @close="approvalDialog.statue = false"
      ></approvalShow>
    </h-dialog-block>
    <!-- 审批已选择订单 -->
    <h-dialog-block
      ht="35%"
      wd="28%"
      :typeapp="orderApprovalDialog.typeapp"
      :title="orderApprovalDialog.title"
      v-model:showViewModel="orderApprovalDialog.statue"
    >
      <batchOrder
        :row="orderApprovalDialog.row"
        @refreshTable="onSubmit"
        @close="orderApprovalDialog.statue = false"
        :totallist="totallist"
      ></batchOrder>
      <!-- <orderApproval></orderApproval> -->
    </h-dialog-block>
    <!-- 按病室审批 -->
    <h-dialog-block
      ht="80%"
      :typeapp="wardApprovalDialog.typeapp"
      :title="wardApprovalDialog.title"
      v-model:showViewModel="wardApprovalDialog.statue"
    >
      <wardApproval></wardApproval>
    </h-dialog-block>
    <h-dialog-block
      ht="22%"
      wd="28%"
      v-model:showViewModel="deleteDialog.statue"
      :title="deleteDialog.title"
    >
      <div class="deleclass">
        <div class="">
          {{ deleteDialog.content }}
        </div>
        <div class="footer">
          <h-button
            v-if="deleteDialog.type === '1'"
            type="primary"
            @click="ondelete"
            size="mini"
            >确认发货</h-button
          >
          <h-button
            v-if="deleteDialog.type === '2'"
            type="primary"
            @click="shouhuoClick"
            size="mini"
            >确认收货</h-button
          >
          <h-button type="primary" @click="ondeteleclose" size="mini"
            >取 消</h-button
          >
        </div>
      </div>
    </h-dialog-block>
  </h-container>
</template>

<script lang='ts'>
import moment from 'moment'
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import { HMessageBox, HMessage } from '@hz-lib/han-ui-next'
import consumptionOrderDetails from '@/views/financialManage/consumerOrderFinance/components/consumptionOrderDetails.vue'//
import batchReceiving from '@/views/financialManage/consumerOrderFinance/components/batchReceiving.vue'
import batchDeliverGoods from '@/views/financialManage/consumerOrderFinance/components/batchDeliverGoods.vue'
import totallistAll from '@/views/financialManage/consumerOrderFinance/components/totallistAll.vue'
import { IColumn, ITableData, ITableOption } from '@/types/table'
import ConsumerOrderFinance from '@/api/consumerOrderFinance/consumerOrderFinance'
import { Ifinance } from '@/api/model/consumerOrderFinance'
import batchOrder from '@/views/financialManage/consumerOrderFinance/components/batchOrder.vue'
import approvalShow from '@/views/financialManage/consumerOrderFinance/components/approvalShow.vue'
// import orderApproval from '@/views/financialManage/consumerOrderFinance/components/orderApproval.vue'
import wardApproval from '@/views/financialManage/consumerOrderFinance/components/wardApproval.vue'
import { IList, IFormInline, Ieditdata, Itotallist, ItabList, IleftList, INputLists, Idialog } from '@/views/financialManage/consumerOrderFinance/components/orderAll'
 type optionsType = {
  value?:string,
  label?:string,
  disabled?:boolean,
  children?:optionsType[]
};
interface IState {
  tableOption:ITableOption,
  tableColumns:IColumn[],
  formInline: IFormInline,
  numberValidateFormRef:null | HTMLFormElement,
  inputList:INputLists[]
  tabList:ItabList[],
  leftList:IleftList[],
  activeTab:string,
  multipleSelection:IList[],
  bindDialog:{
    batchShow: boolean,
    title:string,
    id:any,
    row:any
  },
  batchDialog:{
    statue:boolean,
    title:string,
    row:IList[]
  },
  batchReceDialog:{
    statue:boolean,
    title:string,
    row:IList[]
  }
  approvalDialog:{
    statue:boolean,
    title:string,
    row:IList,
    id:any,
    type:string
  },
  orderApprovalDialog:{
    statue:boolean,
    title:string,
    row:IList[],
    typeapp:string
  },
  deleteDialog:{
    statue:boolean,
    title:string,
    content:string,
    type:string
  },
  wardApprovalDialog:Idialog
  editdata:Ieditdata,
  totallist:Itotallist,
  areaidclick:string,
  valueDate:any,
  valueDatetwo:any,
  options:optionsType[]

}

export default defineComponent({
  name: 'teamLeaderOrder',
  components: {
    consumptionOrderDetails,
    batchReceiving,
    totallistAll,
    approvalShow,
    // orderApproval,
    wardApproval,
    batchDeliverGoods,
    batchOrder
  },
  setup() {
    // 表格数据
    const getTable = async (data: Ifinance):Promise<ITableData<IList>> => {
      const res = await ConsumerOrderFinance.initAll(data)
      return res.data
    }
    const state = reactive<IState>({
      tableOption: {
        showRadio: true,
        showIndex: true // 一个函数
      },
      tableColumns: [// type="selection" width="55"
        { prop: 'xm', title: '姓名' },
        { prop: 'jsh', title: '监室号' },
        { prop: 'xdsj', title: '消费时间' },
        { prop: 'xflxvalue', title: '消费类型' }, // xflxvalue  xflx
        { prop: 'xfje', title: '消费金额' },
        { prop: 'dqye', title: '当前余额' },
        // { prop: 'ddztValue', title: '订单状态' },
        { title: '订单状态', hidden: true, slot: 'demoslots' },
        { prop: 'cwsj', title: '完成时间' },
        { title: '操作', width: '200px', hidden: true, slot: 'demoslot' }
      ],
      formInline: {
        ddzt: '',
        jsh: '',
        pageNum: 1,
        pageSize: 10,
        region: '',
        total: 0,
        xdsj: '',
        xfzt: '',
        xm: '',
        isPage: true,
        xfsjks: '',
        xfsjjs: '',
        wcsjks: '',
        wcsjjs: ''
      },
      numberValidateFormRef: null,
      inputList: [
        {
          value: '1',
          lable: '已审核'
        },
        {
          value: '3',
          lable: '待审核'
        },
        {
          value: '2',
          lable: '审核'
        }
      ],
      tabList: [
        {
          label: '全部',
          value: 'qb'
        },
        {
          label: '今日',
          value: 'br'
        },
        {
          label: '本周',
          value: 'bz'
        },
        {
          label: '本月',
          value: 'by'
        }
      ],
      multipleSelection: [],
      leftList: [
        {
          label: '已发货',
          value: '20',
          code: '1'
        },
        {
          label: '待发货',
          value: '10',
          code: '2'
        }
      ],
      activeTab: '全部',
      bindDialog: {
        batchShow: false,
        title: '订单详情',
        id: '',
        row: {}
      },
      batchDialog: {
        statue: false,
        title: '批量确认收货',
        row: []
      },
      batchReceDialog: {
        statue: false,
        title: '批量确认收货',
        row: []
      },
      // searchData: {
      //   isPage: true
      // },
      editdata: {
        id: [],
        jgh: '420100131', // 机构号 ,
        list: [], // (Array[string], optional): id数组/监室号数组 ,
        rybh: '', // 人员编号 ,
        spjg: '', // 审批结果 1同意 2不同意 一定要传 ,
        spyj: '', // 审批意见 ,
        zt: '', // 状态 管教审批2 所领导3 备货4 发货5 完成6 取消8

      },
      totallist: {
        order: 0,
        totalAmount: 0,
        totalGoods: 0,
      },
      approvalDialog: {
        statue: false,
        title: '审批',
        type: '',
        id: '',
        row: {
          xm: '',
          jsh: '',
          xdsj: '',
          xflx: '',
          xfje: '',
          dqye: '',
          ddzt: '',
          id: ''
        },

      },
      orderApprovalDialog: {
        statue: false,
        title: '审批',
        row: [],
        typeapp: ''
      },
      wardApprovalDialog: {
        statue: false,
        title: '审批',
        row: [],
        typeapp: ''
      },
      areaidclick: '',
      valueDate: '',
      valueDatetwo: [],
      options: [],
      deleteDialog: {
        title: '',
        statue: false,
        content: '',
        type: ''
      }
    })
    const tableBlockRef = ref()
    // 复选框
    const selectionChange = (val:IList[]) => { // index:number,val:IList
      console.log('val', val)
      state.multipleSelection = val
      const id = state.multipleSelection
      const sums:number = id.reduce((prev:any, curr:any, idx:any, arr) => {
        return prev + parseInt(curr.xfje)
      }, 0)
      state.totallist.order = id.length
      state.totallist.totalAmount = sums
      state.totallist.totalGoods = sums
    }
    // 点击周月
    const handleTabClick = (item:ItabList) => {
      leftData()
      if (tableBlockRef.value) {
        tableBlockRef.value.refresh()
      }
    }
    // 左侧下方联动
    const leftTabClick = (item:IleftList) => {
      state.areaidclick = item.code
      state.formInline.ddzt = item.code
      onSubmit()
      // console.log('IleftList', item)
    }
    // 批量收货
    const batchReceiving = (index:number, row:IList) => {
      const status = state.multipleSelection.filter((item:IList) => {
        return item.ddzt !== '3'
      })
      state.batchDialog.title = '批量收货'
      if (state.multipleSelection.length > 0 && status.length === 0) {
        state.batchDialog.statue = true
      } else {
        HMessage({
          type: 'success',
          message: '请先选择要收货的列表!'
        })
      }
      // const id = state.multipleSelection
      // const idArr:any[] = []
      // id.forEach((item) => {
      //   idArr.push(item.id)
      //   // console.log('🚀 ~ file: consumerOrderFinance.vue ~ line 407 ~ id.forEach ~ item', item)
      // })
      state.batchDialog.row = state.multipleSelection
    }
    // 批量发货
    const batchDeliverGoodsbtn = (index:number, row:IList) => {
      if (state.multipleSelection.length > 0) {
        state.batchReceDialog.statue = true
      } else {
        HMessage({
          type: 'success',
          message: '请先选择要收货的列表!'
        })
      }
      state.batchReceDialog.title = '批量发货'
      state.batchReceDialog.row = state.multipleSelection
    }
    // 查询
    const onSubmit = () => {
      // 消费时间
      if (state.valueDate.length !== 0) {
        const startTime:string = moment(state.valueDate[0]).format('YYYY-MM-DD HH:mm:ss')
        const endTime:string = moment(state.valueDate[1]).format('YYYY-MM-DD HH:mm:ss')
        state.formInline.xfsjks = startTime
        state.formInline.xfsjjs = endTime
      }
      if (state.valueDatetwo.length !== 0) {
        const cwstart:string = moment(state.valueDatetwo[0]).format('YYYY-MM-DD HH:mm:ss')
        const cwend:string = moment(state.valueDatetwo[0]).format('YYYY-MM-DD HH:mm:ss')
        state.formInline.wcsjks = cwstart
        state.formInline.wcsjjs = cwend
      }

      // valueDatetwo 财务完成时间 wcsjks  wcsjjs
      // 刷新列表
      if (tableBlockRef.value) {
        tableBlockRef.value.refresh()
      }
    }
    // 重置
    const onReset = (formName: string): void => {
      state.valueDate = ''
      state.valueDatetwo = ''
      state.formInline.xfsjks = ''
      state.formInline.xfsjjs = ''
      state.formInline.wcsjks = ''
      state.formInline.wcsjjs = ''
      console.log(formName)
      if (state.numberValidateFormRef) {
        state.numberValidateFormRef.resetFields()
      }
    }
    // 关闭
    const closeClick = () => {
      state.batchDialog.statue = false
    }
    // 审批已选择订单
    const orderApproval = () => {
      // alert(1)
      if (state.multipleSelection.length > 0) {
        state.orderApprovalDialog.statue = true
      } else {
        HMessage({
          type: 'success',
          message: '请先选择订单!'
        })
      }
      state.orderApprovalDialog.row = state.multipleSelection
    }
    // 病室
    const wardApproval = () => {
      state.wardApprovalDialog.statue = true
      state.wardApprovalDialog.typeapp = '3'
    }
    // 详情按钮
    const detailsClick = (index:number, row:IList) => {
      state.bindDialog.id = row.id
      state.bindDialog.batchShow = true
      state.bindDialog.row = row
    }
    // 审批按钮
    const approvalClick = (index:number, row:IList) => {
      state.approvalDialog.statue = true
      state.approvalDialog.row = row
      state.approvalDialog.id = row.id
      state.approvalDialog.type = '2'
    }
    // 发货
    const deliverGoods = async (index:number, data:IList) => {
      state.deleteDialog.type = '1'
      state.deleteDialog.title = '发货'
      state.deleteDialog.statue = true
      state.deleteDialog.content = '请确保已经将商品送给被监管人员，点击确认发货后，消费记录将更新为已发货状态！'
      // zt (string, optional): 状态 管教审批2 所领导3 备货4 发货5 完成6 取消8
      const id:any = data.id
      const rybh:any = data.rybh
      // const ids = id.toString()
      console.log(data, 66666)
      state.editdata.id = [id]
      // state.editdata.list.push(id)
      // state.editdata.spjg = '1'
      state.editdata.zt = '5'// 5---发货 6---收货
      // state.editdata.rybh = rybh
    }
    // 确认发货
    const ondelete = async () => {
      const res = await ConsumerOrderFinance.orderqrsh(
        state.editdata
      )
      state.deleteDialog.statue = false
      if (res.code === '200') {
        onSubmit()
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
    }
    // 确认收货
    const confirmReceipt = (index:number, data:IList) => {
      state.deleteDialog.type = '2'
      state.deleteDialog.title = '确认收货'
      state.deleteDialog.statue = true
      state.deleteDialog.content = '对已选择消费记录进行收货操作，请确认选择无误！'
      const id:any = data.id
      const rybh:any = data.rybh
      // const ids = id.toString()
      console.log(data, 66666)
      state.editdata.id = [id]
      // state.editdata.list.push(id)
      // state.editdata.spjg = '1'
      state.editdata.zt = '6'
      // state.editdata.rybh = rybh
      // console.log('state.editdata', state.editdata)
    }
    const shouhuoClick = async () => {
      const res = await ConsumerOrderFinance.orderqrsh(
        state.editdata
      )
      if (res.code === '200') {
        onSubmit()
        HMessage({
          type: 'success',
          message: '收货成功!'
        })
      } else {
        HMessage({
          type: 'info',
          message: '收货失败!'
        })
      }
    }
    const ondeteleclose = () => {
      state.deleteDialog.statue = false
    }

    const leftData = async () => {
      const res = await ConsumerOrderFinance.orderList()
      if (state.activeTab === '全部') {
        state.leftList = res.data.qb
      } else if (state.activeTab === '本月') {
        state.leftList = res.data.by
      } else if (state.activeTab === '本日') {
        state.leftList = res.data.br
      } else { // if (state.activeTab === '本周')
        state.leftList = res.data.bz
      }
    }
    leftData()
    // 导出
    const exportClick = async () => {
      // state.multipleSelection//导出选中的数据
      if (state.multipleSelection.length > 0) {
        const res = await ConsumerOrderFinance.downloadDdxx(
          state.formInline
        )
        console.log('🚀 ~ file: teamLeaderOrder.vue ~ line 763 ~ exportClick ~ res', res)
        const blob = new Blob([res.origin], {
          type: 'application/vnd.ms-excel'
        })
        const objUrl:any = URL.createObjectURL(blob)
        window.location.href = objUrl
      } else {
        HMessage({
          type: 'warning',
          message: '暂无数据!'
        })
      }
    }
    // 左侧数据
    const LeftQuery = async () => {
      const ress = await ConsumerOrderFinance.getQyTree({ jgh: '420100131' })
      const newArr = ress.data
      const newList = newArr.map((item:any) => {
        item.value = item.qybh
        item.label = item.qymc
        item.children = item.childs.map((ele:any) => {
          ele.value = ele.qybh
          ele.label = ele.qymc
          ele.children = ele.childs.map((elech:any) => {
            elech.value = elech.qybh
            elech.label = elech.qymc
            return elech
          })
          return ele
        })
        return item
      })
      state.options = newList
    }
    LeftQuery()
    // 监室号的选中
    const handleChange = (value:any):void => {
      state.formInline.jsh = state.formInline.jsh.splice(-1).join('')
    }
    // dataAll()
    return {
      ...toRefs(state),
      getTable,
      selectionChange,
      handleTabClick, // 左边
      leftTabClick, // 左边按钮
      batchReceiving, // 批量收货
      batchDeliverGoodsbtn, // 批量发货
      detailsClick, // 详情按钮
      approvalClick, // 审批
      deliverGoods, // 发货
      wardApproval, // 按管教审批
      confirmReceipt, // 确认按钮
      orderApproval,
      closeClick, // 关闭
      onReset, // 重置
      exportClick, // 导出
      onSubmit, // 查询
      tableBlockRef,
      ondelete, // 发货右侧
      shouhuoClick, // 收货右侧
      ondeteleclose, // 取消
      handleChange,
      LeftQuery
      // dataAll
    }
  }
})
</script>

<style lang="scss" spoced>
#teamLeaderOrder {
  width: 100%;
  height: 100%;
  .leftBtn {
    display: flex;
    justify-content: center;
    span {
      padding-right: 10px;
      color: #60a5f5;
      cursor: pointer;
    }
  }
  .tableClore {
    .colorBlock {
      color: #333;
    }
    .coloerGreen {
      color: #4b7902;
    }
    .colorYellow {
      color: #fa930e;
    }
    .colorRed {
      color: #f55252;
    }
    .colorBlue {
      color: #388ff3;
    }
  }
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
          color: #333;
        }
        &:hover {
          border: 1px solid #388ff3;
          box-shadow: inset 4px 0 0 0 #388ff3;
        }
      }

      .isactive {
        border: 1px solid #388ff3;
        box-shadow: inset 4px 0 0 0 #388ff3;
      }
    }
  }
  .batchCenter {
    display: flex;
    // justify-content: space-around;
    // margin: 10px 5px;
    .item {
      margin-right: 50px;
    }
    .colorRed {
      // color: #f00;
    }
  }
  .deleclass {
    display: flex;
    flex-direction: column;
    .footer {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 40px;
      width: 100%;
    }
  }
}
</style>
