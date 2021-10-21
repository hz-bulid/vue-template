<template>
  <h-container class="addNewProducts">
    <h-main>
      <h-form
        :inline="true"
        :rules="rules"
        size="mini"
        :model="formInline"
        ref="numberValidateFormRef"
        class="demo-form-inline"
        label-width="100px"
      >
        <h-form-item label="商品名称" prop="spmc">
          <h-input v-model="formInline.spmc" placeholder="商品名称"></h-input>
        </h-form-item>
        <h-form-item label="商品价格" prop="spjg">
          <h-input v-model="formInline.spjg" placeholder="商品价格"></h-input>
        </h-form-item>
        <h-form-item label="规格" prop="spgg">
          <h-input v-model="formInline.spgg" placeholder="规格"></h-input>
        </h-form-item>
        <h-form-item label="商品图片" prop="sptp">
          <!-- /api/HZ-FILE/file/upload -->
          <!-- HZ-SPP-STATISTICS-RESULTS-APPLICATION/csi/information/save/file -->
          <h-upload
            class="avatar-uploader"
            action="/api/HZ-SPP-STATISTICS-RESULTS-APPLICATION/csi/information/save/file"
            :data="params"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <!-- v-else -->
            <span class="avatar-ibag">
              <i class="h-icon-plus avatar-uploader-icon"></i>
            </span>
          </h-upload>
        </h-form-item>
        <h-form-item label="是否上架" prop="sjzt">
          <h-radio-group v-model="formInline.sjzt">
            <h-radio label="1">是</h-radio>
            <h-radio label="2">否</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="商品类别" prop="spflid">
          <h-select v-model="formInline.spflid" placeholder="监室号">
            <h-option
              v-for="(item, index) in leftList"
              :key="index"
              :label="item.flmc"
              :value="item.id"
            ></h-option>
          </h-select>
          <!-- <h-input v-model="formInline.spflid" placeholder="商品类别"></h-input> -->
        </h-form-item>
        <h-form-item label="单次购买上限" prop="gmsx">
          <h-input
            v-model="formInline.gmsx"
            placeholder="单次购买上限"
          ></h-input>
        </h-form-item>
        <h-form-item label="创建时间" prop="cjsj">
          <h-date-picker
            v-model="formInline.cjsj"
            type="date"
            placeholder="创建时间"
          >
          </h-date-picker>
          <!-- <h-input v-model="formInline.user" placeholder="创建时间"></h-input> -->
        </h-form-item>
      </h-form>
    </h-main>
    <h-footer>
      <div class="footer" v-if="typeBtn === 'add'">
        <h-button type="primary" size="mini" @click="onSubmit">确定</h-button>
        <h-button type="primary" size="mini" @click="cancel">取消</h-button>
      </div>
      <div class="footer" v-if="typeBtn === 'edit'">
        <h-button type="primary" size="mini" @click="onSubmitedit"
          >确定</h-button
        >
        <h-button type="primary" size="mini" @click="cancel">取消</h-button>
      </div>
    </h-footer>
  </h-container>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch, ref, computed } from 'vue'
import { Iaddgooslist } from '@/api/model/consumerOrderFinance'
import CommodityManagements from '@/api/consumerOrderFinance/commodityManagement'
import { HMessage } from '@hz-lib/han-ui-next'
import storage from '@/utils/library/storage'
type formKey = 'spmc' |'spjg'| 'spgg'|'sptp'|'sjzt'|'spflid'|'gmsx' |'cjsj';
// 表单
interface IFormInline {
  spmc: string,
  spjg:number,
  spgg:string,
  sptp:string,
  sjzt: string,
  spflid:number,
  gmsx:number,
  cjsj:string,
  jsh:string,
  zt:number,
  // id:number,
}
interface IRulesType {
  min?: number,
  max?: number,
  required?: boolean,
  type?: string,
  message: string,
  trigger: string
}
interface IleftList{
  label: string,
  value: string,
}
enum Direction {
      spmc='spmc',
      spjg='spjg'
    }
type IRules={
  [key in Direction]?: IRulesType[];
};
interface IParams {
  path: string
}
interface IState {
  formInline: IFormInline,
  numberValidateFormRef:null | HTMLFormElement,
  rules: IRules,
  addgoodsList:Iaddgooslist,
  leftList:IleftList[],
  id:any,
  typeBtn:any,
  params:IParams
}
export default defineComponent({
  props: {
    statue: {
      type: Boolean
    },
    row: {
      type: Object
    },
    type: {
      type: String
    },
    id: {
      type: Number,
      default: null
    }
  },
  setup(props, context) {
    // console.log('-------------cc---', context)
    const state = reactive<IState>({
      formInline: {
        spmc: '',
        spjg: 1,
        spgg: '',
        sptp: '',
        sjzt: '',
        spflid: 1,
        gmsx: 1,
        cjsj: '',
        jsh: '420100131',
        zt: 1
        // id: ''
      },
      addgoodsList: {},
      numberValidateFormRef: null,
      leftList: [],
      typeBtn: '',
      id: '',
      rules: {
        spmc: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }

        ],
        spjg: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ]
      },
      params: {
        path: 'caiwu'
      }
    })
    const headers = computed(() => {
      const token = storage.getItem('token')
      return {
        token
      }
    })
    let imageUrl = ref<any>('')
    watch(() => (props), (v) => {
      state.typeBtn = props.type
      // state.id =
      // console.log('props.row', props.row)
      // console.log('🚀 ~ file: addNewProducts.vue ~ line 122 ~ watch ~ v', v)
      if (props.type === 'details') {
        state.formInline = JSON.parse(JSON.stringify(props.row))
        // imageUrl.value = state.formInline.sptp
        console.log('🚀 ~ file: addNewProducts.vue ~ line 203 ~ watch ~ imageUrl.value', imageUrl.value)
      } else if (props.type === 'edit') {
        state.formInline = JSON.parse(JSON.stringify(props.row))
        // imageUrl.value = state.formInline.sptp
        imageUrl = '/upload/hz/' + state.formInline.sptp
        console.log('🚀  watch ~ imageUrl.value', state.formInline.sptp)
      }
    }, { immediate: true })
    // 新增
    const onSubmit = (): void => {
      // const str = 'http://localhost:6080/caiwu/edcff5bf-04a0-4ba6-a7fe-1abf4c041245'
      // console.log(str.slice(str.indexOf('/caiwu')), 66666666666666, imageUrl.value)

      // state.formInline.sptp = '/caiwu/' + imageUrl.value.split('/')[3]
      // state.formInline.sptp = imageUrl.value
      console.log('🚀 ~ file: addNewProducts.vue ~ line 213 ~ onSubmit ~ imageUrl.value', imageUrl.value)
      if (state.numberValidateFormRef) {
        state.numberValidateFormRef.validate(async (valid: any) => {
          if (valid) {
            // const id:any = props.row.id
            const res = await CommodityManagements.addSpxxList(
              {
                spmc: state.formInline.spmc,
                spjg: state.formInline.spjg,
                spgg: state.formInline.spgg,
                sptp: state.formInline.sptp,
                sjzt: state.formInline.sjzt,
                spflid: state.formInline.spflid,
                gmsx: state.formInline.gmsx,
                cjsj: state.formInline.cjsj,
                jgh: '420100131', // 机构号 ,
                id: props.id,
                zt: 1
              }
            )
            if (res.code === '200') {
              context.emit('refreshTable')
              context.emit('closed')
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
            // refreshTable
          } else {
            return false
          }
        })
      }
    }
    // 编辑onSubmitedit
    const onSubmitedit = (): void => {
      //
      if (state.numberValidateFormRef) {
        state.numberValidateFormRef.validate(async (valid: any) => {
          if (valid) {
            // const id:any = props.row.id
            const res = await CommodityManagements.updateSpxx(
              {
                spmc: state.formInline.spmc,
                spjg: state.formInline.spjg,
                spgg: state.formInline.spgg,
                sptp: state.formInline.sptp,
                sjzt: state.formInline.sjzt,
                spflid: state.formInline.spflid,
                gmsx: state.formInline.gmsx,
                cjsj: state.formInline.cjsj,
                jgh: '420100131', // 机构号 ,
                id: props.id,
                zt: 1
              }
            )
            if (res.code === '200') {
              context.emit('refreshTable')
              context.emit('closed')
              HMessage({
                type: 'success',
                message: '修改成功!'
              })
            } else {
              HMessage({
                type: 'info',
                message: '修改失败'
              })
            }
          } else {
            return false
          }
        })
      }
    }
    // 商品分类左侧
    const querySpf = async () => {
      const res = await CommodityManagements.querySpflList({
        jgh: '420100131'
      })
      state.leftList = res.data
    }
    querySpf()
    const cancel = () => {
      context.emit('closed')// 取消事件,改变父级的值
    }
    //

    const handleAvatarSuccess = (res:any, file:any):void => { // #TODO:element类型暂不明确
      state.formInline.sptp = res.data
      // imageUrl.value = URL.createObjectURL(file.raw)
      imageUrl.value = URL.createObjectURL(file.raw)
      console.log(imageUrl.value, 555555555555555)
    }
    const beforeAvatarUpload = (file:any):void => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   HMessage.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        HMessage.error('上传头像图片大小不能超过 2MB!')
      }
      // return isJPG && isLt2M
    }
    return {
      ...toRefs(state),
      onSubmit,
      headers,
      cancel,
      onSubmitedit,
      imageUrl,
      handleAvatarSuccess,
      beforeAvatarUpload
    }
  }
})
</script>

<style lang="scss" scoped>
.addNewProducts {
  display: flex;
  flex-direction: column;
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
  .avatar-uploader .h-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .h-upload {
      display: flex !important;
      img {
        margin-right: 15px;
      }
    }
  }

  .avatar-uploader .h-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
    float: left;
  }
  .avatar-ibag {
    padding: 30px 15px;
    margin-left: 20px;
    line-height: 80px;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
  }
}
</style>
