<template>
  <h-dialog-block
    wd="550px"
    ht="350px"
    v-model:showViewModel="show"
    title="退款销户"
  >
    <div class="box">
      <div class="expenseCalendar">
        <p>消费订单</p>
        <p
          class="indent"
          v-for="(expense, index) in expenseCalendar"
          :key="index"
        >
          {{ expense.key }}订单: &nbsp;&nbsp;{{ expense.num }}
          <span @click="orderClick(1)">
            {{ expense.key === "未发货" ? "" : "确定收货" }}
          </span>
          <span @click="orderClick(2)"> 取消订单 </span>
        </p>
        <!-- <p class="indent">
          未确定收货订单:1<span @click="orderClick(2)">确定收货</span
          ><span @click="orderClick(1)">取消订单</span>
        </p> -->
      </div>
      <div class="balance">
        <span>账户余额为:{{ row.zhye }}元</span>
        <span>确认要退款销户吗？</span>
      </div>
      <div class="button">
        <!-- <h-button type="primary" @click="print()">打印收条</h-button> -->
        <h-button type="primary" size="small" @click="logout()"
          >确定收货</h-button
        >
        <h-button size="small" @click="cancel()">取消</h-button>
      </div>
    </div>
  </h-dialog-block>
</template>

<script lang='ts'>
import { defineComponent, ref, watch, reactive, toRefs } from 'vue'
import { HMessageBox, HMessage } from '@hz-lib/han-ui-next'
import accountManagement from '@/api/accountManagement/accountManagement'
import { callPrinter } from 'call-printer'
export default defineComponent({
  name: 'logout',
  props: {
    showDialogl: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: null
    }
  },
  setup(props, context) {
   interface IDataValue {
    valueData : string,
    isColor :string,
    isButton :string,
    row:any
   }
   interface IExpenseCalendar {
      code: string
      key: string
      num: string
      value: null
   }
   interface IDatas {
    dataValue:IDataValue,
    expenseCalendar:IExpenseCalendar[]
   }

   const datas = reactive<IDatas>({
     dataValue: {
       valueData: '',
       isColor: '',
       isButton: '',
       row: ''
     },
     expenseCalendar: []
   })
   // 1表示确定收货2表示取消订单
   const orderClick = async (is:number) => {
     let messageBox:string
     if (is === 1) {
       messageBox = '请问是否确认收货?'
     } else {
       messageBox = '请问是否取消订单?'
     }
     let res
     HMessageBox.confirm(messageBox, '订单', {
       confirmButtonText: '确认',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(async () => {
       if (is === 1) {
         res = await accountManagement.materialDate({
           rybh: props.row.rybh, // 人员编号 ,
           zt: 6
         })
       } else {
         res = await accountManagement.cancellationOfOrder({
           rybh: props.row.rybh, // 人员编号 ,
           zt: 8
         })
       }
       HMessage({
         type: 'success',
         message: res.message
       })
     })
   }
   const show = ref<boolean>(false)
   // 取消
   const cancel = async () => {
     show.value = false
   }
   const logout = async () => {
     HMessageBox.confirm('请问是否确定注销?', '注销', {
       confirmButtonText: '确认',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(async () => {
       HMessage({
         type: 'success',
         message: '注销成功!'
       })
       const res = await accountManagement.logout({ rybh: props.row.rybh, jgh: 420100131 })
       show.value = false
     })
   }
   watch(show, (v) => {
     context.emit('update:showDialogl', v)
   })
   watch(() => (props.showDialogl), (v) => {
     show.value = v
     const getData = async () => {
       const res = await accountManagement.returnLogoutGet({ rybh: props.row.rybh, jgh: 420100131 })
       datas.expenseCalendar = res.data
     }
     getData()
   })
   const print = () => {
     const content:any = document.getElementById('content')
     callPrinter(content)
   }
   return {
     ...toRefs(datas),
     orderClick,
     closed,
     show,
     cancel,
     logout,
     print
   }
  }
})
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  .expenseCalendar {
    margin-top: 20px;
    p {
      height: 40px;
      line-height: 40px;
      font-weight: bold;
      margin-left: 10px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      line-height: 22px;
      font-weight: 400;
      color: #666666;
      letter-spacing: 0;
    }
    .indent {
      span {
        margin-left: 30px;
        color: #0091ff;
        font-weight: normal;
        font-size: 15px;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  .balance {
    font-size: 16px;
    color: #666;
    border-top: 1px solid #eee;
    padding-top: 20px;
    span {
      margin-left: 10px;
    }
  }
  .button {
    width: 70%;
    margin: 0 auto;
    position: absolute;
    bottom: 40px;
    left: 50%;
    margin-left: -80px;
    justify-content: space-around;
  }
}
</style>
