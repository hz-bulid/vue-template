<template>
<!-- 按病室审批 wardApproval-->
  <h-container class="wardApproval">
    <h-main>
      <h-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</h-checkbox>
      <div style="margin: 15px 0;"></div>
      <h-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <h-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</h-checkbox>
      </h-checkbox-group>
    </h-main>
    <h-footer class="footer">
      <h-button type="primary" size="mini">下一步</h-button>
    </h-footer>
  </h-container>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup() {
      type cityOptions = '上海' | '北京' | '广州' | '深圳';
      type cityType = cityOptions[]
      interface ICheckall {
        checkAll: boolean,
        checkedCities: cityType,
        cities: cityType,
        isIndeterminate: boolean
      }
      const checkall = reactive<ICheckall>({
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: ['上海', '北京', '广州', '深圳'], // modelValue 与 cities不能为同一个数组
        isIndeterminate: true
      })
      const handleCheckAllChange = (val:boolean):void => {
        checkall.checkedCities = val ? [...checkall.cities] : []
        checkall.isIndeterminate = false
      }
      const handleCheckedCitiesChange = (value:ICheckall['cities']):void => {
        const checkedCount = value.length
        checkall.checkAll = checkedCount === checkall.cities.length
        checkall.isIndeterminate =
          checkedCount > 0 && checkedCount < checkall.cities.length
      }
      return {
        ...toRefs(checkall),
        handleCheckAllChange,
        handleCheckedCitiesChange
      }
  }
})
</script>

<style lang="scss" scoped>
.wardApproval{
  width: 100%;
  height:100%;
  .footer {
    display: flex;
    justify-content: center;
    height: 30px !important;
  }
}
</style>
