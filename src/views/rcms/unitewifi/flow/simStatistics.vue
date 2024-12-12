<template>
  <div class="rcms-plus-page">
    <el-alert title="流量卡统计" type="success" :closable="false">
      <div class="alert-item">
        <p>按照设备流量上报每日统计生成数据</p>
      </div>
    </el-alert>
    <PlusPage
      ref="plusPageInstance"
      class="rcms-plus-tab"
      :columns="tableColumns"
      :request="getList"
      :search="false"
      :table="{
        isSelection: false,
        adaptive: { offsetBottom: 80 }
      }"
      :default-page-info="pageInfo"
      :default-page-size-list="[5, 15, 20, 50]"
    />
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { getPageRecordList } from "@/api/mifi/device-type";
import type {
  PageInfo,
  PlusPageInstance,
  PlusColumn
} from "plus-pro-components";

const pageInfo = { page: 1, pageSize: 15 };
const loading = ref(false);
const tableColumns: PlusColumn[] = [
  {
    label: "iccid",
    prop: "name",
    width: 200,
    align: "left",
    hideInSearch: true
  },
  {
    label: "统计类型",
    prop: "name",
    width: 200,
    align: "left",
    hideInSearch: true
  },
  {
    label: "统计来源",
    prop: "name",
    width: 200,
    align: "left",
    hideInSearch: true
  },
  {
    label: "统计日期",
    prop: "name",
    width: 200,
    align: "left",
    hideInSearch: true
  },
  {
    label: "消耗量",
    prop: "name",
    minWidth: 200,
    align: "left",
    hideInSearch: true
  }
];
const plusPageInstance = ref<PlusPageInstance | null>(null);
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getPageRecordList(page, pageSize, params);
  return { data: data.data, success: true, total: data.meta.totalRows };
}
</script>
