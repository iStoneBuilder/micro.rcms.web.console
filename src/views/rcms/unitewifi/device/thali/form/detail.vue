<template>
  <div class="rcms-plus-page">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="套餐详情" name="1">
        <PlusDescriptions
          :column="2"
          :columns="newColumns"
          :data="currentRow"
          :label-width="'140px'"
          :descriptionsItemProps="{
            labelAlign: 'right'
          }"
        />
      </el-collapse-item>
      <el-collapse-item title="使用明细" name="2">
        <UsedChart :data-info="{}" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { cloneDeep } from "@pureadmin/utils";
import UsedChart from "../../../coms/usedChart.vue";
const props = defineProps<{
  currentRow: any;
  tableColumns: PlusColumn[];
}>();
const newColumns = cloneDeep(props.tableColumns);
delete newColumns[0]["render"];
// ------
const activeNames = ref(["1", "2"]);
</script>
