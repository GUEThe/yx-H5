<template>
  <div v-if="student"
    class="app-container">

    <van-row>
      <van-col span="12">
        <van-cell value-class="cellValue"
          title="姓名"
          :value="student.name" />
      </van-col>
      <van-col span="12">
        <van-cell title="性别">
          <template>
            <span>{{student.gender|genderFilter}}</span>
          </template>
        </van-cell>
      </van-col>
    </van-row>

    <van-cell title="考生号"
      value-class="cellValue"
      :value="student.examineeNo" />
    <van-cell title="身份证号"
      value-class="cellValue"
      :value="student.idCardNo" />
    <van-cell title="录取学院"
      value-class="cellValue">
      <template>
        <span>{{student.collegeCode|collegeFilter}}</span>
      </template>

    </van-cell>
    <van-cell title="录取专业"
      value-class="cellValue">
      <template>
        <span>{{student.majorCode|majorFilter}}</span>
      </template>
    </van-cell>
    <van-cell title="所属校区"
      value-class="cellValue">
      <template>
        <span>{{student.collegeCode|campusFilter}}</span>
      </template>
    </van-cell>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetStudent } from "@/api";
import { Student } from "@/api/models";
@Component({})
export default class Index extends Vue {
  student: Student | null = null;

  mounted() {
    GetStudent({ studentId: 111 }).then(resp => {
      this.student = resp.data!;
    });
  }
}
</script>
<style lang="less" scoped>
.cellValue {
  flex: 3;
}
</style>