<template>
  <div class="app-container">
    <van-row type="flex"
      justify="center">
      <img src="../../assets/logo-login.png"
        alt="">
    </van-row>
    <van-row type="flex"
      class="form"
      justify="center">
      <van-col span="22">
        <van-cell-group>
          <van-field required
            v-model="signinForm.password"
            placeholder="请输入身份证号" />
          <van-field required
            v-model="signinForm.username"
            placeholder="请输入名字" />
          <van-button size="large"
            @click="login"
            type="info">登 录</van-button>
        </van-cell-group>
      </van-col>
    </van-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Toast } from "vant";
import { Sigin } from "@/api";
import { SigninForm, TokenObj } from "@/api/models";
@Component({})
export default class Login extends Vue {
  signinForm: SigninForm = {
    password: "",
    username: ""
  };
  mounted() {}
  login() {
    if (this.signinForm.password === "") {
      Toast.fail("身份证不能为空");
      return;
    }
    if (this.signinForm.username === "") {
      Toast.fail("名字不能为空");
      return;
    }
    Sigin({ signinForm: this.signinForm }).then(res => {
      const tokenObj: TokenObj = res.data!;
      localStorage.setItem("token", tokenObj.token);
      this.$router.push("/welcome");
    });
  }
}
</script>
<style lang="less" scoped>
.app-container {
  padding-top: 5vh;
  width: 100%;
}
.form {
  margin-top: 2vh;
}
</style>
