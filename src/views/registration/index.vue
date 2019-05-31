<template>
  <div class="app-container">
    <div style="padding:10px 15px">
      <van-notice-bar text="标*为必填,请如实填写。重复保存可更新信息。"
        left-icon="volume-o" />
      <van-cell-group v-if="studentStation"
        title="乘车信息">
        <van-cell title="抵达到站"
          class="date-range van-cell--required">
          <template>
            <input readonly
              :value="studentStation.station"
              class="van-field__control"
              placeholder="请选择抵达到站"
              @click="showStation=true" />
          </template>
        </van-cell>
        <van-cell title="抵达时间"
          class="date-range van-cell--required">
          <template>
            <input readonly
              :value="arriveTime"
              class="van-field__control"
              placeholder="请选择抵达时间"
              @click="showDatePicker=true" />
          </template>
        </van-cell>
        <van-cell title="行李数"
          class="date-range van-cell--required">
          <template>
            <van-stepper v-model="studentStation.baggageNum" />
          </template>
        </van-cell>
        <van-cell title="人数"
          class="date-range van-cell--required">
          <template>
            <van-stepper v-model="studentStation.peopleNum" />
          </template>
        </van-cell>

        <van-cell title="是否需要接待"
          class="date-range van-cell--required">
          <template>
            <van-switch v-model="checked" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group v-if="student"
        title="军训服装信息">
        <van-cell title="衣服尺码"
          class="date-range van-cell--required">
          <template>
            <input readonly
              :value="student.clothesSize"
              class="van-field__control"
              placeholder="请选择衣服尺码"
              @click="showClothesSize=true" />
          </template>
        </van-cell>
        <van-cell title="鞋子尺码"
          class="date-range van-cell--required">
          <template>
            <input readonly
              :value="student.shoesSize"
              class="van-field__control"
              placeholder="请选择鞋子尺码"
              @click="showShoesSize=true" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-button type="primary"
        @click="putStudent"
        style="width:100%">保 存</van-button>
    </div>

    <van-popup v-model="showStation"
      position="bottom">
      <van-picker show-toolbar
        @cancel="showStation=false"
        @confirm="confirmStation"
        :columns="station" />
    </van-popup>
    <van-popup v-model="showDatePicker"
      position="bottom">
      <van-datetime-picker :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmDate"
        @cancel="showDatePicker=false"
        type="datetime" />
    </van-popup>
    <van-popup v-model="showClothesSize"
      position="bottom">
      <van-picker show-toolbar
        @cancel="showClothesSize=false"
        @confirm="confirmClothesSize"
        :columns="clothesSize" />
    </van-popup>

    <van-popup v-model="showShoesSize"
      position="bottom">
      <van-picker show-toolbar
        @cancel="showShoesSize=false"
        @confirm="confirmShoesSize"
        :columns="shoesSize" />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  GetStudent,
  PutStudent,
  GetStudentStation,
  PostStudentStation
} from "@/api";
import { Student, StudentStation } from "@/api/models";
import axios from "axios";
import moment from "moment";
@Component({})
export default class checkIn extends Vue {
  showStation = false;
  station = ["桂林站（南站）", "桂林北站", "桂林西站", "两江机场"];
  showDatePicker = false;
  minDate = new Date();
  get maxDate() {
    var d = new Date();
    d.setMonth(d.getMonth() + 2);
    return d;
  }

  showClothesSize = false;
  clothesSize = ["S码（160-165cm）", "M码（170-175cm）", "L码（180cm及以上）"];
  showShoesSize = false;
  shoesSize = [35, 36, 37, 38, 39, 40, 41, 42, 43];
  student: Student | null = null;
  studentStation: StudentStation | null = null;
  checked = false;

  mounted() {
    GetStudent({ studentId: 111 }).then(resp => {
      this.student = resp.data!;
    });
    GetStudentStation({ studentId: 111 }).then(resp => {
      this.studentStation! = resp.data!;
      this.checked = this.studentStation.isNeed == 0 ? false : true;
    });
  }
  confirmStation(val: string) {
    this.showStation = false;
    this.studentStation!.station = val;
  }
  confirmDate(value: Date) {
    this.showDatePicker = false;
    this.studentStation!.arriveTime = value.getTime();
  }
  confirmClothesSize(value: string) {
    this.student!.clothesSize = value;
    this.showClothesSize = false;
  }
  confirmShoesSize(value: string) {
    this.student!.shoesSize = value;
    this.showShoesSize = false;
  }
  putStudent() {
    this.studentStation!.isNeed = this.checked ? 1 : 0;
    PostStudentStation({
      studentStation: this.studentStation! as StudentStation
    }).then(resp => {
      PutStudent({ value: this.student as Student }).then(resp => {
        this.$toast({
          type: "success",
          message: "保存成功"
        });
      });
    });
  }
  get arriveTime() {
    if (this.studentStation!.arriveTime) {
      return moment(this.studentStation!.arriveTime).format("YYYY-MM-DD HH:mm");
    }
    return "";
  }
}
</script>
<style lang="less" scoped>
.date-range {
  /deep/ .van-cell__title {
    max-width: 90px;
  }
}
</style>