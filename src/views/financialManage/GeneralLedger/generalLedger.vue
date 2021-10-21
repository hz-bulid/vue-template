<!--
 * @Author: your name
 * @Date: 2021-03-31 17:10:54
 * @LastEditTime: 2021-04-03 12:58:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \han-ui-next\website\play\index.vue
-->
<template >
  <div id="generalLedger">
    <h-container>
      <!-- 左侧按钮数据栏 -->
      <h-aside width="16vw">
        <h-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>监所总账 </span>
            </div>
          </template>
          <div class="card-bottom">
            <div class="card-amount">
              <div class="amount-key">总余额</div>
              <div class="amount-value">{{ LeftList.zye }}</div>
            </div>
            <div class="card-list">
              <div class="h-statscard__header">累计收入</div>
              <div class="h-statscard__content">{{ LeftList.ljsr }}</div>
            </div>
            <div class="card-list">
              <div class="h-statscard__header">累计支出</div>
              <div class="h-statscard__content">{{ LeftList.ljzc }}</div>
            </div>
            <div class="card-list">
              <div class="h-statscard__header">待结算余额</div>
              <div class="h-statscard__content">{{ LeftList.djsje }}0</div>
            </div>
          </div>
        </h-card>
      </h-aside>
      <!-- 页面右侧内容 -->
      <h-container>
        <!-- 页面右侧头部信息 -->
        <h-header>
          <h-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            ref="ruleFormRef"
            size="small"
          >
            <!-- 右侧头部信息第一行 -->
            <div class="first_row">
              <div>
                <h-form-item label="结算类型" prop="jslx">
                  <h-col :span="20">
                    <h-select
                      v-model="formInline.jslx"
                      placeholder="请选择"
                      style="width: 100%"
                      size="small"
                    >
                      <h-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        size="small"
                      >
                      </h-option>
                    </h-select>
                  </h-col>
                </h-form-item>
                <!-- <span>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; </span> -->
                <h-form-item label="结算日期" prop="jsriStart">
                  <h-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="formInline.jsriStart"
                    style="width: 100%"
                    size="small"
                  ></h-date-picker>
                </h-form-item>
                <h-form-item label="至" prop="jsriEnd">
                  <h-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="formInline.jsriEnd"
                    style="width: 100%"
                    size="small"
                  ></h-date-picker>
                </h-form-item>
              </div>
              <div>
                <h-form-item size="small">
                  <h-button type="primary" @click="searchData('formInline')"
                    >查询</h-button
                  >
                  <h-button @click="resetForm('ruleForm')">重置</h-button>
                </h-form-item>
              </div>
            </div>
            <!-- 右侧头部信息第二行 -->
            <div class="second_row">
              <h-button
                type="primary"
                size="small"
                @click="dialogFormVisible = true"
                >手动结算</h-button
              >
            </div>
          </h-form>
        </h-header>
        <!-- 页面右侧表格内信息 -->
        <h-main>
          <h-table-block
            ref="tableBlockRef"
            :method="getTable"
            :params="formInline"
            :table-columns="tableColumns"
            @handle-operate="handleOperate"
          >
            <template #demoslot="{ row }">
              <div class="leftBtn">
                <span
                  type="primary"
                  size="mini"
                  @click="handleOperate(row.index, row)"
                  >详情</span
                >
              </div>
            </template>
            <template #nested>
              <h-table-column label="收入">
                <h-table-column prop="srje" label="金额" width="120">
                </h-table-column>
                <h-table-column prop="srbs" label="笔数" width="120">
                </h-table-column>
              </h-table-column>
              <h-table-column label="支出">
                <h-table-column prop="zcje" label="金额" width="120">
                </h-table-column>
                <h-table-column prop="zcbs" label="笔数" width="120">
                </h-table-column>
              </h-table-column>
            </template>
          </h-table-block>
        </h-main>
      </h-container>
    </h-container>
    <!-- 手动生成按钮弹框 -->
    <h-dialog-block
      title="手动结算"
      v-model:showViewModel="dialogFormVisible"
      wd="23%"
      ht="30%"
    >
      <h-form :model="manualDialogForm">
        <p class="dialog_p">选择结算周期</p>
        <h-form-item label="开始日期" :label-width="formLabelWidth">
          <h-date-picker
            type="date"
            placeholder="选择日期"
            v-model="manualDialogForm.jsriStart"
            style="width: 220px"
          ></h-date-picker>
        </h-form-item>
        <h-form-item label="结束日期" :label-width="formLabelWidth">
          <h-date-picker
            type="date"
            placeholder="选择日期"
            v-model="manualDialogForm.jsriEnd"
            style="width: 220px"
          ></h-date-picker>
        </h-form-item>
      </h-form>
      <div class="dialog-footer">
        <h-button @click="dialogFormVisible = false">取 消</h-button>
        <h-button type="primary" @click="handleDialogForm">确 定</h-button>
      </div>
    </h-dialog-block>
    <!-- 表中详情按钮点击界面 -->
    <h-dialog-block
      v-model:showViewModel="detialDialog.DialogVisible"
      title="详情"
      wd="80%"
      ht="80%"
    >
      <row-detail :row="detialDialog.row"></row-detail>
    </h-dialog-block>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { IColumn } from '@/types/table'
import rowDetail from './components/rowDetail.vue'
import GeneralLedger from '@/api/generalLedger/generalLedger'
import { ITableListData } from '@/api/generalLedger/model/generalLedger'
import { IFormInline, IOptions, IForm, IList, ILeftList } from './generalLedger'
  interface IState {
          formInline: IFormInline
          // value1: string,
          ruleFormRef:null | HTMLFormElement
          LeftList:ILeftList
          options:IOptions[]
          tableColumns:IColumn[]
          dialogFormVisible: boolean,
          manualDialogForm: IForm
          formLabelWidth: string
          detialDialog:{
            DialogVisible:boolean
            row:IList
          }

        }
export default defineComponent({
  name: 'Index',
  components: {
    rowDetail
  },
  setup() {
    const state = reactive<IState>({
      formInline: {
        jslx: '',
        jsriStart: '',
        jsriEnd: ''
      },
      ruleFormRef: null,
      // 左边栏按钮数据
      LeftList: {
        djsje: 0,
        ljsr: 0,
        ljzc: 0,
        zye: 0
      },
      options: [{
        value: 'Day',
        label: '天'
      }, {
        value: 'mouth',
        label: '月'
      }, {
        value: 'year',
        label: '年'
      }
      ],
      // 表单列数据
      tableColumns: [
        { prop: 'jsbh', title: '结算编号' },
        { prop: 'jslx', title: '结算类型' },
        { prop: 'jsrq', title: '结算日期' },
        { prop: 'sqye', title: '上期余额' },
        { title: '收入', type: 'nested' },
        { prop: 'dqye', title: '当期余额' },
        { title: '操作', hidden: true, slot: 'demoslot' },
        // {
        //   title: '操作',
        //   type: 'operate',
        //   operates: [
        //     { name: '详情', type: 'primary', size: 'mini' }
        //   ]
        // }
      ],
      // 手动生成弹框内数据
      dialogFormVisible: false,
      manualDialogForm: {
        jsriStart: '',
        jsriEnd: ''
      },
      formLabelWidth: '120px',
      detialDialog: {
        DialogVisible: false,
        row: {
          dqye: 0,
          jsbh: '',
          jsjzj: '',
          jslx: '',
          jsqsj: '',
          jsrq: '',
          sqye: 0,
          srbs: 0,
          srje: 0,
          zcbs: 0,
          zcje: 0
        }
      }
    })

    // 获取左侧边栏信息
    const getLeftList = async () => {
      const res = await GeneralLedger.getLeftListData()
      state.LeftList = res.data
      // console.log('res11111111111', res)
    }
    getLeftList()
    // 处理查询按钮
    const searchData = (): void => {
      if (tableBlockRef.value) {
        tableBlockRef.value.refresh()
      }
    }
    // 处理重置按钮功能
    const resetForm = (): void => {
      if (state.ruleFormRef) {
        state.ruleFormRef.resetFields()
        tableBlockRef.value.refresh()
      }
    }
    // 获取表单内数据
    const getTable = async (data:ITableListData) => {
      console.log('🚀 ~ file: index.vue ~ line 73 ~ getTable ~ data', data)
      const res = await GeneralLedger.getTableListData(data)
      console.log('res111111', res.data)
      return new Promise(resolve => {
        resolve(
          res.data
        )
      })
    }
    // const tableBlockRef = ref<HTMLDivElement | null>(null)
    // 表中详情按钮点击事件
    const handleOperate = (index: number, row :any) => {
      state.detialDialog.DialogVisible = true
      console.log('2222222222222', row)
      state.detialDialog.row = row
    }
    // 手动生成按钮弹框中  “确认” 按钮点击事件
    const handleDialogForm = () => {
      state.dialogFormVisible = false
      state.detialDialog.DialogVisible = true
    }
    const showDialog = ref(true)
    const tableBlockRef = ref()
    return {
      ...toRefs(state),
      getLeftList,
      searchData,
      resetForm,
      getTable,
      tableBlockRef,
      handleOperate,
      // detailsClick,
      handleDialogForm,
      showDialog
    }
  }
})
</script>

<style lang="scss" scoped>
#generalLedger {
  width: 100%;
  height: 100%;
  display: flex;

  .h-card {
    width: 100%;
  }
  .card-bottom {
    height: 75vh;
    .card-amount {
      width: 100%;
      height: 80px;
      margin-bottom: 20px;
      background: #ffffff;
      border: 1px solid #eeeeee;
      box-shadow: 1px 1px 4px 0px rgba(189, 189, 189, 0.5);
      border-radius: 4px;
      .amount-key {
        width: 142px;
        height: 14px;
        padding-top: 10px;
        padding-left: 30px;
        font-family: HiraginoSansGB-W3;
        font-size: 14px;
        color: #666666;
        font-weight: 300;
      }
      .amount-value {
        width: 72px;
        height: 24px;
        padding-top: 20px;
        padding-left: 30px;
        font-family: HiraginoSansGB-W3;
        font-size: 24px;
        color: #0091ff;
        font-weight: 300;
      }
    }
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
  }
  .h-container {
    .h-header {
      height: auto !important;
      .first_row {
        display: flex;
        justify-content: space-between;
      }
      .h-option {
        width: 800px;
      }
    }
    .leftBtn {
      display: flex;
      justify-content: center;
      span {
        padding-right: 10px;
        color: #60a5f5;
        cursor: pointer;
      }
    }
  }
  .dialog-footer {
    padding-left: 180px;
  }
  .dialog_p {
    margin-bottom: 20px;
    font-size: 18px;
  }
}
</style>
