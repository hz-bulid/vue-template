<!--
 * @Author: your name
 * @Date: 2021-11-01 10:19:57
 * @LastEditTime: 2021-11-02 17:59:37
 * @LastEditors: Please set LastEditors
 * @Description: main
 * @FilePath: \vue-template\src\layout\components\MyMain.vue
-->
<template>
  <div class='MyMain'>
    <router-view class='main-page'/>
  </div>
</template>
<script>
export default {
  name: 'MyMain',
  components: {},
  data () {
    return {}
  },
  created () {
  },
  computed: {},
  mounted () {
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.MyMain {
  width: 100%;
  height: calc(100% - 42px);
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid var(--border-color-lighter);
  background-color: var(--white);
  position: relative;
  top: -1px;
  .main-page{
    width: 100%;
    height: 100%;
  }
}
</style>
