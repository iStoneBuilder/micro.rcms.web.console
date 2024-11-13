<script setup lang="ts">
import { ref } from "vue";
import { searchManage } from "./utils/hook";
import "plus-pro-components/es/components/search/style/css";
import { type PlusColumn, PlusSearch } from "plus-pro-components";

// 设置默认值
const state = ref({});

const { handleSearchImpl } = searchManage();

const columns: PlusColumn[] = [
  {
    label: "ICCID",
    prop: "name",
    valueType: "copy"
  },
  {
    label: "物联网卡号",
    prop: "status",
    valueType: "select",
    options: []
  },
  {
    label: "卡商",
    prop: "name",
    valueType: "copy"
  },
  {
    label: "运营商",
    prop: "name",
    valueType: "copy"
  },
  {
    label: "实名状态",
    prop: "name",
    valueType: "copy"
  },
  {
    label: "SIM分类",
    prop: "name",
    valueType: "copy"
  },
  {
    label: "在线",
    prop: "name",
    valueType: "copy"
  }
];

const handleChange = (values: any) => {
  handleSearchImpl("change", values);
};
const handleSearch = (values: any) => {
  handleSearchImpl("search", values);
};
const handleRest = () => {
  handleSearchImpl("rest", {});
};
</script>

<template>
  <PlusSearch
    v-model="state"
    :columns="columns"
    :show-number="3"
    :col-props="{ xs: 1, sm: 1, md: 6, lg: 6, xl: 6 }"
    label-width="100"
    label-position="right"
    @change="handleChange"
    @search="handleSearch"
    @reset="handleRest"
  />
</template>
