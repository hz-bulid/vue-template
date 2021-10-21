<!--
 * @Author: your name
 * @Date: 2021-03-31 10:59:06
 * @LastEditTime: 2021-04-03 11:30:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finance\src\layout\components\menu.vue
-->
<template>
  <div id="menu" :style="{ width: isCollapse ? '64px' : '220px' }">
    <div class="switchBtn" @click="stateSwitch">
      <i v-if="isCollapse" class="iconfont icon-zhankai"></i>
      <i v-else class="iconfont icon-shouqi"></i>
    </div>
    <div class="my-menu">
      <h-menu
        :default-active="defaultActive + ''"
        class="h-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <menu-item :list="listMenu"></menu-item>
      </h-menu>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import { IState } from './menu-types'
import { initMenu, createActiveContext } from './menuHandel'
import MenuItem from './menu-item.vue'

export default defineComponent({
  name: 'baseMenu',
  components: { MenuItem },
  setup() {
    const isCollapse = ref<boolean>(false)

    const state = reactive<IState>({
      listMenu: [],
      defaultActive: 0
    })
    initMenu(state)
    const setActive = (active:number): void => {
      state.defaultActive = active
    }
    createActiveContext({
      defaultActive: state.defaultActive,
      setActive
    })
    watch(() => (state.defaultActive), (v) => {
      console.log('🚀 ~ file: menu.vue ~ line 50 ~ width ~ defaultActive', v)
    })

    const handleOpen = (key:string, keyPath:string[]):void => {
      console.log(key, keyPath)
    }
    const handleClose = (key:string, keyPath:string[]):void => {
      console.log(key, keyPath)
    }
    const stateSwitch = () => {
      isCollapse.value = !isCollapse.value
    }
    return {
      ...toRefs(state),
      isCollapse,
      handleOpen,
      handleClose,
      stateSwitch
    }
  }

})
</script>

<style lang="scss" scoped>
#menu {
  height: 100%;
  transition: all 0.5s;
  background-color: #101f30;
  @include flex-col-s-c;
  .switchBtn {
    width: 100%;
    padding: 10px 0;
    border: 1px solid #2d3947;
    height: 46px;
    box-sizing: border-box;
    @include flex-col-c-c;
    .iconfont {
      color: #b4c1d4;
      font-size: 22px;
      cursor: pointer;
    }
  }

  .my-menu {
    width: 100%;
    height: calc(100% - 46px);
    overflow: auto;
  }
}
</style>
<style lang="scss">
#menu {
  .h-menu {
    background-color: #101f30;
    border-right: 0;
  }
  .h-popper.is-light,
  .h-menu-vertical-demo {
    background-color: #101f30;
    width: 100%;
    color: #97a4b7 !important;
  }
  .h-submenu__title i {
    color: #2d71bf;
  }
  .h-submenu__title {
    color: #97a4b7;
  }
  // .h-menu-item.is-active {
  //   color: #fff;
  // }
  .h-submenu__title:focus,
  .h-submenu__title:hover,
  .h-menu-item:focus,
  .h-menu-item:hover {
    background-color: #0c55a9;
    color: #fff;
    i {
      color: #fff;
    }
  }
  // .h-submenu__title:focus,
  // .h-submenu__title:hover {
  //   background-color: #0c55a9;
  //   color: #ffffff;
  // }
}
</style>
