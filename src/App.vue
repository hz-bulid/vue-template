<!--
 * @Author: your name
 * @Date: 2021-03-31 15:54:18
 * @LastEditTime: 2021-04-01 11:18:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\App.vue
-->
<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>
<style lang="scss">
@import "@/assets/style/utils.scss";
@import "@/assets/style/base/reset.scss";
#app {
  height: 100%;
  width: 100%;
  color: #666;
}
.spanColor {
  padding-right: 10px;
  color: #60a5f5;
  cursor: pointer;
}
</style>
