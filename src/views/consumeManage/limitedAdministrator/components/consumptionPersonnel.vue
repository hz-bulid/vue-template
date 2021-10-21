<template>
  <div class="headercx">
    <h-input placeholder="请输入内容" size="small" v-model="nameVal" clearable>
    </h-input>
    <h-button
      @click="inquire()"
      style="margin-left: 20px"
      type="primary"
      size="small"
      >查询</h-button
    >
  </div>
  <div class="buttonClass">
    <h-button type="primary" size="small" @click="cancelLimited(0, '+')"
      >取消限制</h-button
    ><h-button type="primary" size="small" @click="showDialogry = true"
      >添加人员</h-button
    >
  </div>
  <div class="tableClass">
    <div id="index">
      <h-table-block
        ref="tableBlockRef"
        height="430px"
        :method="getTable"
        :params="searchData"
        :show-paging="true"
        :showRadio="showRadio"
        :showIndex="showIndex"
        :page-sizes="[10, 20, 50, 100]"
        :table-columns="tableColumns"
        @selection-change="selectionChange"
      >
        <template #demoslot="{ row }">
          <span>
            <span
              class="spanColor"
              style="margin-left: 20px"
              @click="cancelLimited(row.id, '-')"
            >
              取消限制
            </span>
          </span>
        </template>
      </h-table-block>
    </div>
  </div>

  <h-dialog-block
    wd="400px"
    ht="200px"
    v-model:showViewModel="showDialogry"
    title="添加人员"
  >
    <h-form
      :model="ruleForm"
      status-icon
      size="small"
      :rules="rules"
      ref="ruleFormRef"
      label-width="50px"
      class="demo-ruleForm"
    >
      <h-form-item label="姓名:" prop="name">
        <div class="nameClass">
          <h-select
            v-model="ruleForm.name"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <template v-if="options[0]">
              <h-option
                v-for="item in options[0].rylb"
                :key="item.ryxm"
                :label="item.ryxm"
                :value="item.rybh"
              >
              </h-option>
            </template>
          </h-select>
        </div>
      </h-form-item>
      <h-form-item class="buttons">
        <h-button type="primary" @click="submitForm()">提交</h-button>
        <h-button @click="showDialogry = false">取消</h-button>
      </h-form-item>
    </h-form>
  </h-dialog-block>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive, toRefs, ref } from 'vue'
import limitedConsumption from '@/api/limitedAdministrator/limitedAdministrator'
import { HMessage, HMessageBox } from '@hz-lib/han-ui-next'
import { IDatas, ISelect } from '@/views/consumeManage/limitedAdministrator/limitedAdministrator'

export default defineComponent({
  name: 'consumptionPersonnel',
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    // 表格数据
    const getTable = async (is:any) => {
      const dataTable:any = {
        id: props.id,
        isPage: true,
        pageNum: is.pageNum,
        pageSize: is.pageSize,
        jgh: 420100131,
      }
      if (datas.nameVal !== '') {
        dataTable.ryxm = datas.nameVal
      }
      const res = await limitedConsumption.limitedList(dataTable)
      return res.data
    }
    // select选择的时候触发
    const loading = ref(false)
    const remoteMethod = async (query:string) => {
      if (query !== '') {
        loading.value = true
        setTimeout(async () => {
          loading.value = false
          const res = await limitedConsumption.bjx({ ryxm: query, jgh: 420100131 })
          datas.options = res.data
        }, 200)
      } else {
        datas.options = []
      }
    }
    const tableBlockRef = ref()
    // 验证使用
    const validatePass = (rule:any, value: string, callback:any): void => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else {
        if (datas.ruleForm.name !== '' && datas.ruleFormRef) {
          datas.ruleFormRef.validateField('checkPass')
        }
        callback()
      }
    }

    const datas = reactive<IDatas>({
      nameVal: '',
      showDialogry: false,
      showRadio: true,
      showIndex: true, // 一个函数
      tableColumns: [
        { prop: 'ryxm', title: '姓名' },
        { prop: 'jsh', title: '病室号' },
        {
          title: '操作',
          hidden: true,
          slot: 'demoslot',
          width: '150'
        },
      ],
      searchData: {
        area: 66,
      },
      ruleForm: {
        name: ''
      },
      rules: {
        name: [{ validator: validatePass, trigger: 'blur' }]
      },
      ruleFormRef: null,
      // 下拉数据
      bjxData: '',
      selectValue: '',
      // 多选
      multipleChoice: [],
      options: [],
    })
    // 多选取消框
    const selectionChange = (data:ISelect) => {
      datas.multipleChoice = data
    }
    // 取消限制人员
    const cancelLimited = async (id:number, is:string) => {
      let data:any
      if (is === '-') {
        data = [{ id: id, jgh: 420100131 }]
      } else {
        data = datas.multipleChoice
      }
      HMessageBox.confirm('是否取消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await limitedConsumption.cancelLimited(data)
        if (res.code === '200') {
          HMessage({
            type: 'success',
            message: '取消成功!'
          })
        } else {
          HMessage({
            type: 'warning',
            message: '请联系管理员!'
          })
        }
        tableBlockRef.value && tableBlockRef.value.refresh()
      }).catch(() => {
        HMessage({
          type: 'info',
          message: '已取消'
        })
      })
    }
    // 提交按钮
    const submitForm = ():void => {
      if (datas.ruleFormRef) {
        datas.ruleFormRef.validate((valid:boolean):boolean| void => {
          if (valid) {
            if (datas.ruleForm.name !== '') {
              limitedConsumption.addXfxzry({ rybh: datas.ruleForm.name, jgh: 420100131, xfxzid: props.id })
              datas.ruleForm.name = ''
              datas.bjxData = ''
              datas.showDialogry = false
              datas.options = []
            } else {
              HMessage.warning({
                message: '请先选择人员姓名',
                type: 'warning'
              })
            }
          } else {
            return false
          }
        })
      }
      tableBlockRef.value && tableBlockRef.value.refresh()
    }
    // 查询
    const inquire = () => {
      tableBlockRef.value && tableBlockRef.value.refresh()
    }
    return {
      ...toRefs(datas),
      getTable,
      tableBlockRef,
      selectionChange,
      submitForm,
      cancelLimited,
      inquire,
      loading,
      remoteMethod
    }
  }
})
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 20px;
}
.headercx {
  display: flex;
  .h-input {
    width: 300px;
  }
}
.buttonClass {
  margin: 30px 0;
}
.tableClass {
  height: 80vh;
}
.nameClass {
  display: flex;
}
.titlewen {
  margin-top: 20px;
  color: #d9001b;
}
.buttons {
  width: 100%;
  margin-top: 25px;
  display: flex;
  justify-content: center;
}
</style>
