<template>
  <div class="app-container">
    <van-row>
      <van-col span="12">
        <van-cell value-class="cellValue"
          title="姓名"
          value="何建钦" />
      </van-col>
      <van-col span="12">
        <van-cell title="性别"
          value="男" />
      </van-col>

    </van-row>

    <van-cell title="考生号"
      value-class="cellValue"
      value="18450902255233" />
    <van-cell title="身份证号"
      value-class="cellValue"
      value="452623199602283612" />
    <van-cell title="录取学院"
      value-class="cellValue"
      value="计算机与信息安全学院" />
    <van-cell title="录取专业"
      value-class="cellValue"
      value="网络工程专业" />

  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Index extends Vue {
  mounted() {}
}
</script>
<style lang="less" scoped>
.cellValue {
  flex: 3;
}
</style>