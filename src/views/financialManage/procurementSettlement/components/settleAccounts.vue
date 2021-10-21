<template>
  <h-row>
    <h-col class="spanValue" :span="24"
      >备货单:<span>{{ row.id }}</span></h-col
    >
    <h-col class="spanValue" :span="8"
      >合计金额:<span>{{ row.zje }}元</span></h-col
    >
    <h-col class="spanValue" :span="16"
      >商品数量:<span>{{ row.spsl }}</span></h-col
    >
    <h-col class="spanValue" :span="24">
      <h-button type="primary" @click="inventoryClick(1)" size="small"
        >查看备货清单</h-button
      >
      <h-button type="primary" @click="inventoryClick(2)" size="small"
        >查看配货清单</h-button
      >
      <h-button type="primary" @click="inventoryClick(3)" size="small"
        >查看确定清单</h-button
      >
    </h-col>
    <h-col :span="24">
      <h-form
        size="small"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleFormRef"
        label-width="120px"
        class="demo-ruleForm"
      >
        <h-form-item label="结算方式:" prop="jsfs">
          <h-select v-model="ruleForm.jsfs" placeholder="请选择">
            <h-option autocomplete="off" label="银行转账" value="1"> </h-option>
            <h-option autocomplete="off" label="现金支票" value="2"> </h-option>
          </h-select>
        </h-form-item>
        <h-form-item label="转账/支票编号:" prop="zfBh">
          <h-input v-model.number="ruleForm.zfBh"></h-input>
        </h-form-item>
        <h-form-item label="结算金额:" prop="jsje">
          <h-input v-model.number="ruleForm.jsje"></h-input>
        </h-form-item>
        <h-form-item label="收款方:" prop="skf">
          <h-input v-model="ruleForm.skf"></h-input>
        </h-form-item>
        <h-form-item label="结算日期:" prop="jsrq">
          <h-date-picker
            v-model="ruleForm.jsrq"
            type="datetime"
            placeholder="选择日期时间"
            :shortcuts="shortcuts"
          >
          </h-date-picker>
        </h-form-item>
        <h-form-item class="formButton">
          <h-button type="primary" @click="submitForm('ruleForm')"
            >结算</h-button
          >
          <h-button @click="cancel()">取消</h-button>
        </h-form-item>
      </h-form>
    </h-col>
  </h-row>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import procurementSettlement from '@/api/procurementSettlement/procurementSettlement'
import { HMessageBox, HMessage } from '@hz-lib/han-ui-next'
import { IDatas } from '@/views/financialManage/procurementSettlement/procurementSettlement'
export default defineComponent({
  props: {
    row: {
      type: Object,
      default: null
    }
  },
  setup(props, context) {
    // 验证表单是否为空
    const clearingFormyz = (rule:any, value: number, callback:any):void => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }

    const datas = reactive<IDatas>({
      // 文本框
      ruleForm: {
        bhdBh: props.row.id, // : 备货单编号 ,
        jsfs: '', // : 结算方式 ,
        jsje: '', // : 结算金额 ,
        jsrq: '', // : 结算日期 ,
        skf: '', // : 收款方 ,
        zfBh: '', // : 转账/支票编号
        jgh: '420100131',
      },
      // 验证
      rules: {
        jsfs: [{ validator: clearingFormyz, trigger: 'blur' }],
        jsje: [{ validator: clearingFormyz, trigger: 'blur' }],
        jsrq: [{ validator: clearingFormyz, trigger: 'blur' }],
        skf: [{ validator: clearingFormyz, trigger: 'blur' }],
        zfBh: [{ validator: clearingFormyz, trigger: 'blur' }],
      },
      ruleFormRef: null,
      // 时间选择的快捷
      shortcuts: [{
        text: '今天',
        value: new Date(),
      }, {
        text: '昨天',
        value: (() => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          return date
        })(),
      }, {
        text: '一周前',
        value: (() => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          return date
        })(),
      }],

    })
    // 清单点击事件1查看备货清单2查看配货清单3查看确定清单
    const inventoryClick = (is:number):void => {
      switch (is) {
        case 1:
          context.emit('upIs', true)
          break
        case 2:
          context.emit('showin', true)
          break
        case 3:
          context.emit('showin', true)
          break
        default:
          break
      }
    }
    // 结算按钮
    const submitForm = () => {
      if (datas.ruleFormRef) {
        datas.ruleFormRef.validate(async (valid:boolean) => {
          if (valid) {
            HMessageBox.confirm('请问是否确定结算?', '结算', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              const res = await procurementSettlement.clearingForm([datas.ruleForm])
              context.emit('cancel', false)
              if (res.code === '200') {
                HMessage({
                  type: 'success',
                  message: '结算成功!'
                })
              } else {
                HMessage({
                  type: 'success',
                  message: res.message
                })
              }
            })
          } else {
            return false
          }
        })
      }
    }
    // 取消按钮
    const cancel = (): void => {
      context.emit('cancel', false)
    }

    return {
      ...toRefs(datas),
      submitForm,
      cancel,
      inventoryClick
    }
  }
})
</script>

<style lang="scss" scoped>
.spanValue {
  height: 50px;
  padding-left: 50px;
}
.h-form {
  display: flex;
  flex-wrap: wrap;
  .h-form-item {
    width: 50%;
  }
  .formButton {
    width: 100% !important;
    text-align: center;
    margin-left: -50px;
  }
}
</style>
