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
            v-show="activeSteps===routerList.length-1"
            style="width:100%"
            size="small">完成</van-button>
        </van-col>
        <van-col span="8">
          <van-button type="info"
            @click="nextStep"
            v-show="activeSteps!==routerList.length-1"
            style="width:100%"
            size="small">下一步</van-button>
        </van-col>
      </van-row>
    </div>
    <van-popup v-model="showBars"
      position="left">
      <van-steps direction="vertical"
        :active="activeSteps">
        <van-step v-for="(item,index) in routerList"
          :key="index"><span @click="navToIndex(index)">{{item.title}}</span></van-step>
      </van-steps>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RouterOptions } from "vue-router";
@Component({})
export default class Layout extends Vue {
  showBars = true;
  activeSteps = 0;
  routerList = [
    { path: "/checkin/admission-info", title: "报道须知" },
    { path: "/checkin/admission-info", title: "入学教育" },
    { path: "/checkin/admission-info", title: "录取信息" },
    { path: "/checkin/student-info", title: "个人信息" },
    { path: "/checkin/upload-picture", title: "上传照片" },
    { path: "/checkin/registration", title: "报道登记" },
    { path: "/checkin/admission-info", title: "宿舍信息" },
    { path: "/checkin/green-channel", title: "绿色通道" },
    { path: "/checkin/admission-info", title: "财务信息" },
    { path: "/checkin/admission-info", title: "请假申请" }
  ];
  mounted() {
    setTimeout(() => {
      this.showBars = false;
    }, 1500);
  }
  back() {
    this.$router.push("/welcome");
  }
  navTo() {
    this.$router.push(this.routerList[this.activeSteps].path);
  }
  get title() {
    return this.routerList[this.activeSteps].title;
  }
  navToIndex(index: number) {
    this.activeSteps = index;
    this.showBars = false;
    this.navTo();
  }
  nextStep() {
    this.activeSteps++;
    this.navTo();
  }
  lastStep() {
    this.activeSteps--;
    this.navTo();
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
