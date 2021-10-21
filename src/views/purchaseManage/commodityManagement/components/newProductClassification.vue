<template>
  <h-container class="newProductClassification">
    <h-form
      :inline="true"
      :rules="rules"
      size="mini"
      :model="formInline"
      ref="numberValidateFormRef"
      class="demo-form-inline"
    >
      <h-form-item label="分类名称" prop="flmc">
        <h-input v-model="formInline.flmc" placeholder="分类名称"></h-input>
      </h-form-item>
      <h-form-item label="是否启用" prop="flzt">
        <h-radio-group v-model="formInline.flzt">
          <h-radio label="1" value="1">是</h-radio>
          <h-radio label="2" value="2">否</h-radio>
        </h-radio-group>
      </h-form-item>
    </h-form>
      <div class="footer">
        <h-button type="primary" size="mini" @click="onSubmit">确定</h-button>
        <h-button type="primary" size="mini" @click="cancel">取消</h-button>
      </div>
  </h-container>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { Iaddgoods } from '@/api/model/consumerOrderFinance'
import CommodityManagements from '@/api/consumerOrderFinance/commodityManagement'
import { HMessage } from '@hz-lib/han-ui-next'
type formKey = 'flmc' | 'flzt' ;
// 表单
interface IFormInline {
  flmc: string,
  region: string,
  flzt: string,
  jsh:string
}
interface IRulesType {
  min?: number,
  max?: number,
  required?: boolean,
  type?: string,
  message: string,
  trigger: string
}
type IRules={
  [propName in formKey]: IRulesType[];
};
interface IState {
  formInline: IFormInline,
  numberValidateFormRef:null | HTMLFormElement,
  rules: IRules,
  addgoods:Iaddgoods
}
export default defineComponent({
  props: {
    statue: {
      type: Boolean
    }
  },
  setup(props, context) {
    // console.log('----------------', props.statue)
    const state = reactive<IState>({
      formInline: {
        flmc: '',
        region: '',
        flzt: '',
        jsh: ''
      },
      numberValidateFormRef: null,
      rules: {
        flmc: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        flzt: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ]
      },
      addgoods: {
        // cjr: '',
        cjsj: '',
        flmc: '',
        flzt: '',
        // id: '',
        jgh: '',
        rybh: '',
        // xgr: '',
        xgsj: '',
        yxgmspzl: '',
        zt: '',
      }
    })
    const onSubmit = async () => {
      // state.addgoods.flmc = state.formInline.flmc
      if (state.numberValidateFormRef) {
        // state.formInline
        // console.log(' state.formInline', state.formInline)
        state.numberValidateFormRef.validate(async (valid: any) => {
          if (valid) {
            const res = await CommodityManagements.addSpflList(
              {
                flmc: state.formInline.flmc,
                flzt: state.formInline.flzt,
                jgh: '420100131',
                zt: '1'
              }
            )
            if (res.code === '200') {
              context.emit('refreshTable')
              context.emit('close')
              HMessage({
                type: 'success',
                message: '新增成功!'
              })
            } else {
              HMessage({
                type: 'info',
                message: '新增失败'
              })
            }
          } else {
            // console.log('error submit!!')
            return false
          }
        })
      }
    }
    const cancel = () => {
      context.emit('close')// 取消事件,改变父级的值
    }
    return {
      ...toRefs(state),
      onSubmit,
      cancel
    }
  }
})
</script>

<style lang="scss" scoped>
.newProductClassification {
  .demo-form-inline {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: auto;
  }
  .footer {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 40px;
    width: 100%;
    // height:60px;
  }
}
</style>
