<template>
  <div class="rcms-plus-page">
    <PlusTable
      :loadingStatus="loading"
      table-layout="auto"
      showOverflowTooltip
      :columns="tableColumns"
      :table-data="tableData"
      :adaptive="{
        offsetBottom: 346
      }"
      :pagination="{
        modelValue: pageInfo,
        pageSizeList: pageSizeList,
        pageSize: 15,
        total: total
      }"
      @paginationChange="handlePageChange"
    />
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PageInfo, PlusColumn } from "plus-pro-components";
const { tableData, total, pageInfo, buttons } = useTable<Array<any>>();
const loading = ref(false);
const pageSizeList = [5, 15, 50, 100, 200];
const tableColumns: PlusColumn[] = [
  {
    label: "套餐名称",
    prop: "dataPlanRules",
    width: 300
  },
  {
    label: "剩余流量(MB)",
    prop: "dataPlanRules",
    minWidth: 100
  },
  {
    label: "当前已用流量(MB)",
    prop: "dataPlanRules",
    minWidth: 100
  },
  {
    label: "总计已用流量(MB)",
    prop: "dataPlanRules",
    minWidth: 100
  },
  {
    label: "生效时间",
    prop: "dataPlanRules",
    minWidth: 200
  },
  {
    label: "过期时间",
    prop: "dataPlanRules",
    minWidth: 200
  },
  {
    label: "是否限速",
    prop: "dataPlanRules",
    minWidth: 200
  },
  {
    label: "限速值(Kbps)",
    prop: "dataPlanRules",
    minWidth: 200
  }
];
const handlePageChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo;
};
</script>
