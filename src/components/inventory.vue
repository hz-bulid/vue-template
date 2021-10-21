<!--
 * @Author: your name
 * @Date: 2021-04-02 20:32:42
 * @LastEditTime: 2021-04-03 11:51:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\components\inventory.vue
-->
<template>
  <div class="stockup">
    <div class="upBody">
      <inpatient-ward-table :row="row"></inpatient-ward-table>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import InpatientWardTable from '@/components/inpatientWardTable.vue'
export default defineComponent({
  name: 'particulars',
  components: { InpatientWardTable },
  props: {
    row: {
      default: null,
      type: Object
    },
  },
  setup() {
    interface ITableData {
      date: string,
      name: string,
      address: string,
      label: string
    }
    interface IDatas {
      tableData:ITableData[]
    }
    const datas = reactive<IDatas>({
      tableData: [{
        label: '商品名称',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        label: '数量',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        label: '商品单价',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        label: '商品单价',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    })
    const tabClick = (value:any) => {
      console.log(value.paneName, 6666)
    }

    return {
      ...toRefs(datas),
      tabClick,
      print
    }
  }
})
</script>

<style lang="scss" scoped>
.stockup {
  .upHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
    margin-left: 30px;
  }
  .upBody {
  }
}
</style>
