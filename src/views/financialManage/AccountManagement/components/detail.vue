<template>
  <h-dialog-block
    v-model:showViewModel="show"
    wd="1500px"
    ht="700px"
    :title="'账户收支明细:'"
  >
    <h-form size="small" :inline="true" :model="formInline">
      <!-- class="demo-form-inline" -->
      <h-form-item label="交易类型">
        <h-select v-model="formInline.user" clearable placeholder="交易类型">
          <h-option label="转账" value="2"> </h-option>
          <h-option label="回款" value="1"> </h-option>
        </h-select>
      </h-form-item>
      <h-form-item label="活动区域">
        <h-date-picker
          v-model="formInline.region"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
          <!-- align="right" -->
        </h-date-picker>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="onSubmit">查询</h-button>
      </h-form-item>
    </h-form>
    <div class="TableClass">
      <div class="tablebodyClass">
        <h-table-block
          ref="tableBlockRef"
          height="500px"
          highlight-current-row
          :method="getTable"
          :params="searchData"
          :show-paging="true"
          :showRadio="showRadio"
          :showIndex="showIndex"
          :page-sizes="[10, 20, 50, 100]"
          :table-columns="tableColumns"
          @row-click="handleOperate"
          @selection-change="selectionChange"
        >
          <template #jylxslot="{ row }">
            <span>
              {{
                row.jylx === "1" ? "消费" : row.jylx === "2" ? "转账" : "回款"
              }}
            </span>
          </template>
          <template #jysjslot="{ row }">
            <span> {{ new Date(row.cjsj).toLocaleDateString() }} </span>
          </template>
          <template #demoslot="{ row }">
            <span> {{ row.dqye }} </span>
          </template>
        </h-table-block>
      </div>

      <div class="tablebody" style="margin-left: 20px">
        <div style="height: 40px" v-if="!detailData"></div>
        <h-row class="money" v-else>
          <h-col :span="5">
            <div>
              上期余额:<span class="moneyColor">{{ detailData.sqye }}</span>
            </div>
          </h-col>
          <h-col :span="5">
            <div>
              消费金额:<span class="moneyColor">{{ detailData.bdje }}</span>
            </div>
          </h-col>
          <h-col :span="5">
            <div>
              当前余额:<span class="moneyColor">{{ detailData.dqye }}</span>
            </div>
          </h-col>
          <h-col :span="9">
            <div>
              交易时间:<span class="moneyColor">{{
                new Date(detailData.cjsj).toLocaleString()
              }}</span>
            </div>
          </h-col>
        </h-row>
        <div style="width: 100%">
          <detailed-introduction
            :detailData="detailData"
          ></detailed-introduction>
        </div>
      </div>
    </div>
  </h-dialog-block>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, watch, PropType } from 'vue'
import accountManagement from '@/api/accountManagement/accountManagement'
import DetailedIntroduction from '@/views/financialManage/AccountManagement/components/detailedIntroduction.vue'
interface IList {
  date: string
  name:string
  address:string
}
interface ITableData {
  list: IList[]
  pageNum: number
  pageSize: number
  total:number
}
type BtnType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
type BtnSize = 'medium'| 'small'| 'mini'
type ColumnType = 'nested'|'operate'
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
interface Ishortcuts {
  text: string,
  value:Date[]
}
interface IFormInline {
  user: string,
  region: string
}
interface IDetailData {
  bdje: number, // : 变动金额 ,
  cjsj: string, // : 交易时间 ,
  dqye: number, // : 当前余额 ,
  glid?: number, // : 关联该次交易id ,
  id?: number, // : 订单id,用以查询该笔消费传入参数 ,
  jylx: string, // : 交易类型 ,
  sqye: number, // : 当前余额
}
interface IState {
  showRadio: boolean
  showIndex: boolean
  tableColumns:IColumn[]
  searchData:ISearchData,
  shortcuts:Ishortcuts[],
  formInline:IFormInline,
  detailData:IDetailData
}

export default defineComponent({
  name: 'detail',
  props: {
    showDialogm: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: null
    },
  },
  components: { DetailedIntroduction },
  setup(props, context) {
    const tableBlockRef = ref()
    const getTable = async (datas:ITablefy) => {
      const data:any = {
        isPage: true, // : 是否支持分页 ,
        jsrqEnd: state.formInline.region[1], // : 结算日期-截止 ,
        jsrqStart: state.formInline.region[0], // : 结算日期-起始 ,
        jylx: state.formInline.user, // : 交易类型 ,
        pageNum: datas.pageNum, // : 页数 ,
        pageSize: datas.pageSize, // : 每页数量 ,
        rybh: props.row.rybh, // : 人员编号 ,
        jgh: 420100131
      }
      const dataData:any = {}
      for (const key in data) {
        if (data[key] !== '') {
          dataData[key] = data[key]
        }
      }
      const res = await accountManagement.queryCondition(dataData)
      state.detailData = res.data.list[0]
      return res.data
    }
    const state = reactive<IState>({
      showRadio: false,
      showIndex: false, // 一个函数
      tableColumns: [
        { title: '交易类型', hidden: true, slot: 'jylxslot' },
        { title: '交易时间', hidden: true, slot: 'jysjslot' },
        { title: '当前余额', hidden: true, slot: 'demoslot' },
      ],
      searchData: {
        area: 66,
      },
      shortcuts: [{
        text: '最近一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })()
      }, {
        text: '最近一个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        })()
      }, {
        text: '最近三个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        })()
      }],
      formInline: {
        user: '',
        region: ''
      },
      // 详细信息
      detailData: {
        bdje: 0, // : 变动金额 ,
        cjsj: '', // : 交易时间 ,
        dqye: 0, // : 当前余额 ,
        jylx: '', // : 交易类型 ,
        sqye: 0, // : 当前余额
      }
    })

    const onSubmit = (): void => {
      tableBlockRef.value.refresh()
    }
    const show = ref<boolean>(false)
    const selectionChange = (data:any) => {
      console.log(data, 666)
    }
    // 点击table的时候触发
    const handleOperate = async (val:any) => {
      state.detailData = val
    }
    watch(show, (v) => {
      context.emit('update:showDialogm', v)
      if (v) {
        state.detailData = {
          bdje: 0, // : 变动金额 ,
          cjsj: '', // : 交易时间 ,
          dqye: 0, // : 当前余额 ,
          jylx: '', // : 交易类型 ,
          sqye: 0, // : 当前余额
        }
      }
    })
    watch(() => (props.showDialogm), (v) => {
      show.value = v
    })
    return {
      ...toRefs(state),
      handleOperate,
      getTable,
      tableBlockRef,
      selectionChange,
      onSubmit,
      show
    }
  }
})
</script>

<style lang="scss" scoped>
.TableClass {
  display: flex;
  width: 100%;
  justify-content: space-between;
  .tablebodyClass {
    width: 35%;
    padding: 20px;
    border-right: 1px solid #eee;
  }
  .tablebody {
    width: 64%;
    .money {
      .h-col {
        height: 40px;
        line-height: 40px;
        color: #666;
        font-size: 16px;
        .moneyColor {
          color: #333;
          margin-left: 10px;
        }
      }
    }
  }
}
.h-row {
  width: 100% !important;
  .h-col {
    padding-left: 20px;
  }
}
</style>
