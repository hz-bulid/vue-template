<template>
  <div class="activeName">
    <h-tabs v-model="activeName">
      <h-tab-pane name="second" label="用户管理">
        <quota-administrator></quota-administrator>
      </h-tab-pane>
      <h-tab-pane style="height: 100vh" name="first" label="配置管理">
        <date-administrator></date-administrator>
      </h-tab-pane>
    </h-tabs>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import quotaAdministrator from '@/views/consumeManage/limitedAdministrator/components/quotaAdministrator.vue'
import dateAdministrator from '@/views/consumeManage/limitedAdministrator/components/dateAdministrator.vue'
export default defineComponent({
  name: 'index',
  components: { quotaAdministrator, dateAdministrator },
  setup() {
    const activeName = ref('second')
    return {
      activeName,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
