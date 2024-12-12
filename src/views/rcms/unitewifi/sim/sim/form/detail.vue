<template>
  <div class="rcms-plus-context">
    <el-collapse v-model="activeCollapse">
      <el-collapse-item title="SIM卡信息" name="1">
        <PlusDescriptions
          class="padding-lr"
          :column="2"
          :columns="simColumns"
          :data="currentRow"
          :label-width="'140px'"
          :descriptionsItemProps="{
            labelAlign: 'right'
          }"
        />
      </el-collapse-item>
      <el-collapse-item title="运营商卡信息" name="2">
        <div class="padding-lr">
          <div class="bottom">基础信息</div>
          <PlusDescriptions
            :column="2"
            :columns="mchSimBsColumns"
            :data="currentRow"
            :label-width="'140px'"
            :descriptionsItemProps="{
              labelAlign: 'right'
            }"
          />
          <div class="padding">状态变更记录</div>
          <el-steps :active="0" align-center>
            <el-step title="运营商管理状态" description="Some description" />
            <el-step
              title="停机"
              description="Some description"
              class="step_red"
            />
            <el-step
              title="在用"
              description="Some description"
              class="step_green"
            />
          </el-steps>
        </div>
      </el-collapse-item>
      <el-collapse-item title="流量统计" name="3">
        <div ref="pieChartRef" style="width: 100%; height: 45vh" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { cloneDeep, useDark, useECharts } from "@pureadmin/utils";
const props = defineProps<{
  currentRow: any;
  tableColumns: PlusColumn[];
}>();
const activeCollapse = ref(["1", "2", "3"]);
// --- SIM卡基础信息
const simColumns = cloneDeep(props.tableColumns);
delete simColumns[0]["render"];
// --- SIM卡运营商信息
const mchSimBsColumns: PlusColumn[] = [
  {
    label: "iccid",
    prop: "enterpriseId"
  },
  {
    label: "imsi",
    prop: "enterpriseId"
  },
  {
    label: "运营商",
    prop: "enterpriseId"
  },
  {
    label: "msisdn",
    prop: "enterpriseId"
  },
  {
    label: "开卡时间",
    prop: "enterpriseId"
  },
  {
    label: "激活时间",
    prop: "enterpriseId"
  },
  {
    label: "卡状态",
    prop: "enterpriseId"
  },
  {
    label: "限速值",
    prop: "enterpriseId"
  },
  {
    label: "当日使用流量",
    prop: "enterpriseId"
  },
  {
    label: "当月使用流量",
    prop: "enterpriseId"
  }
];
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
      name: "使用量(MB)",
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
<style lang="scss" scoped>
:deep(.el-descriptions__content) {
  width: 35% !important;
}
.bottom {
  padding-bottom: 10px;
}
.padding {
  padding: 10px 0;
}
:deep(.el-step__main) {
  .el-step__title,
  .el-step__description {
    color: var(--el-text-color-placeholder);
  }
}
:deep(.el-step__head) {
  .el-step__icon.is-text {
    color: var(--el-text-color-placeholder);
    border-color: var(--el-text-color-placeholder);
    background: var(--el-text-color-placeholder);
  }
}
:deep(.step_red) {
  .el-step__head,
  .el-step__title {
    .el-step__icon.is-text {
      color: red;
      border-color: red;
      background: red;
    }
    .el-step__line {
      border-color: #a8abb2;
    }
  }
}
:deep(.step_green) {
  .el-step__head,
  .el-step__title {
    .el-step__icon.is-text {
      color: var(--el-color-success);
      border-color: var(--el-color-success);
      background: var(--el-color-success);
    }
    .el-step__line {
      border-color: #a8abb2;
    }
  }
}
.padding-lr {
  padding: 0 20px;
}
</style>
