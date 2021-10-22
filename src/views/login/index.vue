<!--
 * @Description:
 * @Author: lixiang
 * @Date: 2019-08-26 09:15:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-22 16:04:28
 -->
<!--登陆-->
<template>
  <div class="bg" id="bg">
    <div class="login-box">
      <div class="login-item account">
        <el-input
          v-model="account"
          placeholder="请输入账号"
          autofocus
          @keyup.native.13="loginClick"
        ></el-input>
      </div>
      <div class="login-item password">
        <el-input
          v-model="password"
          placeholder="请输入密码"
          show-password
          @keyup.native.13="loginClick"
        ></el-input>
      </div>
      <div class="btn-login" @click="loginClick">
        <span class="btn-login-span">登录</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
// import * as api from "@/api/login";

export default {
  name: "login",

  components: {},

  props: {},

  data() {
    return {
      account: "",
      password: "",
    };
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  computed: {
    ...mapState({
      isLoginPrompt: (state) => state.global.isLoginPrompt,
    }),
  },

  mounted() {
    const clear = null;
    this.setOrganId(clear);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.isLoginPrompt) {
        vm.$alert("登录信息已过期，需要重新登陆", "提示", {
          confirmButtonText: "知道了",
          showClose: false,
          type: "warning",
        }).then(() => {
          vm.$socket.close();
          vm.setLoginState(false);
          vm.setIsLoginPrompt(false);
        });
      }
    });
  },
  methods: {
    ...mapMutations(["setIsLoginPrompt", "setOrganId", "setLoginState"]),
    ...mapActions(["setUser"]),
    async loginClick() {
      const dataObj = {
        username: this.account,
        password: this.password,
      };
      if (!(this.account && this.password)) {
        this.$message.error({
          message: "请输入账号和密码",
        });
      } else {
        this.$util.setStorage("token", JSON.stringify(dataObj));
        this.$router.push("/Home");
        // api.login(dataObj).then((res) => {
        //   if (res.code === "200") {
        //     const data = res.data;
        //     // this.insertOhterPageCookie(targetCookies)
        //     this.setStorageUserInfo(data);
        //     // 连接webSocket
        //     // this.$socket.initSocket();

        //     this.$util.removeStorage("prisonCusNumber");
        //     // if (data.deptType === 'ZD') {
        //     //   this.$router.push("/basisFeature");
        //     // } else {
        //     //   }
        //     this.$router.push("/index");
        //   } else {
        //     this.$message.error({
        //       message: res.message,
        //     });
        //   }
        // });
      }
    },
    insertOhterPageCookie(targetCookies) {
      // 通过iframe加载url的形式将cookie写入其他两个子系统域名
      let iframe;
      function creat(targetUrl, username, password) {
        iframe = document.createElement("iframe");
        const targetSrc =
          targetUrl + "?" + "username=" + username + "&password=" + password;
        iframe.src = targetSrc;
        document.body.appendChild(iframe);
      }
      for (let i = 0; i < targetCookies.length; i++) {
        const targetUrl = targetCookies[i].targetUrl;
        creat(targetUrl, this.account, this.password);
      }
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    },
    setStorageUserInfo(data) {
      this.setLoginState();
      const token = data.token;
      const CANUSEVIDEO = data.userInfo.canUseVideo;
      const ISADMIN = data.userInfo.isAdmin;
      const USERID = data.userInfo.userId;
      const USERNAME = data.userInfo.userName;
      const CUSNAME = data.userInfo.cusName;
      const CUSNUMBER = data.userInfo.cusNumber;
      const AREAINFO = data.areaInfo;
      const ROLEKEY = data.userInfo.roleKey;
      const NICKNAME = data.userInfo.nickName;
      const BUTTONINFO = data.buttonInfo;
      const DEPTTYPE = data.deptType;
      const JWT = data.userInfo.jwt;
      this.setUser(data);
      this.$util.setStorage("JWT", JWT);
      this.$util.setStorage("DEPTTYPE", DEPTTYPE);
      this.$util.setStorage("token", token);
      this.$util.setStorage("CANUSEVIDEO", CANUSEVIDEO);
      this.$util.setStorage("ISADMIN", ISADMIN);
      this.$util.setStorage("USERID", USERID);
      this.$util.setStorage("USERNAME", USERNAME);
      this.$util.setStorage("CUSNAME", CUSNAME);
      this.$util.setStorage("CUSNUMBER", CUSNUMBER);
      this.$util.setStorage("AREAINFO", AREAINFO);
      this.$util.setStorage("ROLEKEY", ROLEKEY);
      this.$util.setStorage("NICKNAME", NICKNAME);
      this.$util.setStorage("BUTTONINFO", BUTTONINFO);

      this.setOrganId(CUSNUMBER);
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  background: none;
  outline: none;
  border: 0px;
}

::-webkit-input-placeholder {
  color: white;
}

.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: url("~@/assets/images/login/wh-login_bg.png") no-repeat;
  background-size: 100% 100%;
}

.login-box {
  width: 70vw;
  height: 10vh;
  position: fixed;
  left: 15vw;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login-item {
  width: 24vw;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.account {
  background: url("~@/assets/images/login/zhanhao.png") no-repeat;
  background-size: 100% 100%;

  .account-input {
    font-size: 20px;
    width: 70%;
    color: white;
  }
}

.password {
  background: url("~@/assets/images/login/mima.png") no-repeat;
  background-size: 100% 100%;

  .password-input {
    font-size: 20px;
    width: 70%;
    color: white;
  }
}

.btn-login {
  height: 7vh;
  width: 10vw;
  background: url("~@/assets/images/login/denglu.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-login-span {
  font-size: 20px;
  color: #00f0ff;
  // text-shadow: 0px 0px 8px #fff, 0px 0px 8px #0527ce, 0px 0px 8px #0527ce,
  //   0px 0px 8px #0527ce;
}
</style>
<style lang="scss">
// .my-error {
//   background: #017fff;
//   border: 0;
//   color: white;
// }
.login-box {
  // 原生input重置
  input {
    border: 0;
    background: transparent !important;
    width: 90%;
    height: 100%;
    margin-left: 20%;
    color: white;
  }

  ::-webkit-input-placeholder {
    color: #c0c4cc;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: white;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 0px;
  }

  .el-input__icon {
    display: none;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
    height: 100%;
  }

  .el-input__inner {
    -webkit-appearance: none;
    background-color: transparent !important;
    background-image: none;
    display: inline-block;
    font-size: inherit;
    height: 100%;
    line-height: 100%;
    outline: 0;
    width: 100%;
    padding-left: 0px !important;
    margin-left: 25%;
  }

  .el-select {
    height: 100%;
  }

  .el-input {
    height: 50%;
  }

  .el-table {
    background: transparent !important;
  }
}
</style>
