<template>
  <el-card>
    <PlusDescriptions
      :column="2"
      :columns="newColumns"
      :data="currentRow"
      :label-width="140"
    />
    <div style="margin-top: 16px; text-align: center">
      <el-button type="primary" plain @click="handleClose()">关闭</el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type { PlusColumn } from "plus-pro-components";
const props = defineProps<{
  currentRow: any;
  tableColumns: PlusColumn[];
}>();
const newColumns = [...props.tableColumns];
const emit = defineEmits(["dialogEvent"]);
function handleClose() {
  emit("dialogEvent");
}
</script>
