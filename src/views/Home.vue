<!--
 * @Author: your name
 * @Date: 2021-10-22 11:30:05
 * @LastEditTime: 2021-10-22 16:00:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-template\src\views\Home.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  configRoute:true,
  components: {
    HelloWorld,
  },
};
</script>
