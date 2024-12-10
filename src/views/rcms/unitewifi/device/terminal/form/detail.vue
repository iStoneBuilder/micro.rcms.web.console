<!--设备详情-->
<template>
  <div id="rcms-devi-detail">
    <!--地图-->
    <div class="rcms-plus-map">
      <DevMap />
      <div class="rcms-plus-ops">
        <el-row v-for="(items, index) in deviInfo" :key="index" :gutter="10">
          <el-col
            v-for="(item, iIndex) in items"
            :key="iIndex"
            :span="24 / items.length"
          >
            <div v-if="item.type === 'icon'" class="grid-content">
              <IconifyIconOffline :icon="item['node']" />
            </div>
            <div v-if="item.type === 'title'" class="grid-content">
              {{ item["title"] }}
            </div>
            <div v-if="item.type === 'value'" class="grid-content value">
              {{ item["value"] }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="rcms-plus-ops">
        <el-row v-for="(items, index) in opreInfo" :key="index" :gutter="10">
          <el-col
            v-for="(item, iIndex) in items"
            :key="iIndex"
            :span="24 / items.length"
          >
            <div class="grid-content btn">
              <div><IconifyIconOffline :icon="item['node']" /></div>
              <div>{{ item["title"] }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--Tab-->
    <div class="rcms-plus-context">
      <el-tabs v-model="activeName">
        <el-tab-pane label="设备信息" name="first">
          <Deviinfo />
        </el-tab-pane>
        <el-tab-pane label="设备套餐" name="third">
          <DataPlan />
        </el-tab-pane>
        <el-tab-pane label="流量统计" name="second">
          <Dpcount />
        </el-tab-pane>
        <el-tab-pane label="实名记录" name="fourth">
          <Deviname />
        </el-tab-pane>
        <el-tab-pane label="控制记录" name="five">
          <Control />
        </el-tab-pane>
        <el-tab-pane label="上线记录" name="seven">
          <Online />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineOptions } from "vue";
import Deviinfo from "./detail/deviinfo.vue";
import DataPlan from "./detail/dataplan.vue";
import Deviname from "./detail/deviname.vue";
import Control from "./detail/control.vue";
import Online from "./detail/online.vue";
import DevMap from "./detail/devMap.vue";
import Dpcount from "./detail/dpcount.vue";

import BarChartLine from "@iconify-icons/ri/bar-chart-line";
import UserLink from "@iconify-icons/ri/user-follow-line";
import PingDua from "@iconify-icons/ri/artboard-line";
import Opertion from "@iconify-icons/ep/operation";
import ShutDown from "@iconify-icons/ri/shut-down-line";
import reStart from "@iconify-icons/ep/refresh-left";
import Change from "@iconify-icons/ri/exchange-line";

defineOptions({
  name: "DeviceDetail"
});
const activeName = ref("first");
const deviInfo = [
  [
    { type: "icon", node: BarChartLine },
    { type: "icon", node: UserLink },
    { type: "icon", node: PingDua },
    { type: "icon", node: Opertion }
  ], // 图标
  [
    { type: "title", title: "信号强度" },
    { type: "title", title: "设备连接数" },
    { type: "title", title: "频段" },
    { type: "title", title: "网络号" }
  ], // 名称
  [
    { type: "value", value: "0" },
    { type: "value", value: "0" },
    { type: "value", value: "0" },
    { type: "value", value: "0" }
  ] // 值
];
const opreInfo = [
  [
    { type: "icon", node: reStart, title: "设备重启" },
    { type: "icon", node: ShutDown, title: "设备关机" },
    { type: "icon", node: Change, title: "切卡" },
    { type: "icon", node: "", title: "" }
  ]
];
</script>
<style lang="scss" scoped>
#rcms-devi-detail {
  display: flex;
  .rcms-plus-map {
    background: white;
    width: 400px;
    margin-right: 10px;
    padding: 20px;
    height: calc(100vh - 145px);
    .rcms-plus-ops {
      border: 1px solid #f0f2f5;
      margin-top: 10px;
      padding: 10px 0;
      .el-row {
        margin-bottom: 6px;
      }
      .el-row:last-child {
        margin-bottom: 0;
      }
      .el-col {
        border-radius: 4px;
      }
      .grid-content {
        align-items: center;
        text-align: center;
        font-size: 10px;
        border-radius: 4px;
        min-height: 10px;
        font-weight: 400;
        svg {
          display: unset;
          font-size: 30px;
          color: #3f9eff;
        }
      }
      .value {
        font-weight: 500;
        font-size: 18px;
        color: #3f9eff;
      }
      .btn {
        cursor: pointer;
      }
    }
  }
  .rcms-plus-context {
    width: calc(100% - 410px);
    :deep(.plus-page__table_wrapper) {
      margin: 0;
    }
    :deep(.el-card__body) {
      padding: 0px;
    }
  }
}
</style>
