<!--
 * @Author: your name
 * @Date: 2021-04-02 10:50:07
 * @LastEditTime: 2021-04-03 11:31:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\layout\components\menu\menu-item.vue
-->
<template>
  <template v-for="menu in list" :key="menu.menuId">
    <h-submenu
      :index="menu.menuId + ''"
      v-if="menu.child && menu.child.length > 0"
    >
      <template #title>
        <i :class="menu.iconfont" v-if="menu.iconfont"></i>
        <i class="h-icon-menu" v-else></i>
        <span>{{ menu.menuName }}</span>
      </template>
      <h-menu-item-group>
        <menu-item :list="menu.child"></menu-item>
      </h-menu-item-group>
    </h-submenu>
    <h-menu-item
      class="menu-item"
      :class="{ current: currentRoute.name === menu.menuPath }"
      @click="routerLink(menu)"
      :index="menu.menuId + ''"
      v-else
    >
      <i :class="menu.iconfont" v-if="menu.iconfont"></i>
      <i class="iconfont icon-dian" v-else></i>
      <template #title>{{ menu.menuName }}</template>
    </h-menu-item>
  </template>
</template>

<script lang='ts'>
import { defineComponent, PropType, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useActiveContext } from './menuHandel'
import { IMenu } from './menu-types'

export default defineComponent({
  name: 'menu-item',
  props: {
    list: {
      type: Array as PropType<IMenu[]>,
      default: () => ([])
    }
  },
  setup: (props) => {
    const router = useRouter()
    const currentRoute = useRoute()
    // 点击菜单
    const routerLink = (menu:IMenu) => {
      if (menu.menuPath.startsWith('http')) {
        window.open(menu.menuPath)
      } else {
        router.push(menu.menuPath)
      }
    }
    // interface as  {
    //   userGeolocation:string
    // }

    const { setActive } = useActiveContext()
    onMounted(() => {
      watch(() => currentRoute.name, () => {
        for (const item of props.list) {
          if (item.menuPath === currentRoute.name) {
            setActive(item.menuId)
            break
          }
        }
      }, { immediate: true })
    })
    return {
      currentRoute,
      routerLink
    }
  }
})
</script>

<style lang="scss" >
.menu-item {
  display: flex;
  color: #97a4b7;
  &.current {
    color: #0c55a9;
    .iconfont {
      font-size: 30px;
    }
  }
  .iconfont {
    color: #fff;
    font-size: 30px;
  }
}
</style>
