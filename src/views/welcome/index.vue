<template>
  <div v-if="student"
    class="app-container">
    <van-row>
      <img src="../../assets/logo.png"
        style="width:100%"
        alt="logo" />
    </van-row>

    <van-notice-bar :text="`亲爱的${student.name}同学：祝贺你成为桂林电子科技大学莘莘学子中的一员！`"
      left-icon="volume-o" />

    <van-panel class="panel"
      title="系统使用须知"
      desc="请熟读以下须知"
      status="未报道">
      <div class="panelContent">
        <ul>
          <li>
            报道流程一共分为12流程，分别是报道须知、入学教育、录取信息、上传照片、个人信息、宿舍信息、财务信息、绿色通道、网上缴费、乘车信息、请假申请
            和保留资格。
          </li>
          <li>
            网上报道只为学生到校报道提供便利，方便学生了解学校。
          </li>
          <li>
            报道过程中请仔细阅读页面提示。
          </li>
        </ul>
      </div>
    </van-panel>
    <van-row type="flex"
      class="buttonRow"
      justify="space-between">
      <van-button size="small"
        @click="logout">退出登录</van-button>
      <van-button type="primary"
        @click="clcikNext"
        size="small">开始报道</van-button>
    </van-row>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetStudent } from "@/api";
import { Student } from "../../api/models";
@Component({})
export default class Welcome extends Vue {
  student: Student | null = null;
  mounted() {
    this.getStudent();
  }
  getStudent() {
    GetStudent({ studentId: 111 }).then(res => {
      this.student = res.data!;
    });
  }
  logout() {
    localStorage.removeItem("token");
    this.$router.push("/login");
  }
  clcikNext() {
    this.$router.push("/checkin");
  }
}
</script>
<style lang="less" scoped>
.panelFooter {
  text-align: right;
}
.panelContent {
  font-size: 12px;
  padding: 0 28px;
}
.panel {
  margin-top: 10px;
}
.panelContent ul li {
  list-style: decimal;
}
.buttonRow {
  padding: 10px 15px;
}
</style>