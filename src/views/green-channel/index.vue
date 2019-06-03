<template>
  <div class="app-container">

    <!-- <van-notice-bar text="绿色通道:"
        left-icon="volume-o" /> -->
    <!-- <van-panel title="绿色通道">
        <p>对被录取入学、经济困难的新生，一律先办理入学手续，然后再根据核实后的情况，分别采取不同办法予以资助。</p>
      </van-panel> -->

    <van-collapse v-model="activeName"
      accordion>
      <van-collapse-item title="注意事项"
        name="1">
        <div class="panelContent">
          <ul>
            <li>无需申请可跳过；</li>
            <li>
              绿色通道:对被录取入学、经济困难的新生，一律先办理入学手续，然后再根据核实后的情况，分别采取不同办法予以资助；
            </li>
            <li>标<span class="requiredLabel">*</span>为必填项，请如实填写；</li>
            <li>
              如若审核失败可做更改之后保存，即可重新申请。
            </li>
          </ul>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-cell-group style="padding: 10px 15px;">

      <van-cell title="审核状态"
        value="未申请" />
      <van-cell title="贷款金额"
        class="date-range van-cell--required">
        <template>
          <van-stepper v-model="greenChannel.amount" />
        </template>
      </van-cell>
      <van-field required
        v-model="greenChannel.contractNo"
        clearable
        label="合同编号"
        placeholder="请填写贷款合同编号" />

      <van-field required
        clearable
        label="回执码"
        v-model="greenChannel.replyCode"
        placeholder="请填写回执校验码" />

      <van-field required
        clearable
        v-model="greenChannel.deptName"
        label="贷款管理部门"
        placeholder="生源地贷款管理部门" />

      <van-field required
        clearable
        label="联系人"
        v-model="greenChannel.contact"
        placeholder="生源地贷款管理部门联系人" />
      <van-field required
        clearable
        label="联系电话"
        v-model="greenChannel.deptPhone"
        placeholder="生源地贷款管理部门联系电话" />
      <van-field required
        clearable
        label="通讯地址"
        v-model="greenChannel.deptAddress"
        placeholder="生源地贷款管理部门通讯地址" />
      <input type="file" />
      <van-button type="primary"
        @click="putGreenChanne"
        style="width:100%">保 存</van-button>
    </van-cell-group>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { GetGreenChannelByStudentId, PostGreenChannel } from "@/api";
import { Student, GreenChannel } from "@/api/models";
import moment from "moment";

import {
  createRuleset,
  createGroup,
  IValidationGroup,
  Ruleset
} from "@treacherous/core";
@Component({
  components: {}
})
export default class Index extends Vue {
  activeName = "1";
  greenChannel = {
    amount: 0,
    contractNo: "",
    replyCode: "",
    deptName: "",
    contact: "",
    deptPhone: "",
    deptAddress: "",
    fileId: 0
  };
  created() {
    GetGreenChannelByStudentId({ studentId: 111 }).then(resp => {
      if (resp.data) {
        this.greenChannel = resp.data!;
      }
    });
  }
  putGreenChanne() {
    PostGreenChannel({ model: this.greenChannel as GreenChannel }).then(
      resp => {
        this.$toast({
          type: "success",
          message: resp.message
        });
      }
    );
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