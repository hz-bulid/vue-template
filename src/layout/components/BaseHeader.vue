<template>
  <div class="myHeader">
    <div class="header_time">瀚正科技</div>
    <!-- <div class="login_info">
      <div title="点击退出系统" class="info_box" @click="loginOutClick">
        <i class="iconfont icon-renyuan"></i>
        <div>{{ USERNAME }}</div>
      </div>
    </div>
    <div class="logo" @click="intoHome">
      <div :class="['title', headerLog]"></div>
      <div class="cus_name">{{ CUSNAME }}</div>
    </div> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, computed } from 'vue'
import userApi from '@/api/login'
import storage from '@/utils/library/storage'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'BaseHeader',
  setup() {
    const router = useRouter()
    const state = reactive({
      nowDate: '',
      activedIndex: null,
    })
    const headerLog = computed(() => {
      return 'header_Log_1'
    })
    const loginOut = async () => {
      const res = await userApi.loginOut()
      console.log('TCL: loginOut -> loginOut res', res)
    }
    const loginOutClick = () => {
      loginOut()
      if ((window as any).__POWERED_BY_QIANKUN__ && (window as any).signOutSystem) {
        (window as any).signOutSystem()
        return
      }
      storage.removeItem('token')
      storage.removeItem('CANUSEVIDEO')
      storage.removeItem('ISADMIN')
      storage.removeItem('USERID')
      storage.removeItem('USERNAME')
      storage.removeItem('CUSNAME')
      storage.removeItem('CUSNUMBER')
      storage.removeItem('AREAINFO')
      storage.removeItem('ROLEKEY')
      storage.removeItem('NICKNAME')
      router.push('/login')
    }
    return {
      ...toRefs(state),
      headerLog,
      loginOutClick,
    }
  },
})
</script>
<style lang='scss' scoped>
.myHeader {
  width: 100%;
  height: 7.4vh;
  background-size: 100% 100%;
  background-color: #1f2e54;
  @include flex-row-s-c;
  .header_time {
    margin-left: 30px;
    text-align: center;
    width: 16vw;
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
    @include flex-row-s-c;
  }
  .logo {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 1vh;
    width: 21vw;
    height: 7vh;
    cursor: pointer;
    transform: translateX(-50%);
    @include flex-col-sa-c;
    .title {
      width: 6vw;
      height: 3vh;
      line-height: 3vh;
      margin-top: 1vh;
    }
    .cus_name {
      width: 17vw;
      text-align: center;
      letter-spacing: 0.05rem;
      font-size: 0.22rem;
      font-family: unset;
      font-weight: 600;
      background-image: -webkit-linear-gradient(bottom, #1c6ef6, #f2f7ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .login_info {
    position: absolute;
    bottom: 3.8vh;
    right: 1.4vw;
    width: 22vw;
    @include flex-row-e-c;
    .info_box {
      margin-right: 0.6vw;
      background-image: -webkit-linear-gradient(bottom, #1c6ef6, #f2f7ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 600;
      @include flex-row-c-c;
      cursor: pointer;
      i {
        margin-right: 0.3vw;
      }
    }
  }
}
</style>
