<template>
  <el-card id="el-detail">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="套餐详情" name="1">
        <PlusDescriptions
          :column="2"
          :columns="newColumns"
          :data="currentRow"
          :label-width="160"
        />
      </el-collapse-item>
      <el-collapse-item title="销售情况" name="2">
        <el-row>
          <el-col :span="8">
            <el-statistic title="今日销售量" :value="100" />
          </el-col>
          <el-col :span="8">
            <el-statistic title="当月销售量" :value="500" />
          </el-col>
          <el-col :span="8">
            <el-statistic title="总共销售量" :value="outputValue" />
          </el-col>
        </el-row>
        <div ref="pieChartRef" style="width: 100%; height: 44vh" />
      </el-collapse-item>
    </el-collapse>
  </el-card>
  <div style="margin-top: 16px; text-align: center">
    <el-button type="primary" plain @click="handleClose()"> 关闭 </el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, computed } from "vue";
import { useTransition } from "@vueuse/core";
import type { PlusColumn } from "plus-pro-components";
import { useDark, useECharts } from "@pureadmin/utils";
const props = defineProps<{
  currentRow: any;
  createColumns: PlusColumn[];
}>();
const activeNames = ref(["1", "2"]);
const newColumns = [...props.createColumns];

const source = ref(0);
const outputValue = useTransition(source, {
  duration: 1500
});
source.value = 172000;
// -------------

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const pieChartRef = ref();
const { setOptions } = useECharts(pieChartRef, {
  theme
});
setOptions({
  tooltip: {
    trigger: "item"
  },
  legend: {
    icon: "circle"
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true
    }
  ]
});
// --------------
const emit = defineEmits(["dialogEvent"]);
function handleClose() {
  emit("dialogEvent");
}
</script>
<style lang="scss" scoped>
#el-detail {
  height: calc(100vh - 340px);
  max-height: calc(100vh - 300px);
  overflow-y: scroll;
}
.el-collapse {
  --el-collapse-header-font-size: 18px;
}
.el-col {
  text-align: center;
}
</style>
