<!--
 * @Author: your name
 * @Date: 2021-03-31 09:37:25
 * @LastEditTime: 2021-04-03 11:56:36
 * @LastEditors: Please set LastEditors
 * @Description: app 布局入口
 * @FilePath: \hz-finance\src\layout\index.vue
-->
<template>
  <div class="app-wrapper">
    <base-header></base-header>
    <div class="main">
      <my-menu></my-menu>
      <div class="page-content">
        <my-tagsView></my-tagsView>
        <my-app-main></my-app-main>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import BaseHeader from './components/BaseHeader.vue'
import MyMenu from './components/menu/menu.vue'
import MyAppMain from './components/AppMain.vue'
import MyTagsView from './components/tags_view/Index.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    BaseHeader,
    MyMenu,
    MyAppMain,
    MyTagsView
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  @include flex-col-c-c;
  .main {
    width: 100%;
    height: calc(100% - 7.4vh);
    @include flex-row-s-s;
    .page-content {
      flex: 1;
      background: #f5f7fa;
      height: 100%;
      box-sizing: border-box;
      padding: 10px;
      overflow: hidden;
    }
  }
}
</style>
