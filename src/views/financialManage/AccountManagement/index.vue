<!--
 * @Author: your name
 * @Date: 2021-03-31 17:10:54
 * @LastEditTime: 2021-04-03 12:55:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \han-ui-next\website\play\index.vue
-->
<template>
  <div class="AccountManagement">
    <h-container>
      <h-aside width="16vw">
        <h-card>
          <template #header>
            <div class="card-header">
              <span>账户统计</span>
            </div>
          </template>
          <div class="balance">
            <h3>总余额</h3>
            <h3>{{ List.zye }}元</h3>
          </div>
          <div class="detailList">
            <div
              @click="statisticsClicks(0)"
              :class="{ isHover: statisticsCount == 0 }"
            >
              <span>全部</span>
              <span class="number">{{ List.zhzs }}</span>
            </div>
            <div
              @click="statisticsClicks(1)"
              :class="{ isHover: statisticsCount == 1 }"
            >
              <span>正常</span>
              <span class="number">{{ List.zczh }}</span>
            </div>
            <div
              @click="statisticsClicks(2)"
              :class="{ isHover: statisticsCount == 2 }"
            >
              <span>已销户</span>
              <span class="number">{{ List.xhzh }}</span>
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
            <h-form-item label="被监管人姓名" prop="ryXm">
              <h-input
                clearable
                v-model="formInline.ryXm"
                placeholder="姓名"
              ></h-input>
            </h-form-item>
            <h-form-item label="监室号" prop="jsh">
              <!-- <h-select v-model="formInline.jsh" placeholder="监室号">
                <h-option label="区域一" value="shanghai"></h-option>
                <h-option label="区域二" value="beijing"></h-option>
              </h-select> -->
              <h-cascader
                v-model="formInline.jsh"
                clearable
                :options="options"
                @change="handleChange()"
              ></h-cascader>
            </h-form-item>
            <h-form-item label="身份证号" prop="zjHm">
              <h-input
                clearable
                v-model="formInline.zjHm"
                placeholder="身份证号"
                oninput="value=value.replace(/^\.+|[^\d0x]/g,'')"
              ></h-input>
            </h-form-item>
            <h-form-item label="账户状态" prop="zt">
              <h-select
                v-model="formInline.zt"
                clearable
                placeholder="账户状态"
              >
                <h-option label="正常" :value="1"></h-option>
                <h-option label="已销户" :value="0"></h-option>
              </h-select>
            </h-form-item>
            <h-form-item>
              <h-button type="primary" @click="onSubmit" size="small"
                >查询</h-button
              >
              <h-button @click="resetForm()">重置</h-button>
            </h-form-item>
          </h-form>
        </h-header>
        <h-main style="height: 80vh">
          <h-table-block
            ref="tableRef"
            height="70vh"
            :method="getTable"
            :show-paging="true"
            :page-sizes="[10, 20, 50, 100]"
            :table-columns="tableColumns"
            :showRadio="tableOption.showRadio"
            :showIndex="tableOption.showIndex"
          >
            <template #indexslot="{ row }">
              <span>{{ row.index + 1 }}</span>
            </template>
            <template #demoslot="{ row }">
              <span>{{ row.ztvalue }}</span>
            </template>
            <template #buttonslot="{ row }">
              <span
                class="spanColor"
                @click="operationAllClick(row.index, row, '查看明细')"
                >查看明细</span
              >
              <span
                v-if="row.zt !== '0'"
                class="spanColor"
                @click="operationAllClick(row.index, row, '清退注销')"
                >清退注销</span
              >
              <span
                v-if="row.zt !== '0'"
                class="spanColor"
                @click="operationAllClick(row.index, row, '修改密码')"
                >修改密码</span
              >
            </template>
          </h-table-block>
        </h-main>
      </h-container>
    </h-container>
    <h-dialog-block
      v-model:showViewModel="pass"
      title="修改密码"
      ht="200px"
      wd="400px"
    >
      <change-password
        :row="row"
        @showDialogpass="pass = $event"
      ></change-password>
    </h-dialog-block>
    <logout :row="row" v-model:showDialogl="logout"></logout>
    <detail :row="row" v-model:showDialogm="mxshowDialog"></detail>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import { IColumn, ITableData, ITableOption } from '@/types/table'
import accountManagement from '@/api/accountManagement/accountManagement'
import ChangePassword from '@/views/financialManage/AccountManagement/components/changePassword.vue'
import logout from '@/views/financialManage/AccountManagement/components/logout.vue'
import detail from '@/views/financialManage/AccountManagement/components/detail.vue'
import ConsumerOrderFinance from '@/api/consumerOrderFinance/consumerOrderFinance'
interface IAccountStatus {
  status:string
}

interface IList {
  date: string
  name:string
  address:string
  accountStatus:IAccountStatus
}
interface IFormInline {
  isPage: boolean,
  jsh: string,
  pageNum: number,
  pageSize: number,
  ryXm: string,
  sort: string,
  sortField: string,
  zjHm: string,
  zt: string
}
interface ILists {
  xhzh ?:number, // 销户账户数量 ,
  zczh ?:number, // 正常账户数量 ,
  zhzs ?:number, // 账户总数 ,
  zye?:number, // 总余额
}
 type optionsType = {
  value?:string,
  label?:string,
  disabled?:boolean,
  children?:optionsType[]
};
interface IState {
  List:ILists,
  tableOption:ITableOption
  tableColumns:IColumn[]
  formInline: any,
  ruleFormRef:null | HTMLFormElement,
  statisticsCount:number,
  row:any,
  options:optionsType[]
}
export default defineComponent({
  name: 'Index',
  components: { ChangePassword, logout, detail },
  setup() {
    // 表格数据
    const getTable = async (fy:ITablefy):Promise<ITable> => {
      state.formInline.pageNum = fy.pageNum
      state.formInline.pageSize = fy.pageSize
      const data:any = {}
      for (const key in state.formInline) {
        if (state.formInline[key] !== '') { data[key] = state.formInline[key] }
      }
      const res = await accountManagement.query(data)
      return res.data
    }
    // 左侧数据
    const LeftQuery = async () => {
      const ress = await ConsumerOrderFinance.getQyTree({ jgh: '420100131' })
      const res = await accountManagement.LeftQuery()
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
      console.log(newList, 66666)
      state.options = newList
      state.List = res.data
    }
    LeftQuery()
    const state = reactive<IState>({
      List: {}, //
      // 控制表格是否显示序号以及多选
      tableOption: {
        showRadio: false,
        showIndex: false
      },
      tableColumns: [
        { title: '序号', hidden: true, slot: 'indexslot' },
        { prop: 'ryxm', title: '姓名' },
        { prop: 'jsh', title: '监室号' },
        { prop: 'zjhm', title: '身份证号' },
        { prop: 'zhye', title: '当前余额' },
        { title: '账户状态', hidden: true, slot: 'demoslot' },
        {
          title: '操作', width: '250', hidden: true, slot: 'buttonslot'
        }
      ],
      // 表单数据
      formInline: {
        isPage: true,
        jsh: '',
        pageNum: 1,
        pageSize: 10,
        ryXm: '',
        sort: '',
        sortField: '',
        zjHm: '',
        zt: '',
        jgh: 420100131
      },
      ruleFormRef: null,
      // 控制左边的选中状态
      statisticsCount: 0,
      // 按钮保存的每一行数据
      row: {},
      // 监视号的数据
      options: []
    })
    // 弹窗的隐藏
    const mxshowDialog = ref(false)
    const logout = ref(false)
    const pass = ref(false)
    const tableRef = ref()
    // 查询
    const onSubmit = async () => {
      tableRef.value && tableRef.value.refresh()
    }
    // 重置按钮
    const resetForm = (): void => {
      if (state.ruleFormRef) {
        state.ruleFormRef.resetFields()
      }
    }
    // table操作按钮
    const operationAllClick = (index:number, row:IList, BName:string):void => {
      state.row = row
      switch (BName) {
        case '查看明细':
          mxshowDialog.value = true
          break
        case '清退注销':
          logout.value = true
          break
        case '修改密码':
          pass.value = true

          break
        default:
          break
      }
    }
    // 侧边栏的点击事\数据
    const statisticsClicks = (is:number):void => {
      state.statisticsCount = is
      switch (is) {
        case 0:
          state.formInline.zt = ''
          break
        case 1:
          state.formInline.zt = 1
          break
        case 2:
          state.formInline.zt = 0
          break
        default:
          break
      }
      tableRef.value && tableRef.value.refresh()
    }
    // 监室号的选中
    const handleChange = (value:any):void => {
      state.formInline.jsh = state.formInline.jsh.splice(-1).join('')
    }
    watch(logout, (v) => {
      tableRef.value && tableRef.value.refresh()
    })
    return {
      ...toRefs(state),
      onSubmit,
      resetForm,
      getTable,
      statisticsClicks,
      operationAllClick,
      mxshowDialog,
      logout,
      pass,
      tableRef,
      handleChange
    }
  }
})
</script>

<style lang="scss" scoped>
.AccountManagement {
  // height: 100vh;
  .balance {
    // text-align: center;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    h3:nth-child(1) {
      height: 14px;
      font-family: HiraginoSansGB-W3;
      font-size: 14px;
      color: #666666;
      font-weight: 300;
      margin-bottom: 10px;
    }
    h3:nth-child(2) {
      height: 24px;
      font-family: HiraginoSansGB-W3;
      font-size: 24px;
      color: #0091ff;
      font-weight: 300;
    }
  }
  .h-form {
    padding-top: 15px;
  }
  .detailList {
    height: 65vh;
    div:hover {
      border: 1px solid #0091ff;
      box-shadow: inset 4px 0 0 0 #0091ff;
    }
    div {
      margin: 15px 0;
      border: 1px solid #eee;
      padding: 10px 20px;
      border-radius: 7px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      .number {
        color: #0091ff;
      }
    }
    .isHover {
      border: 1px solid #0091ff;
      box-shadow: inset 4px 0 0 0 #0091ff;
    }
  }
}
</style>
