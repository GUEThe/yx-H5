<template>
  <div class="app-container">
    <div style="padding:10px 15px">
      <van-collapse v-model="activeName"
        accordion>
        <van-collapse-item title="注意事项"
          name="1">
          <div class="panelContent">
            <ul>
              <li>无需请假可跳过；</li>
              <li>标<span class="requiredLabel">*</span>为必填项，请如实填写；</li>
              <li>
                如若审核失败可做更改之后保存，即可重新申请。
              </li>
            </ul>
          </div>
        </van-collapse-item>
      </van-collapse>
      <van-cell-group>
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
          v-if="leave.type=='普通请假'"
          class="date-range van-cell--required">
          <template>
            <input readonly
              class="van-field__control"
              placeholder="请选择抵达时间"
              @click="showDatePicker=true" />
          </template>
        </van-cell>

        <van-cell title="延期年份"
          v-if="leave.type=='申请保留学籍'"
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
        @confirm="confirmLeaveType"
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
import { Leave } from "@/api/models";

@Component({})
export default class checkIn extends Vue {
  showLeaveType = false;
  leaveType = ["普通请假", "申请保留学籍"];
  showDatePicker = false;
  showYearPicker = false;
  minDate = new Date();
  activeName = "1";
  leave = {
    type: "",
    arrivalTime: 0,
    leaveYear: 0,
    reason: ""
  };
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
  confirmLeaveType(val: string) {
    this.leave.type = val;
    this.showLeaveType = false;
  }
  confirmDate() {
    this.showDatePicker = false;
  }
  confirmYear() {
    this.showYearPicker = false;
  }
  submitStudent() {}
}
</script>
<style lang="less" scoped>
.date-range {
  /deep/ .van-cell__title {
    max-width: 90px;
  }
}
.panelContent {
  font-size: 12px;
  padding: 0 28px;
}
.panelContent ul li {
  list-style: decimal;
}
</style>