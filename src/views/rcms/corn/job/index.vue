<template>
  <div>
    <div class="rcms-plus-page">
      <el-card>
        <PlusSearch
          v-model="searchForm"
          :columns="searchColumns"
          :show-number="3"
          :col-props="{ xs: 1, sm: 1, md: 6, lg: 6, xl: 6 }"
          :label-width="100"
          @change="handleChange"
          @search="handleSearch"
          @reset="handleReset"
        />
      </el-card>
      <el-card>
        <PlusTable
          :loadingStatus="loading"
          table-layout="auto"
          showOverflowTooltip
          :columns="tableColumns"
          :table-data="tableData"
          has-index-column
          :index-table-column-props="{
            label: '序号',
            width: 60
          }"
          :adaptive="{
            offsetBottom: 80
          }"
          :pagination="{
            modelValue: pageInfo,
            pageSizeList: pageSizeList,
            pageSize: 15,
            total: total
          }"
          @paginationChange="handlePageChange"
        />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useTable } from "plus-pro-components";
import type { PageInfo } from "plus-pro-components";
import { searchColumns, buildTableColum } from "./utils/hook";
import { getCornJobPageList } from "@/api/corn/task";

// --- 查询条件区域 ---
const searchForm = ref({});
const handleChange = (values: any) => {
  search();
};
const handleSearch = (values: any) => {
  search();
};
const handleReset = () => {
  search();
};
// --- Table ---
const pageSizeList = [5, 15, 50, 100, 200];
const loading = ref(false);
const { tableData, total, pageInfo } = useTable<Array<any>>();
pageInfo.value.pageSize = 15;
const tableColumns = buildTableColum();
const search = async () => {
  loading.value = true;
  const { data } = await getCornJobPageList(
    pageInfo.value.page,
    pageInfo.value.pageSize,
    searchForm.value
  );
  tableData.value = data.data;
  total.value = data.meta.totalRows;
  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 500);
  });
  loading.value = false;
};
const handlePageChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo;
  search();
};
const route = useRoute();
// --- 进入页面加载数据 ---
onMounted(() => {
  if (Object.keys(route.query).length > 0) {
    searchForm.value = { ...searchForm.value, ...route.query };
  }
  search();
});
</script>
