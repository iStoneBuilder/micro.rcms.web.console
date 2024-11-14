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
    label: "套餐名",
    prop: "name",
    valueType: "copy"
  },
  {
    label: "套餐编号",
    prop: "name",
    valueType: "copy"
  },
  {
    label: "商户",
    prop: "status",
    valueType: "select",
    options: [
      {
        label: "未解决",
        value: "0",
        color: "red"
      },
      {
        label: "已解决",
        value: "1",
        color: "blue"
      },
      {
        label: "解决中",
        value: "2",
        color: "yellow"
      },
      {
        label: "失败",
        value: "3",
        color: "red"
      }
    ]
  },
  {
    label: "是否上级",
    prop: "time",
    valueType: "date-picker"
  },
  {
    label: "是否限速",
    prop: "time",
    valueType: "date-picker"
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
    label-width="120"
    label-position="right"
    @change="handleChange"
    @search="handleSearch"
    @reset="handleRest"
  />
</template>
