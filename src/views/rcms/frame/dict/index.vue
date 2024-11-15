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
      <template #table-title>
        <el-row class="button-row">
          <el-button
            v-if="hasPerms('permission:role:update')"
            type="primary"
            plain
            :icon="Plus"
          >
            新增
          </el-button>
          <el-button
            v-if="hasPerms('permission:role:update')"
            type="danger"
            plain
            :icon="Delete"
          >
            删除
          </el-button>
        </el-row>
      </template>
    </PlusPage>
  </div>
</template>

<script lang="ts" setup>
import { h, Fragment } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import type { PlusColumn, PageInfo } from "plus-pro-components";
import { ElButton } from "element-plus";
import { Plus, Delete, Setting, EditPen } from "@element-plus/icons-vue";
import { Search, Refresh, ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import list from "mock/list";
import { getPermissionPageList } from "@/api/rcms/permission";
import { renderPermBtn, hasPerms } from "@/utils/auth";

const defaultPageInfo = {
  page: 1,
  pageSize: 15
};

const getList = async (query: PageInfo) => {
  const { page = 1, pageSize = 15 } = query || {};
  const params = query;
  delete params.page;
  delete params.pageSize;
  const { data } = await getPermissionPageList(page, pageSize, params);

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
function handleClickButton(e, value, index, row, item) {
  console.log(e, value, index, row, item);
}

const buttons = [
  { name: "编辑", type: "primary", perm: null, icon: EditPen },
  { name: "删除", type: "danger", perm: null, icon: Delete },
  { name: "配置", type: "primary", perm: "aaa", icon: Setting }
];

const tableConfig: PlusColumn[] = [
  {
    label: "字典项",
    minWidth: 200,
    prop: "name",
    tableColumnProps: {
      showOverflowTooltip: true
    }
  },
  {
    label: "字典项名称",
    minWidth: 300,
    prop: "authCode"
  },
  {
    label: "描述",
    minWidth: 500,
    prop: "path",
    hideInSearch: true
  },
  {
    label: "操作",
    width: 250,
    prop: "path",
    hideInSearch: true,
    tableColumnProps: {
      align: "center"
    },
    render: (value, { index, row }) => {
      const CustomButton = renderPermBtn(
        buttons,
        handleClickButton,
        value,
        index,
        row
      );
      return h(Fragment, CustomButton);
    }
  }
];
</script>
