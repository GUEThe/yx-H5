<template>
  <div class="app-container">
    <van-nav-bar :title="title"
      right-text="首页"
      @click-right="back"
      @click-left="showBars=true"
      :fixed="true">
      <van-icon name="bars"
        slot="left" />
    </van-nav-bar>
    <div class="content">
      <router-view />
    </div>
    <div class="layoutFooter">
      <van-row type="flex"
        class="buttonRow"
        justify="space-around">
        <van-col span="8">
          <van-button v-show="activeSteps!=0"
            style="width:100%"
            @click="lastStep"
            size="small">上一步</van-button>
        </van-col>
        <van-col span="8">
          <van-button type="primary"
            @click="done"
            v-show="activeSteps===11"
            style="width:100%"
            size="small">完成</van-button>
        </van-col>
        <van-col span="8">
          <van-button type="info"
            @click="nextStep"
            v-show="activeSteps!=11"
            style="width:100%"
            size="small">下一步</van-button>
        </van-col>
      </van-row>
    </div>
    <van-popup v-model="showBars"
      position="left">
      <van-steps direction="vertical"
        :active="activeSteps">
        <van-step>报道须知</van-step>
        <van-step>入学教育</van-step>
        <van-step>
          <van-button type="default"
            size="mini">录取信息</van-button>
        </van-step>
        <van-step>上传照片</van-step>
        <van-step>个人信息</van-step>
        <van-step>宿舍信息</van-step>
        <van-step>财务信息</van-step>
        <van-step>绿色通道</van-step>
        <van-step>网上缴费</van-step>
        <van-step>乘车信息</van-step>
        <van-step>请假申请</van-step>
        <van-step>保留资格</van-step>
      </van-steps>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Layout extends Vue {
  showBars = true;
  title = "";
  activeSteps = 0;
  routerList = [
    { path: "/checkin/admission-info", title: "录取信息" },
    { path: "/checkin/admission-info", title: "录取信息" },
    { path: "/checkin/admission-info", title: "录取信息" },
    { path: "/checkin/admission-info", title: "录取信息" },
    { path: "/checkin/admission-info", title: "录取信息" }
  ];
  mounted() {
    setTimeout(() => {
      this.showBars = false;
    }, 1500);
  }
  back() {
    this.$router.push("/welcome");
  }
  nextStep() {
    this.activeSteps++;
    this.$router.push(this.routerList[this.activeSteps].path);
  }
  lastStep() {
    this.activeSteps--;
  }
  done() {}
}
</script>
<style lang="less" scoped>
.content {
  margin: 56px 10px 10px;
  background-color: #fff;
}
.buttonRow {
  padding: 5px 15px;
}
.layoutFooter {
  position: sticky;
  z-index: 1;
  bottom: 0;
  background-color: #fff;
}
</style>
<style lang="less">
.van-popup--left {
  top: 300px;
}
</style>
