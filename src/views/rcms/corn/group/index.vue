<template>
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
        :is-selection="true"
        has-index-column
        :index-table-column-props="{
          label: '序号',
          width: 60
        }"
        :adaptive="{
          offsetBottom: 80
        }"
        :pagination="pagination"
        @paginationChange="handlePageChange"
        @selection-change="handleSelectChange"
      >
        <template #title>
          <el-button type="primary" plain :icon="Plus" @click="handleCreate"
            >新增</el-button
          >
          <el-button type="danger" plain :icon="Delete" @click="handleDelete"
            >删除</el-button
          >
        </template>
      </PlusTable>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, toRefs } from "vue";
import { useTable } from "plus-pro-components";
import type { PageInfo } from "plus-pro-components";
import { Plus, Delete } from "@element-plus/icons-vue";
import { searchColumns, buildTableColum, groupService } from "./utils/hook";

// --- 查询条件区域 ---
const searchForm = ref({});

const handleChange = (values: any) => {
  console.log(values, "change");
  getList();
};
const handleSearch = (values: any) => {
  console.log(values, "search");
  getList();
};
const handleReset = () => {
  console.log("handleReset");
  getList();
};
// --- Table ---
const loading = ref(false);
const { tableData, total, pageInfo } = useTable<Array<any>>();
const multipleSelection = ref<Array<any>>([]);
const pagination = {
  total: total,
  modelValue: pageInfo,
  pageSizeList: [5, 10, 20, 50, 100],
  align: "right"
};
// 列表按钮操作
const handleClickButton = (e, value, index, row, item) => {
  console.log("列表按钮操作", item.name, index);
};
const tableColumns = buildTableColum(handleClickButton);
const getList = async () => {
  loading.value = true;
  console.log("~~~ 加载数据 ~~~~");
  try {
    const { data, total: dataTotal } = await groupService.getTableData();
    tableData.value = data;
    total.value = dataTotal;
  } catch (error) {}
  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 500);
  });
  loading.value = false;
};
const handlePageChange = (_pageInfo: PageInfo): void => {
  console.log(_pageInfo, "page change");
  pageInfo.value = _pageInfo;
  getList();
};
const handleSelectChange = (val: Array<any>) => {
  console.log("handleSelectChange");
  multipleSelection.value = val;
};
const handleCreate = () => {
  console.log("handleCreate");
};
const handleDelete = () => {
  console.log("handleDelete");
};
// --- 进入页面加载数据 ---
onMounted(() => {
  getList();
});
</script>
