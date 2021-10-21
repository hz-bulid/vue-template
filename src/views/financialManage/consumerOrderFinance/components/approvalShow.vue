<template>
<!-- 审批弹框 Approval -->
<div>
  <div class="details-box">
    <div class="details-smallbox">
      <div  class="details-list">
        <h5>被监管人员</h5>
        <div class="details-item">
          <div class="title-top">
            <div>姓名:<span class="leftSpan">{{rowlist.xm}}</span></div>
            <div>监室号:<span class="leftSpan">{{rowlist.jsh}}</span></div>
          </div>
        </div>
      </div>
      <div  class="details-list">
        <h5>消费信息</h5>
        <div class="details-item">
          <div class="title-top">
            <div>消费时间:<span class="leftSpan">{{rowlist.xdsj}}</span></div>
            <div>消费类型:<span class="leftSpan">{{rowlist.xflxvalue}}</span></div>
          </div>
          <div class="title-top">
            <div>消费金额:<span class="leftSpan">{{rowlist.xfje}}</span></div>
            <div>当前余额:<span class="leftSpan">{{rowlist.xfye}}</span></div>
          </div>
        </div>
      </div>

      <div class="table_box centerTable">
        <div class="tabtitle">
        <div class="tableTitle">本月消费额度:<span class="leftSpan">{{rowlist.bykxfed}}</span></div>
        <div class="tableTitle">本月消费剩余额度:<span class="leftSpan">{{rowlist.bysyxfed}}</span></div>
        </div>
        <h-table
          :data="spendingList"
          border
          stripe
          height="100%"
          style="width: 100%"
          size="mini"
          class="table"
        >
            <h-table-column
            v-for="(item, index) in spendingColumns"
              show-overflow-tooltip
              :prop="item.prop"
              :label="item.label"
              :key="index"
            ></h-table-column>
        </h-table>
      </div>
      <div class="details-list" v-if="rowlist.ddzt==='3'">
        <h5>管教审批</h5>
        <div class="details-item">
          <div class="title-top">
            <div>审批人:张三</div>
            <div>审批结果:同意</div>
          </div>
          <div class="title-top">
            审批意见:xxxxxxxxxx
          </div>
        </div>
      </div>
      <div class="details-list">
        <h5>审批</h5>
        <h-form :inline="true" :model="formInline"  ref="numberValidateFormRef" class="rest-from">
        <h-form-item label="审批意见" prop="spyj">
          <h-input v-model="formInline.spyj" placeholder="审批意见" type="textarea" :autosize="{ minRows: 2}"></h-input>
        </h-form-item>
        </h-form>
        <div class="footer">
          <h-button type="primary" size="mini" @click="onSubmit">通过</h-button>
          <h-button size="mini" @click="closebtn">拒绝</h-button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType, watch } from 'vue'
import ConsumerOrderFinance from '@/api/consumerOrderFinance/consumerOrderFinance'
import { HMessageBox, HMessage } from '@hz-lib/han-ui-next'

interface IList {
  bhd:string
  ddzt:string
  dqye:string
  id:string
  index: number
  jsh: string
  list: any[]
  nr:any[]
  pageNum: number
  pageSize: number
  rybh: string
  total:number
  xdsj: string
  xfje: string
  xflx: string
  xm: string
}
interface Ieditdata{
  id:string[],
  jgh: string, // 机构号 ,
  list: any[], // (Array[string], optional): id数组/监室号数组 ,
  rybh: string, // 人员编号 ,
  spjg: string, // 审批结果 1同意 2不同意 一定要传 ,
  spyj: string, // 审批意见 ,
  zt: string, // 状态 管教审批2 所领导3 备货4 发货5 完成6 取消8
}
export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
    },
    row: {
      type: Object as PropType<IList[]>,
      default: []
    },
    type: {
      type: String,
      default: ''
    }

  },
  setup(props, context) {
    console.log(props.id)
    console.log(props)
    interface INspendingColumns{
      prop:string,
      label:string,
    }
    interface INspendingList{
      name:string,
      price:string,
      type:string,
      num:string,
    }
    interface Idetailslist{
      namekey:string,
      name:string,
      jshname:string,
      jsh:string,
      shenpiname:string,
      shenpi:string,
      titlename:string,
      data:string,
    }
    // 表单
    interface IFormInline {
      spyj: string,
    }
    interface IDatas{
      spendingList:INspendingList[],
      spendingColumns:INspendingColumns[],
      detailslist:Idetailslist[],
      formInline: IFormInline,
      rowlist:
      {
        xm:string,
        jsh:string,
        xflxvalue:string,
        xfje:string,
        dqye:string,
        xdsj:string,
        ddzt:string,
        rybh:string,
        zt:string,
        bykxfed:string,
        bysyxfed:string,
      },
      id:any,
      editdata:Ieditdata,
      typeNum:string,
    } // spendingList
    const datas = reactive<IDatas>({
      spendingList: [],
      detailslist: [],
      spendingColumns: [
        {
          prop: 'spmc',
          label: '名称'
        },
        {
          prop: 'jg',
          label: '单价'
        },
        {
          prop: 'je',
          label: '金额'
        },
        {
          prop: 'gg',
          label: '规格'
        },
        {
          prop: 'sl',
          label: '数量'
        }
      ],
      formInline: {
        spyj: '',
      },
      rowlist: {
        xm: '',
        jsh: '',
        xflxvalue: '',
        xfje: '',
        dqye: '',
        xdsj: '',
        ddzt: '',
        rybh: '',
        zt: '', // 状态
        bykxfed: '',
        bysyxfed: ''
      },
      id: '', // 审批
      editdata: {
        id: [],
        jgh: '420100131', // 机构号 ,
        list: [], // (Array[string], optional): id数组/监室号数组 ,
        rybh: '', // 人员编号 ,
        spjg: '', // 审批结果 1同意 2不同意 一定要传 ,
        spyj: '', // 审批意见 ,
        zt: '', // 状态 管教审批2 所领导3 备货4 发货5 完成6 取消8
      },
      typeNum: ''
    })
    watch(() => props.row, (v:any, c:any):void => {
      // console.log('444444444444444444 ~ props.row', props.row)
      datas.rowlist.xm = v.xm
      datas.rowlist.jsh = v.jsh
      datas.rowlist.xflxvalue = v.xflxvalue
      datas.rowlist.xfje = v.xfje
      datas.rowlist.dqye = v.dqye
      datas.rowlist.xdsj = v.xdsj
      datas.rowlist.ddzt = v.ddzt
      datas.rowlist.rybh = v.rybh
      datas.rowlist.zt = v.ddzt
      datas.rowlist.bykxfed = v.bykxfed
      datas.rowlist.bysyxfed = v.bysyxfed
    }, {
      immediate: true, // 绑定时加载
    })
    watch(() => props.type, (v:any, c:any):void => {
      datas.typeNum = v
      // console.log('5555e 239 ~ watch ~ v', v)
    }, {
      immediate: true, // 绑定时加载
    })
    const closebtn = async () => {
      const ids:any = props.id
      const cc:string[] = []
      cc.push(ids)
      datas.editdata.id = cc
      datas.editdata.spyj = datas.formInline.spyj
      datas.editdata.zt = '7'
      // datas.rowlist.zt
      const res = await ConsumerOrderFinance.orderxspadd(
        datas.editdata
      )
      if (res.code === '200') {
        context.emit('close')
        context.emit('refreshTable')
        HMessage({
          type: 'success',
          message: '审批成功!'
        })
      } else {
        HMessage({
          type: 'info',
          message: '审批失败!'
        })
      }
    }
    const onSubmit = async () => {
      const ids:any = props.id
      const cc:string[] = []
      cc.push(ids)
      datas.editdata.id = cc
      console.log('🚀 ~ file: approvalShow.vue ~ line 261 ~ onSubmit ~ datas.editdata.id', datas.editdata.id)
      // datas.editdata.list.push(props.id)
      //  datas.rowlist.zt//2管教//3大队领导
      if (datas.typeNum === '2') {
        datas.editdata.zt = '2'
      } else {
        datas.editdata.zt = '3'
      }
      // datas.editdata.zt = '2'
      const res = await ConsumerOrderFinance.orderxspadd(
        datas.editdata
      )
      if (res.code === '200') {
        context.emit('close')
        context.emit('refreshTable')
        HMessage({
          type: 'success',
          message: '审批成功!'
        })
      } else {
        HMessage({
          type: 'info',
          message: '审批失败!'
        })
      }
    }
    const shopDetailListAll = async () => {
      const idnew = props.id
      datas.id = idnew
      const res = await ConsumerOrderFinance.shopDetailList({
        id: datas.id
      })
      datas.spendingList = res.data
    }
    shopDetailListAll()
    return {
      ...toRefs(datas),
      closebtn,
      onSubmit
    }
  }
  // id{}
})
</script>

<style lang="scss" spoced>
  .details-box{
    width:100%;
    height:80%;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    .footer {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 40px;
      width: 100%;
      // height:60px;
    }
    .centerTable{
    margin-top: 20px;
    margin-bottom: 20px;
    .h-table thead tr th{
      background:rgb(246, 248, 250);
    }
  }
  .leftSpan{
    margin-left: 20px;
  }
  .tabtitle{
    display: flex;
    margin-bottom: 20px;
  }
  .h-table__body-wrapper{
    height:100% !important;
  }
    .rest-from{
      width: 100%;
      margin-top: 20px;
      .h-form-item{
        width: 100%;
        .h-form-item__content{
          width: 80%;
        }
      }
      .footer {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        .h-form-item__content{
          width: auto;
        }
      }
    }
    .tableTitle{

      line-height: 30px;
      width: 50%;
      span{
        color: #D9001B;
      }
    }
    .details-smallbox{
      display: flex;
      flex-direction:column;
      .details-list{
        width:100%;
        h5{
          line-height: 40px !important;
          border-bottom: 1px solid #eee !important;
        }
        .details-item{
          width:100% !important;
          margin: auto;
          display:flex;
          flex-direction: column;
          line-height: 30px;
          .title-top{
            display: flex;
            flex-direction: row;
            div{
              width:50%;
            }
          }
        }
      }
    }
  }

</style>
