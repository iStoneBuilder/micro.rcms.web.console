<template>
  <PlusDescriptions
    :column="1"
    :columns="newColumns"
    :data="currentRow"
    :label-width="'140px'"
  />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { cloneDeep } from "@pureadmin/utils";
const props = defineProps<{
  currentRow: any;
  tableColumns: PlusColumn[];
}>();
const newColumns = cloneDeep(props.tableColumns);
delete newColumns[0]["render"];
</script>
