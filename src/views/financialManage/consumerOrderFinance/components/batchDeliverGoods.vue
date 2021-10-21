<template>
  <div class="batchDeliverGoods">
    <div class="batchTop">
      <span>已选择:</span>
      <div class="rightBtn" @click="viewSelectedClick">查看已选择</div>
    </div>
    <!-- <div class="batchCenter">
      <div>订单:<span class="colorRed">100</span>条</div>
      <div>总金额:<span class="colorRed">1588</span>元</div>
      <div>商品总数:<span class="colorRed">200</span></div>
    </div> -->
    <totallistAll v-model:totallist="totallistChild"></totallistAll>
    <div class="batchContent">
      请确保已经将商品送给被监管人员，点击确认收货后，消费记录将更新为已完成状态！
    </div>
    <div class="footer">
      <h-button type="primary" @click="onSubmit" size="mini">确认收货</h-button>
      <h-button type="primary" @click="closebtn" size="mini">取 消</h-button>
    </div>
    <!--  -->
    <h-dialog-block
      ht="80%"
      :title="viewSelected.title"
      v-model:showViewModel="viewSelected.statue"
    >
      <viewSelected :row="viewSelected.row" :totallistArr="totallist"></viewSelected>
    </h-dialog-block>
    <h-dialog-block
      ht="22%"
      wd="28%"
      v-model:showViewModel="deleteDialog.statue"
      :title="deleteDialog.title"
    >
    <div class="deleclass">
      <div class="">
        {{deleteDialog.content}}
      </div>
      <div class="footer">
        <h-button  type="primary" @click="fahuoClick" size="mini">确认收货</h-button>
        <h-button type="primary" @click="ondeteleclose" size="mini">取 消</h-button>
      </div>
    </div>
    </h-dialog-block>
  </div>
</template>

<script lang="ts">
import viewSelected from '@/views/financialManage/consumerOrderFinance/components/viewSelected.vue'
import totallistAll from '@/views/financialManage/consumerOrderFinance/components/totallistAll.vue'
import { defineComponent, reactive, toRefs, watch, PropType } from 'vue'
import { HMessageBox, HMessage } from '@hz-lib/han-ui-next'
import ConsumerOrderFinance from '@/api/consumerOrderFinance/consumerOrderFinance'
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
  id:any,
  jgh: string, // 机构号 ,
  rybh: string, // 人员编号 ,
  spjg: string, // 审批结果 1同意 2不同意 一定要传 ,
  spyj: string, // 审批意见 ,
  zt: string, // 状态 管教审批2 所领导3 备货4 发货5 完成6 取消8
}
  interface IViewSelected{
    statue:boolean,
    title:string,
    row:IList[],

  }
interface Itotallist{
  order:number,
  totalAmount:number,
  totalGoods:number,
}
interface IState {
  viewSelected:IViewSelected,
  totallistChild:Itotallist,
  editdata:Ieditdata,
  deleteDialog:{
    statue:boolean,
    title:string,
    content:string,
    type:string
  },
}
export default defineComponent({
  components: {
    viewSelected,
    totallistAll
  },
  props: {
    totallist: {
      type: Object as PropType<Itotallist>,
      default: {}
    },
    row: {
      type: Array as PropType<IList[]>,
      default: []
    }
  },
  setup(props, context) {
    // console.log('--------3333--------', props)
    const state = reactive<IState>({
      viewSelected: {
        statue: false,
        title: '订单',
        row: []
      },
      totallistChild: {
        order: 0,
        totalAmount: 0,
        totalGoods: 0,
      },
      editdata: {
        id: [],
        jgh: '420100131', // 机构号 ,
        rybh: '', // 人员编号 ,
        spjg: '', // 审批结果 1同意 2不同意 一定要传 ,
        spyj: '', // 审批意见 ,
        zt: '', // 状态 管教审批2 所领导3 备货4 发货5 完成6 取消8
      },
      deleteDialog: {
        title: '',
        statue: false,
        content: '',
        type: ''
      }
    })
    watch(() => props.totallist.order, (v:any, c:any):void => {
      // console.log(v, c, 66666666666)
      state.totallistChild.order = v
    }, {
      immediate: true, // 绑定时加载
    })
    watch(() => props.totallist.totalAmount, (v:any, c:any):void => {
      state.totallistChild.totalAmount = v
    }, {
      immediate: true, // 绑定时加载
    })
    watch(() => props.totallist.totalGoods, (v:any, c:any):void => {
      state.totallistChild.totalGoods = v
      // console.log(v, c, 888)
    }, {
      immediate: true, // 绑定时加载
    })
    // 取消
    const closebtn = () => {
      context.emit('close')// 取消事件,改变父级的值
    }
    // 确定
    const onSubmit = () => {
      state.deleteDialog.title = '确认收货'
      state.deleteDialog.statue = true
      state.deleteDialog.content = '对已选择消费记录进行收货操作，请确认选择无误！'

      const ids:any = props.row
      const idArr:string[] = []
      ids.forEach((item:any) => {
        state.editdata.id.push(item.id)
      })
      state.editdata.zt = '6'
      // HMessageBox.confirm('对已选择消费记录进行收货操作，请确认选择无误！?', '确认收货', {
      //   confirmButtonText: '确认发货',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      // }).catch(() => {

      // })
    }
    const fahuoClick = async () => {
      const res = await ConsumerOrderFinance.orderqrsh(
        state.editdata
      )
      if (res.code === '200') {
        context.emit('close')
        context.emit('refreshTable')
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
    // 查看已选择
    const viewSelectedClick = () => {
      state.viewSelected.statue = true
      state.viewSelected.row = props.row
    }
    return {
      ...toRefs(state),
      closebtn,
      onSubmit,
      viewSelectedClick,
      fahuoClick,
      ondeteleclose
    }
  }
})
</script>

<style lang="scss" scoped>
.batchDeliverGoods {
  width: 100%;
  height: 100%;
  line-height: 20px;
  .batchTop {
    margin-top:30px;
    display: flex;
    .rightBtn {
      color: #388ff3;
      margin: 0px 15px;
      border-bottom: 1px solid #388ff3;
      cursor: pointer;
    }
  }
  // .batchCenter {
  //   display: flex;
  //   justify-content: space-around;
  //   margin: 30px 5px;
  //   .colorRed {
  //     color: #F55252;
  //   }
  // }
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
