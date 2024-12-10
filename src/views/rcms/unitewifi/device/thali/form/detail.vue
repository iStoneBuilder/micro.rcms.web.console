<template>
  <div class="rcms-plus-page">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="套餐详情" name="1">
        <PlusDescriptions
          :column="2"
          :columns="newColumns"
          :data="currentRow"
          :label-width="'140px'"
        />
      </el-collapse-item>
      <el-collapse-item title="使用明细" name="2">
        <div ref="pieChartRef" style="width: 100%; height: 44vh" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { cloneDeep, useDark, useECharts } from "@pureadmin/utils";
const props = defineProps<{
  currentRow: any;
  tableColumns: PlusColumn[];
}>();
const newColumns = cloneDeep(props.tableColumns);
delete newColumns[0]["render"];
// ------
const activeNames = ref(["1", "2"]);
// -------图表------
const { isDark } = useDark();
const theme = computed(() => (isDark.value ? "dark" : "light"));
const pieChartRef = ref();
const { setOptions } = useECharts(pieChartRef, {
  theme
});
setOptions({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  grid: {
    left: "4%",
    right: "3%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "Direct",
      type: "bar",
      barWidth: "30%",
      color: ["#409EFF"],
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
});
</script>
