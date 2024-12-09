<template>
  <PlusDescriptions
    :column="1"
    :columns="newColumns"
    :data="currentRow"
    :label-width="140"
  />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { PlusColumn } from "plus-pro-components";
const props = defineProps<{
  currentRow: any;
  tableColumns: PlusColumn[];
}>();
const newColumns = [...props.tableColumns];
</script>
