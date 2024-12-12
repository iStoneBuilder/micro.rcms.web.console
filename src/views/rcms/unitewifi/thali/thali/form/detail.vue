<template>
  <div class="rcms-plus-page">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="套餐详情" name="1">
        <PlusDescriptions
          :column="2"
          :columns="newColumns"
          :data="currentRow"
          :label-width="50"
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
        <UsedChart :data-info="{ name: '销售量' }" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useTransition } from "@vueuse/core";
import type { PlusColumn } from "plus-pro-components";
import { cloneDeep } from "@pureadmin/utils";
import UsedChart from "../../../coms/usedChart.vue";
const props = defineProps<{
  currentRow: any;
  createColumns: PlusColumn[];
}>();
const activeNames = ref(["1", "2"]);
const newColumns = cloneDeep(props.createColumns);
delete newColumns[0].render;
newColumns.push({
  label: "套餐规则",
  prop: "dataPlanRules",
  minWidth: 90,
  align: "left",
  valueType: "textarea",
  colProps: {
    span: 24
  }
});

const source = ref(0);
const outputValue = useTransition(source, {
  duration: 1500
});
source.value = 172000;
</script>
<style lang="scss" scoped>
.el-col {
  text-align: center;
}
.el-drawer__body {
  padding: 0 20px !important;
}
</style>
