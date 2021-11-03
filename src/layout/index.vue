<!--
 * @Author: your name
 * @Date: 2021-10-22 14:42:49
 * @LastEditTime: 2021-11-02 14:44:37
 * @LastEditors: Please set LastEditors
 * @Description: Layout
 * @FilePath: \vue-template\src\layout\Index.vue
-->
<template>
  
<el-container class="Layout">
  <el-header style="padding:0;height:auto;">
    <my-header></my-header>
  </el-header>
  <el-container>
    <el-aside style="width:auto;">
      <my-menu></my-menu>
    </el-aside>
    <el-main>
      <my-tab></my-tab>
      <my-main></my-main>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
  import MyHeader from './components/MyHeader.vue'
  import MyMenu from './components/MyMenu.vue'
  import MyMain from './components/MyMain.vue'
  import MyTab from './components/MyTab.vue'
export default {
  name: "Index",
  components: {MyHeader, MyMenu, MyMain, MyTab},
  data() {
    return {};
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.Layout{
  background-color: var(--background-color-base);
}
</style>
