<template>
  <div class="rcms-plus-page">
    <PlusPage
      :columns="tableConfig"
      has-index-column
      :request="getList"
      :search="{
        labelWidth: '100px',
        colProps: { span: 6 },
        showNumber: 3
      }"
      :table="{
        isSelection: true
      }"
      :default-page-info="defaultPageInfo"
      :default-page-size-list="[5, 15, 20, 50]"
    >
      <template
        #search-footer="{
          handleReset,
          handleSearch,
          handleUnfold,
          isShowUnfold
        }"
      >
        <div style="display: flex">
          <el-button type="primary" :icon="Search" @click="handleSearch"
            >搜索</el-button
          >
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
          <el-button
            :icon="isShowUnfold ? ArrowUp : ArrowDown"
            @click="handleUnfold"
          >
            {{ isShowUnfold ? "收起" : "展开" }}
          </el-button>
        </div>
      </template>
      <template #table-title>
        <el-row class="button-row">
          <el-button type="primary" :icon="Plus"> 添加 </el-button>
          <el-button type="danger" :icon="Delete"> 批量删除 </el-button>
        </el-row>
      </template>
    </PlusPage>
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn, PageInfo } from "plus-pro-components";
import { ElButton } from "element-plus";
import { Plus, Delete } from "@element-plus/icons-vue";
import { Search, Refresh, ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import list from "mock/list";
import { getPermissionPageList } from "@/api/rcms/permission";

const defaultPageInfo = {
  page: 1,
  pageSize: 15
};

const getList = async (
  query: PageInfo & {
    status?: string;
    name?: string;
  }
) => {
  const { page = 1, pageSize = 15 } = query || {};

  const { data } = await getPermissionPageList(page, pageSize, query);

  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
};

const method = {
  GET: "success",
  PUT: "primary",
  POST: "warning",
  DELETE: "danger"
};

function handleMethodShow(value: string) {
  return method[value];
}

const tableConfig: PlusColumn[] = [
  {
    label: "接口名称",
    minWidth: 200,
    prop: "name",
    tableColumnProps: {
      showOverflowTooltip: true
    }
  },
  {
    label: "权限编码",
    minWidth: 300,
    prop: "authCode"
  },
  {
    label: "接口路径",
    minWidth: 500,
    prop: "path"
  },
  {
    label: "接口类型",
    width: 100,
    prop: "type",
    tableColumnProps: {
      align: "center"
    }
  },
  {
    label: "请求方式",
    width: 100,
    prop: "method",
    valueType: "tag",
    hideInSearch: true,
    tableColumnProps: {
      align: "center"
    },
    fieldProps: value => ({
      type: handleMethodShow(value as string)
    })
  },
  {
    label: "OpenApi",
    width: 100,
    prop: "isOpenApi",
    valueType: "tag",
    tableColumnProps: {
      align: "center"
    },
    fieldProps: value => ({
      type: value === "Y" ? "success" : "primary"
    }),
    fieldSlots: {
      default: ({ value }) => (value === "Y" ? "是" : "否")
    },
    hideInSearch: true
  },
  {
    label: "OpenApi",
    width: 100,
    prop: "isOpenApi",
    valueType: "select",
    hideInTable: true,
    options: [
      { value: "Y", label: "是" },
      { value: "N", label: "否" }
    ]
  }
];
</script>
