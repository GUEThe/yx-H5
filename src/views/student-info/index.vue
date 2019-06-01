<template>
  <div class="app-container">
    <van-collapse v-model="activeName"
      accordion>
      <van-collapse-item title="注意事项"
        name="1">
        <div class="panelContent">
          <ul>
            <li>
              标*为必填,请如实填写；
            </li>
            <li>
              重复保存可更新信息。
            </li>
          </ul>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-cell-group v-if="student"
      style="padding: 10px 15px;">

      <van-cell title="出生日期"
        class="date-range van-cell--required">
        <template>
          <input readonly
            :value="birthDay"
            :class="{'van-field-error':'birthDay' in erro}"
            class="van-field__control"
            placeholder="请选择本人出生日期"
            @click="showDatePicker=true" />
        </template>
      </van-cell>

      <van-cell title="政治面貌"
        class="date-range van-cell--required">
        <template>
          <input readonly
            :value="student.politicalStatus"
            :class="{'van-field-error':'politicalStatus' in erro}"
            class="van-field__control"
            placeholder="请选择本人政治面貌"
            @click="showPoliticalStatusPicker=true" />
        </template>
      </van-cell>

      <van-cell title="婚否"
        class="date-range van-cell--required">
        <template>
          <input readonly
            :value="marriageStr"
            :class="{'van-field-error':'marriage' in erro}"
            class="van-field__control"
            placeholder="请选择本人婚姻状况"
            @click="showMarriagePicker=true" />
        </template>
      </van-cell>

      <van-field required
        clearable
        :error="'nation' in erro"
        label="民族"
        v-model="student.nation"
        placeholder="请填写本人的民族" />

      <van-field required
        clearable
        label="籍贯"
        :error="'nativePlace' in erro"
        v-model="student.nativePlace"
        placeholder="请填写本人籍贯" />
      <van-field required
        clearable
        label="出生地"
        :error="'birthPlace' in erro"
        v-model="student.birthPlace"
        placeholder="请填写本人出生地" />
      <van-field required
        clearable
        label="通信地址"
        :error="'mailingAddress' in erro"
        v-model="student.mailingAddress"
        type="textarea"
        rows="1"
        autosize
        placeholder="请填写家庭所在地址" />
      <van-field required
        clearable
        label="联系电话"
        :error="'phone' in erro"
        v-model="student.phone"
        placeholder="请填写本人联系电话" />
      <van-field required
        clearable
        label="QQ号"
        :error="'qqNo' in erro"
        v-model="student.qqNo"
        placeholder="请填写本人QQ号" />

      <van-field required
        clearable
        label="家长姓名"
        :error="'parentName' in erro"
        v-model="student.parentName"
        placeholder="请填写本人家长姓名" />

      <van-field required
        clearable
        label="家长电话"
        :error="'parentPhone' in erro"
        v-model="student.parentPhone"
        placeholder="请填写本人家长电话" />
      <van-button type="primary"
        @click="putStudent"
        style="width:100%">保 存</van-button>
    </van-cell-group>

    <van-popup v-model="showDatePicker"
      position="bottom">
      <van-datetime-picker :max-date="maxDate"
        :min-date="minDate"
        @confirm="confirmDate"
        @cancel="showDatePicker=false"
        type="date" />
    </van-popup>
    <van-popup v-model="showPoliticalStatusPicker"
      position="bottom">
      <van-picker show-toolbar
        @cancel="showPoliticalStatusPicker=false"
        @confirm="confirmPoliticalStatus"
        :columns="politicalStatus" />
    </van-popup>

    <van-popup v-model="showMarriagePicker"
      position="bottom">
      <van-picker show-toolbar
        @cancel="showMarriagePicker=false"
        @confirm="confirmMarriage"
        :columns="marriage" />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { GetStudent, PutStudent } from "@/api";
import { Student } from "@/api/models";
import moment from "moment";
import {
  createRuleset,
  createGroup,
  IValidationGroup,
  Ruleset
} from "@treacherous/core";
@Component({})
export default class Index extends Vue {
  activeName = "1";
  student: Student | null = null;
  showDatePicker = false;
  showPoliticalStatusPicker = false;
  showMarriagePicker = false;
  politicalStatus = ["中共党员", "预备党员", "共青团员", "群众"];
  marriage = ["未婚", "已婚"];
  minDate = new Date(1970, 9, 1);
  maxDate = new Date();
  ruleset: Ruleset | null = null;
  validationGroup: IValidationGroup | null = null;
  erro: any = {};
  mounted() {
    GetStudent({ studentId: 111 }).then(resp => {
      this.student = resp.data!;
      this.ruleset = createRuleset()
        .forProperty("politicalStatus")
        .required()
        .forProperty("marriage")
        .required()
        .forProperty("nation")
        .required()
        .forProperty("birthDay")
        .required()
        .forProperty("nativePlace")
        .required()
        .forProperty("birthPlace")
        .required()
        .forProperty("phone")
        .required()
        .forProperty("qqNo")
        .required()
        .forProperty("mailingAddress")
        .required()
        .forProperty("parentName")
        .required()
        .forProperty("parentPhone")
        .required()
        .build();
      this.validationGroup = createGroup().build(this.student, this.ruleset);
    });
  }
  confirmDate(value: Date) {
    this.showDatePicker = false;
    (this.student as Student).birthDay = Date.parse(value.toString());
  }
  confirmPoliticalStatus(value: string) {
    this.student!.politicalStatus = value;
    this.showPoliticalStatusPicker = false;
  }
  confirmMarriage(value: string, index: number) {
    this.student!.marriage = index;
    this.showMarriagePicker = false;
  }
  get birthDay() {
    if (this.student) {
      if (this.student!.birthDay) {
        return moment(this.student!.birthDay).format("YYYY-MM-DD");
      }
    }
    return "";
  }
  get marriageStr() {
    if (this.student) {
      return this.marriage[this.student!.marriage];
    }
    return "";
  }

  putStudent() {
    (this.validationGroup as IValidationGroup)
      .getModelErrors(true)
      .then(erro => {
        console.log(erro);
        if (JSON.stringify(erro) !== "{}") {
          this.$toast({ message: "必填项不能为空", type: "fail" });
          if (JSON.stringify(this.erro) === "{}") {
            this.$watch(
              "student",
              () => {
                (this.validationGroup as IValidationGroup)
                  .getModelErrors(true)
                  .then(merro => {
                    this.erro = merro;
                  });
                console.log(this.erro);
              },
              { deep: true }
            );
          }
          this.erro = erro;
        } else {
          this.erro = {};
          PutStudent({ value: this.student as Student }).then(resp => {
            if (resp.code === 0) {
              this.$toast("保存成功！");
            }
          });
        }
      });
  }
}
</script>
<style lang="less" scoped>
.date-range {
  /deep/ .van-cell__title {
    max-width: 90px;
  }
}
.van-field-error {
  color: #f44;
}
.van-field-error::placeholder {
  color: #f44;
}
.panelContent {
  font-size: 12px;
  padding: 0 28px;
}
.panelContent ul li {
  list-style: decimal;
}
</style>