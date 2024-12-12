<template>
  <div ref="pieChartRef" style="width: 100%; height: 45vh" />
</template>

<script lang="ts" setup>
import { defineProps, ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";
const props = defineProps<{
  dataInfo: any;
}>();
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
      type: "value",
      name: props.dataInfo.name,
      nameGap: 25
    }
  ],
  series: [
    {
      name: "Direct",
      type: "bar",
      barWidth: "30%",
      color: ["#409EFF"],
      label: {
        show: true,
        position: "top",
        formatter: function (a) {
          return a.value as string;
        }
      },
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
});
</script>
