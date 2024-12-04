<!--设备详情-->
<template>
  <div class="rcms-plus-page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="设备信息" name="first">
        <Deviinfo />
      </el-tab-pane>
      <el-tab-pane label="设备套餐" name="third">
        <DataPlan />
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
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import Deviinfo from "./detail/deviinfo.vue";
import DataPlan from "./detail/dataplan.vue";
import Deviname from "./detail/deviname.vue";
import Control from "./detail/control.vue";
import Online from "./detail/online.vue";

import { useDetail } from "@/utils/toDetail";
const { initToDetail } = useDetail();
initToDetail("query");
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
