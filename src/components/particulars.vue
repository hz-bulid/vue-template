<template>
  <div class="particulars">
    <h-row>
      <h-col class="processingprogress" :span="24">
        <div class="stepsClass">处理进度</div>
        <h-steps
          :active="2"
          align-center
          finish-status="success"
          process-status="finish"
        >
          <h-step
            v-for="(item, index) in datasteps"
            :key="index"
            :title="item.jdmc"
          >
            <template v-slot:description>
              <div class="timeDate">{{ item.czr }}<br />{{ item.czsj }}</div>
            </template>
          </h-step>
        </h-steps>
      </h-col>
      <h-col class="spanValue" :span="24"
        ><div>备货单编号:{{ row.id }}</div></h-col
      >
      <h-col
        class="spanValue"
        :span="8"
        v-for="(item, index) in dataValue"
        :key="index"
        ><div>
          {{ item.name }}&nbsp; &nbsp;&nbsp;<span>{{ item.value }}</span>
        </div></h-col
      >
    </h-row>
    <div class="formButton">
      <h-button type="primary" size="small" @click="seeStockUp"
        >查看备货清单</h-button
      >
      <h-button type="primary" size="small" @click="seeDeliverGoods"
        >查看配货清单</h-button
      >
      <h-button type="primary" size="small" @click="seeInpatientWardTable"
        >查看确定清单</h-button
      >
    </div>
  </div>
</template>

<script lang='ts'>

import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import StockList from '@/api/stockList/stockList'
interface IDataValue {
      name:string,
      value:string
    }
    interface IDatasteps {
      description: string,
      jdmc: string,
      icon: string
    }
    interface IDatas {
      dataValue: IDataValue[],
      datasteps: IDatasteps[]
    }
export default defineComponent({
  name: 'particulars',
  props: ['row'],
  setup(props:any, context) {
    const state = reactive<IDatas>({
      dataValue: [
        {
          name: '总金额:', value: (props.row.zje + '元')
        },
        {
          name: '商品总数:', value: (props.row.spsl + '个')
        },
        {
          name: '包含订单数:', value: (props.row.dds + '张')
        },
        {
          name: '备货日期:', value: props.row.bhrq
        },
        {
          name: '备货人:', value: props.row.bhr
        },
        {
          name: '确认收货人数:', value: (props.row.qrrs + '人')
        },
        {
          name: '是否完成发货:', value: props.row.isFh === 2 ? '是' : '否'
        },
        {
          name: '发货日期:', value: props.row.fhrq
        },
        {
          name: '发货人:', value: props.row.fhr
        },
        {
          name: '是否结算:', value: props.row.isJs === 1 ? '是' : '否'
        },
        {
          name: '结算日期:', value: props.row.jsrq
        },
      ],
      datasteps: [
        {
          description: '447555',
          jdmc: '发起备货',
          icon: ''
        },
        {
          description: '447555',
          jdmc: '发货',
          icon: ''
        },
        {
          description: '447555',
          jdmc: '待结算',
          icon: ''
        },
        {
          description: '447555',
          jdmc: '发起备货',
          icon: ''
        },
        {
          description: '447555',
          jdmc: '结算中',
          icon: ''
        },
        {
          description: '',
          jdmc: '完成',
          icon: ''
        },
      ]
    })
    // 获取订单进程信息
    const getProgress = async () => {
      // console.log('🚀 ~ file: index.vue ~ line 73 ~ getTable ~ data', data)
      const res = await StockList.getProgressData({
        jgh: '420100131',
        bh: props.row.id
      })
      console.log(res.data)
      return new Promise(resolve => {
        resolve(
          state.datasteps = res.data
        )
      })
    }
    getProgress()
    // 查看 备货清单按钮点击
    const seeStockUp = () => {
      context.emit('openStockUp', true)
    }
    // 查看 确认清单按钮点击
    const seeDeliverGoods = () => {
      context.emit('openDeliverGoods', true)
    }
    // 查看 确认清单按钮点击
    const seeInpatientWardTable = () => {
      context.emit('openInpatientWardTable', true)
    }

    return {
      ...toRefs(state),
      getProgress,
      seeStockUp,
      seeDeliverGoods,
      seeInpatientWardTable
    }
  }
})
</script>

<style lang="scss" scoped>
.particulars {
  position: relative;
  height: 100%;
  width: 100%;
  .processingprogress {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
.spanValue {
  height: 40px;
  padding-left: 50px;
  font-size: 16px;
}
.formButton {
  width: 100% !important;
  // text-align: center;
  // margin-left: -50px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
}
.stepsClass {
  margin: 0 0 30px 60px;
  font-weight: bold;
}
</style>
