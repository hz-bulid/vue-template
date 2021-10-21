<!--
 * @Author: your name
 * @Date: 2021-03-26 15:28:56
 * @LastEditTime: 2021-04-02 18:35:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finance\src\views\login\Login.vue
-->
<template>
  <div class="login">
    <h-button type="primary" @click="login">登陆</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from '@/store'
import storage from '@/utils/library/storage'
import { useRouter } from 'vue-router'
// import { useStore  } from "vuex";
// ,watchEffect,watch,nextTick
import userApi from '@/api/login'
// import {useBookListInject,useInjects }  from "@/store";

export default defineComponent({
  setup() {
    // let bookListI = useBookListInject();
    // let books = useInjects("login");
    // books.setValue({value:"9996666669"});
    // watchEffect(() => console.log( books.data.value));
    // books.data.value = "adfg";
    // console.log("useInjects",books);
    const router = useRouter()
    const login = async () => {
      const user = await userApi.login({
        username: 'jdssld',
        // username: 'jakss001', 原账号名
        password: '1'
      })
      console.log('登陆:', user)
      storage.setItem('token', user.data.token)
      router.back()

      // bookListI.setValue({name:"asdfa"});
    }
    // watchEffect(() => console.log( bookListI.data.value));
    // const wa= watch(()=>bookListI.data,(v)=>{
    // console.log("🚀 ~ file: Login.vue ~ line 33 ~ watch ~ v", v.value);

    // },{immediate:true,deep:true});
    onMounted(() => {
      // bookListI.setValue({value:"9999"});
      // bookListI.data.value.name = "adfg";
      console.log('Component is mounted!')
      // nextTick(() => {wa();});
      // wa();
    })
    // const store =useStore();
    const store = useStore()
    console.log('🚀 ~ file: Login.vue ~ line 50 ~ setup ~ store', store.dispatch('ACTION_LOGIN', {
      username: 'string',
      password: 'string'
    }))
    console.log('🚀 ~ file: Login.vue ~ line 50 ~ setup ~ store', store.state.user.token)

    return {
      login
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  @include flex-row-c-c;
}
</style>
