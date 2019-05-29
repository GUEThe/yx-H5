<template>
  <div class="app-container">
    <van-cell-group style="padding: 10px 15px;">

      <van-notice-bar text="绿色通道:对被录取入学、经济困难的新生，一律先办理入学手续，然后再根据核实后的情况，分别采取不同办法予以资助。"
        left-icon="volume-o" />

      <van-cell title="贷款金额"
        class="date-range van-cell--required">
        <template>
          <van-stepper />
        </template>
      </van-cell>
      <van-field required
        clearable
        label="合同编号"
        placeholder="请填写贷款合同编号" />

      <van-field required
        clearable
        label="回执码"
        placeholder="请填写回执校验码" />

      <van-field required
        clearable
        label="贷款管理部门"
        placeholder="生源地贷款管理部门" />

      <van-field required
        clearable
        label="联系人"
        placeholder="生源地贷款管理部门联系人" />
      <van-field required
        clearable
        label="联系电话"
        placeholder="生源地贷款管理部门联系电话" />
      <van-field required
        clearable
        label="通讯地址"
        placeholder="生源地贷款管理部门通讯地址" />
    </van-cell-group>

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
export default class Index extends Vue {}
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
</style>