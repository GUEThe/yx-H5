<template>
  <div class="app-container">
    <van-cell-group v-if="studentBedView">
      <van-cell title="宿舍区"
        value-class="cellValue"
        :value="studentBedView.area" />
      <van-cell title="楼栋"
        value-class="cellValue"
        :value="studentBedView.building" />
      <van-cell title="房间号"
        value-class="cellValue"
        :value="studentBedView.room" />

      <van-cell title="床位号"
        value-class="cellValue"
        :value="studentBedView.name" />

      <van-cell title="住宿费"
        value-class="cellValue">
        <template>
          <span>{{studentBedView.cost/100}}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <div v-if="!studentBedView"
      class="noneData">
      <van-icon name="comment-o"
        size="100" />
      <p class="notfound-p">暂时查询不到您的宿舍信息</p>
      <div class="notfound-reason">
        <p>可能的原因：</p>
        <ul>
          <li>学校暂未安排</li>
          <li>我们的服务器被外星人劫持了</li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetStudentBed } from "@/api";
import { StudentBedView } from "@/api/models";
@Component({})
export default class Index extends Vue {
  studentBedView: StudentBedView | null = null;

  mounted() {
    GetStudentBed({ studentId: 111 }).then(resp => {
      this.studentBedView = resp.data!;
    });
  }
}
</script>
<style lang="less" scoped>
.cellValue {
  flex: 3;
}
.notfound-p {
  line-height: 22px;
  font-size: 17px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f6f6f6;
  text-align: center;
  color: #262b31;
}
.notfound-reason {
  color: #9ca4ac;
  font-size: 13px;
  line-height: 13px;
  text-align: left;
  width: 210px;
  margin: 0 auto;
}
.notfound-reason p {
  margin-top: 13px;
}
.notfound-reason ul li {
  margin-top: 10px;
  margin-left: 36px;
}
.noneData {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}
</style>