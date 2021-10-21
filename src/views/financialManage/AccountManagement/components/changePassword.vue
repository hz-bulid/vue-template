<template>
  <div>
    <h-form
      class="formTop"
      size="small"
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleFormRef"
      label-width="70px"
    >
      <h-form-item label="新密码" prop="pass">
        <h-input type="text" v-model="ruleForm.pass"></h-input>
      </h-form-item>
      <h-form-item class="buttonClass">
        <h-button type="primary" @click="submitForm()">提交</h-button>
        <h-button @click="resetForm()">取消</h-button>
      </h-form-item>
    </h-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType } from 'vue'
import { HMessageBox, HMessage } from '@hz-lib/han-ui-next'
import accountManagement from '@/api/accountManagement/accountManagement'

export default defineComponent({
  props: {
    row: {
      type: Object,
      default: null
    }
  },
  setup(props, context) {
    const validatePass = (rule:any, value: string, callback:any): void => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.trim().length >= 6 && value.trim().length <= 12) {
          callback()
        } else {
          callback(new Error('密码长度为6-12位'))
        }
      }
    }
      interface IRuleForm {
        pass: string,
      }
      interface IRules {
        trigger: string,
        validator:(rule:any, value: string, callback:any)=>void
      }
      interface IPass {
        pass:IRules[]
      }
      interface IDatas {
        ruleForm: IRuleForm,
        rules: IPass,
        ruleFormRef:null | HTMLFormElement
      }
      const datas = reactive<IDatas>({
        ruleForm: {
          pass: ''
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'blur' }]
        },
        ruleFormRef: null
      })
      // 提交按钮
      const submitForm = (): void => {
        if (datas.ruleFormRef) {
          datas.ruleFormRef.validate(async (valid:boolean) => {
            if (valid) {
              context.emit('showDialogpass', false)
              const res = await accountManagement.ChangeThePassword({ xzhmm: datas.ruleForm.pass, ryBh: props.row.rybh })
              if (res.code === '200') {
                HMessage({
                  type: 'success',
                  message: '修改成功!'
                })
              } else {
                HMessage({
                  type: 'info',
                  message: '请联系管理员'
                })
              }
              datas.ruleForm.pass = ''
            } else {
              return false
            }
          })
        }
      }
      const resetForm = (): void => {
        if (datas.ruleForm.pass !== '') {
          HMessageBox.confirm('还没修改, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            HMessage({
              type: 'success',
              message: '退出成功!'
            })
            context.emit('showDialogpass', false)
          }).catch(() => {
            HMessage({
              type: 'info',
              message: '请提交'
            })
          })
        } else {
          context.emit('showDialogpass', false)
        }
      }
      return {
        ...toRefs(datas),
        submitForm,
        resetForm
      }
  }
})
</script>
<style lang="scss" scoped>
.buttonClass {
  position: relative;
  padding: 10px 0;
  margin-left: 50px;
}
.formTop {
  margin-top: 20px;
}
</style>
