<template>
  <div class="rcms-plus-page">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="订单详情" name="1">
        <PlusDescriptions
          :column="1"
          :columns="newColumns"
          :data="currentRow"
          :label-width="'140px'"
          :descriptionsItemProps="{ labelAlign: 'right' }"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { cloneDeep } from "@pureadmin/utils";
const props = defineProps<{
  currentRow: any;
  tableColumns: PlusColumn[];
}>();
const newColumns = cloneDeep(props.tableColumns);
delete newColumns[0]["render"];
const activeNames = ref(["1", "2"]);
</script>
<style scoped>
:deep(.el-descriptions__content) {
  width: 80% !important;
}
</style>
