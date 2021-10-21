<template>
  <div id="dateAdministrator">
    <div>
      <h-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >
        可消费日期（每周）</h-checkbox
      >
      <div style="margin: 15px 0"></div>
      <h-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
      >
        <h-checkbox v-for="city in cities" :label="city" :key="city">{{
          city
        }}</h-checkbox>
      </h-checkbox-group>
    </div>
    <div class="dateBox">
      <div class="date" v-for="i in 12" :key="i">
        <item-date
          v-bind="{
            currentYears: i === 12 ? 2022 : 2021,
            currentMonths: i === 12 ? 1 : i + 1,
          }"
          :timeDate="timeDate"
          v-model:checkedCities="checkedCities"
          v-model:isBool="isBool"
          @dateFormats="dateFormat"
        ></item-date>
      </div>
    </div>
    <div class="confirmClass">
      <h-button type="primary" @click="confirmClick()" size="small">
        保存
      </h-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import itemDate from '@/views/consumeManage/limitedAdministrator/components/itemDate.vue'
import { dateData } from '@/utils/library/date'
import limitedConsumption from '@/api/limitedAdministrator/limitedAdministrator'
import { HMessage } from '@hz-lib/han-ui-next'
import { cityType, ICheckall } from '@/views/consumeManage/limitedAdministrator/limitedAdministrator'
export default defineComponent({
  name: 'dateAdministrator',
  components: { itemDate },
  setup() {
    const checkall = reactive<ICheckall>({
      checkAll: false,
      checkedCities: [],
      cities: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], // modelValue 与 cities不能为同一个数组
      isIndeterminate: true,
      timeDate: dateData(),
      isBool: true
    })
    // 全选
    const handleCheckAllChange = (val:boolean):void => {
      checkall.checkedCities = val ? [...checkall.cities] : []
      checkall.isIndeterminate = false
    }
    // 单选
    const handleCheckedCitiesChange = (value:ICheckall['cities']):void => {
      const checkedCount = value.length
      checkall.checkAll = checkedCount === checkall.cities.length
      checkall.isIndeterminate =
        checkedCount > 0 && checkedCount < checkall.cities.length
    }
    let datasdateFormat:any
    const confirmClick = async () => {
      interface IData {
        jgh: number,
        kxfrq: Date,
      }
      const data:IData[] = []
      if (datasdateFormat.length !== 0) {
        datasdateFormat.forEach((element:Date) => {
          data.push({
            jgh: 420100131,
            kxfrq: element,
          })
        })
        const res = await limitedConsumption.timeDate(data)
        if (res.code === '200') {
          HMessage.success({
            message: '保存成功',
            type: 'success'
          })
        } else {
          HMessage.warning({
            message: '请联系管理员',
            type: 'warning'
          })
        }
      } else {
        HMessage.warning({
          message: '请至少选择一个',
          type: 'warning'
        })
      }
    }
    const dateFormat = (val:any) => {
      datasdateFormat = val
    }

    return {
      ...toRefs(checkall),
      handleCheckAllChange,
      handleCheckedCitiesChange,
      confirmClick,
      dateFormat
    }
  }
})
</script>

<style lang="scss" scoped>
#dateAdministrator {
  .dateBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .date {
      width: 16%;
      margin-top: 20px;
    }
  }
  .confirmClass {
    width: 100%;
    text-align: center;
    height: 100px;
    line-height: 100px;
  }
}
</style>
