<!--
 * @Author: your name
 * @Date: 2021-10-22 14:42:49
 * @LastEditTime: 2021-10-22 16:06:27
 * @LastEditors: Please set LastEditors
 * @Description: Layout
 * @FilePath: \vue-template\src\layout\Index.vue
-->
<template>
  <div class="Layout">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "Index",
  components: {},
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
