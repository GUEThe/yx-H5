<template>
  <div class="app-container">
    <van-collapse v-model="activeName"
      accordion>
      <van-collapse-item title="注意事项"
        name="1">
        <div class="panelContent">
          <ul>
            <li>
              上传电子版照片为本人近期免冠正面证件照，格式为jpg/jpeg/png，大小为150KB以下，照片长宽比为1.2-1.5；
            </li>
            <li>
              上传照片规格：红底(R:255 G:0 B:0)、蓝底(R:67 G:142 B:219)或白底(R:255 G:255 B:255)彩色标准证件照片；
            </li>

            <li>该照片用于校园一卡通、学籍办理，勿使用手机拍照或其他生活、艺术照，如照片不符合要求，入学后需要补交；</li>
            <li>
              重复上传可覆盖。
            </li>
          </ul>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-row type="flex"
      justify="center">
      <van-col>
        <van-uploader :max-size="maxSize"
          @oversize="overSize"
          accept="image/jpg, image/jpeg,image/png"
          :after-read="onRead">
          <div class="uploader">
            <van-icon size="70px"
              name="photograph" />点击上传</div>

        </van-uploader>
      </van-col>
    </van-row>
    <van-row v-if="student">
      <van-cell>
        <div class="uploader">
          <van-image lazy-load
            :src="`/v1/${student.picture}`">
            <template v-slot:loading>
              <van-loading type="spinner"
                size="20" />
            </template>
            <template v-slot:error>
              <van-icon name="close"
                size="20" />
            </template>
          </van-image>
          <van-tag :type="tagType">{{student.status|statusFilter}}</van-tag>

        </div>
      </van-cell>

    </van-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Student, DataResponse } from "@/api/models";
import { GetStudent } from "@/api";
import { apiSendAsync, ApiRequestOptions } from "@/utils/apiRequest";
import analyze from "rgbaster";
@Component({})
export default class Index extends Vue {
  activeName = "1";
  student: Student | null = null;
  maxSize = 153600;
  colorArr = ["rgb(255,0,0)", "rgb(67,142,219)", "rgb(255,255,255)"];
  mounted() {
    GetStudent({ studentId: 111 }).then(resp => {
      this.student = resp.data!;
    });
  }
  overSize() {
    this.$toast({
      type: "fail",
      message: `照片不能大于${this.maxSize / 1024}KB`
    });
    console.log(arguments);
  }
  async onRead(file: any) {
    const result = await analyze(window.URL.createObjectURL(file.file));

    // if (this.colorArr.indexOf(result[0].color) <= 0) {
    //   this.$toast({
    //     type: "fail",
    //     message: `照片底色不正确`
    //   });
    //   return;
    // }

    var img = new Image();
    img.onload = () => {
      let proportion = img.height / img.width;
      if (proportion < 1.2) {
        this.$toast({
          type: "fail",
          message: `照片长宽比不能小于1.2`
        });
      } else if (proportion > 1.5) {
        this.$toast({
          type: "fail",
          message: `照片长宽比不能大于1.5`
        });
      } else {
        let data = new FormData();
        data.append("file", file.file);
        const opts: ApiRequestOptions = {
          url: `/api/File/StudentUploadFile`,
          method: "post",
          reqName: "StudentUploadFile",
          data
        };
        apiSendAsync<DataResponse<string>>(opts).then(resp => {
          (this.student as Student).picture = resp.data!;
          this.$toast({
            type: "success",
            message: "上传成功"
          });
          this.student!.status = 0;
        });
      }
    };
    img.onerror = function() {
      this.$toast({
        type: "fail",
        message: `照片加载失败，请重新上传`
      });
    };
    img.src = window.URL.createObjectURL(file.file);
  }
  get tagType() {
    switch (this.student!.status) {
      case 0:
        return "";
      case 1:
        return "success";
      case 2:
        return "danger";
      default:
        return "";
    }
  }
}
</script>
<style lang="less" scoped>
.app-container {
  padding: 15px 10px;
}
.panelContent {
  font-size: 12px;
  padding: 0 28px;
}
.panelContent ul li {
  list-style: decimal;
}
.uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>