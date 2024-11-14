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
    label: "订单号",
    prop: "name",
    valueType: "copy"
  },
  {
    label: "设备SN",
    prop: "name",
    valueType: "copy"
  },
  {
    label: "支付方式",
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
      }
    ]
  },
  {
    label: "订单状态",
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
      }
    ]
  },
  {
    label: "退款状态",
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
      }
    ]
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
      }
    ]
  },
  {
    label: "下单时间",
    prop: "time",
    valueType: "date-picker"
  },
  {
    label: "支付时间",
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
