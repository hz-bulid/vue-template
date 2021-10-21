<template>
  <div class="batchCenter">
    <div class="item">订单:<span class="colorRed">{{totallist.order}}</span>条</div>
    <div class="item">总金额:<span class="colorRed">{{totallist.totalAmount}}</span>元</div>
    <div class="item">商品总数:<span class="colorRed">{{totallist.totalGoods}}</span></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, PropType } from 'vue'
interface Itotallist{
  order:number,
  totalAmount:number,
  totalGoods:number,
}
interface IState {
  totallist:Itotallist
}
export default defineComponent({
  props: {
    totallist: {
      type: Object as PropType<Itotallist>,
      default: {}
    }
  },
  setup(props) {
    // console.log('--------66666--------', props.totallist.order)
    const state = reactive<IState>({
      totallist: {
        order: 0,
        totalAmount: 0,
        totalGoods: 0,
      }
    })
    watch(() => props.totallist.order, (v:any, c:any):void => {
      // console.log(v, c, 66666666666)
      state.totallist.order = v
    }, {
      immediate: true, // 绑定时加载
    })
    watch(() => props.totallist.totalAmount, (v:any, c:any):void => {
      state.totallist.totalAmount = v
    }, {
      immediate: true, // 绑定时加载
    })
    watch(() => props.totallist.totalGoods, (v:any, c:any):void => {
      state.totallist.totalGoods = v
      // console.log(v, c, 888)
    }, {
      immediate: true, // 绑定时加载
    })
    return {
      ...toRefs(state),
    }
  }
})
</script>

<style lang="scss" scoped>
.batchCenter {
    display: flex;
    // justify-content: space-around;
    margin: 20px 5px;
    .item{
      margin-right: 50px;
    }
    .colorRed {
      color: #f00;
    }
  }
</style>
