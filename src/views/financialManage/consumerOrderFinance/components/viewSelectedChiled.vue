<template>
  <h-container class="viewSelectedChiled">
    <h-main>
      <h-table-block
        :method="getTable"
        :table-option="tableOption"
        :show-paging="false"
        :table-columns="tableColumns"
        @selection-change="selectionChange"
      >
      </h-table-block>
    </h-main>
  </h-container>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { IColumn, ITableData, ITableOption } from '@/types/table'
import ConsumerOrderFinance from '@/api/consumerOrderFinance/consumerOrderFinance'

interface IList {
  jg: string
  spmc:string
  je:string
  sl:string
  gg:string
}
interface IState {
  tableOption:ITableOption
  tableColumns:IColumn[],
  id:any
}

export default defineComponent({
  name: 'Index',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const getTable = async () => {
      const res = await ConsumerOrderFinance.shopDetailList({
        id: props.id
      })
      return {
        list: res.data,
        pageNum: 1,
        pageSize: 10,
        total: 20
      }
    }
    const state = reactive<IState>({
      tableOption: {
        showRadio: true,
        showIndex: true // 一个函数
      },
      tableColumns: [
        { prop: 'spmc', title: '商品' },
        { prop: 'jg', title: '价格' },
        { prop: 'sl', title: '数量' },
        { prop: 'je', title: '金额' },
        { prop: 'gg', title: '规格' },
      ],
      id: ''
    })
    // const shopDetailListAll = async () => {
    //   const idnew = props.id
    //   state.id = idnew
    //   const res = await ConsumerOrderFinance.shopDetailList({
    //     id: state.id
    //   })
    // }
    // shopDetailListAll()
    const selectionChange = () => {
      // console.log(data);
    }
    return {
      ...toRefs(state),
      getTable,
      selectionChange,
    }
  }
})
</script>

<style lang="scss" scoped>
.viewSelectedChiled {
  width: 100%;
  height: 100%;
}
</style>
