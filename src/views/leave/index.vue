<template>
  <div class="app-container">
    <div style="padding:10px 15px">
      <van-notice-bar text="标*为必填,请如实填写。重复保存可更新信息。"
        left-icon="volume-o" />
      <van-cell-group title="乘车信息">
        <van-cell title="请假类型"
          class="date-range van-cell--required">
          <template>
            <input readonly
              class="van-field__control"
              placeholder="请选择请假类型"
              @click="showLeaveType=true" />
          </template>
        </van-cell>
        <van-cell title="延期到达时间"
          class="date-range van-cell--required">
          <template>
            <input readonly
              class="van-field__control"
              placeholder="请选择抵达时间"
              @click="showDatePicker=true" />
          </template>
        </van-cell>

        <van-cell title="延期年份"
          class="date-range van-cell--required">
          <template>
            <input readonly
              class="van-field__control"
              placeholder="请选择延期年份"
              @click="showYearPicker=true" />
          </template>
        </van-cell>

        <van-field required
          clearable
          label="原因"
          type="textarea"
          :rows="3"
          autosize
          placeholder="请填写原因" />

      </van-cell-group>
      <van-button type="primary"
        @click="submitStudent"
        style="width:100%">提 交</van-button>
    </div>

    <van-popup v-model="showLeaveType"
      position="bottom">
      <van-picker show-toolbar
        @cancel="showLeaveType=false"
        @confirm="confirmStation"
        :columns="leaveType" />
    </van-popup>

    <van-popup v-model="showYearPicker"
      position="bottom">
      <van-picker show-toolbar
        @cancel="showYearPicker=false"
        @confirm="confirmYear"
        :columns="yearCol" />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class checkIn extends Vue {
  showLeaveType = false;
  leaveType = ["普通请假", "申请保留学籍"];
  showDatePicker = false;
  showYearPicker = false;
  minDate = new Date();

  get maxDate() {
    var d = new Date();
    d.setMonth(d.getMonth() + 2);
    return d;
  }
  get yearCol() {
    let yearCol = [];
    for (let i = 1; i <= 3; i++) {
      yearCol.push(new Date().getFullYear() + i);
    }
    return yearCol;
  }
  mounted() {}
  confirmStation() {
    this.showLeaveType = false;
  }
  confirmDate() {
    this.showDatePicker = false;
  }
  confirmYear() {}
  submitStudent() {}
}
</script>
<style lang="less" scoped>
.date-range {
  /deep/ .van-cell__title {
    max-width: 90px;
  }
}
</style>