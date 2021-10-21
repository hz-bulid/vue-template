<!--
 * @Author: your name
 * @Date: 2021-03-31 15:54:18
 * @LastEditTime: 2021-04-03 13:01:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\views\Home.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
  <h-box title="侠客行">
    <template #right>
      <h-button type="text">按钮</h-button>
    </template>
    <span>
      赵客缦胡缨，吴钩霜雪明。银鞍照白马，飒沓如流星。
      十步杀一人，千里不留行。事了拂衣去，深藏身与名。
      闲过信陵饮，脱剑膝前横。将炙啖朱亥，持觞劝侯嬴。
      三杯吐然诺，五岳倒为轻。眼花耳热后，意气素霓生。
      救赵挥金槌，邯郸先震惊。千秋二壮士，烜赫大梁城。
      纵死侠骨香，不惭世上英。谁能书阁下，白首太玄经。
    </span>
  </h-box>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
export default defineComponent({
  components: {
    HelloWorld
  }
})
</script>
