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
        isSelection: true,
        onSelectionChange: handleSelect
      }"
      :default-page-info="defaultPageInfo"
      :default-page-size-list="[5, 15, 20, 50]"
    >
      <template #table-title>
        <div class="rcms-plus-bar" style="display: flex">
          <el-row class="button-row" style="width: 300px; padding-right: 10px">
            <el-select
              v-model="selectAccount"
              placeholder="请选择程序账户"
              class="w-full"
              clearable
            >
              <el-option
                v-for="item in appAccount"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-row>
          <el-row class="button-row">
            <el-button
              v-if="hasPerms('permission:role:update')"
              type="primary"
              plain
              :icon="Plus"
              @click="handleAccountPerm"
            >
              授权
            </el-button>
          </el-row>
        </div>
      </template>
    </PlusPage>
  </div>
</template>

<script lang="ts" setup>
import { message } from "@/utils/message";
import { ref, reactive, onMounted } from "vue";
import { hasPerms } from "@/utils/auth";
import type { PlusColumn, PageInfo } from "plus-pro-components";
import { ElButton } from "element-plus";
import { Plus, Delete } from "@element-plus/icons-vue";
import { Search, Refresh, ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import { getAccountPageList } from "@/api/rcms/account";
import { getPermissionPageList } from "@/api/rcms/permission";

const defaultPageInfo = {
  page: 1,
  pageSize: 15
};
interface State {
  /**
   * 当前选择多行的id集合
   */
  selectedIds: string[];
}
const state = reactive<State>({
  selectedIds: []
});
const appAccount = ref([]);
async function loadAppAccount() {
  const { data } = await getAccountPageList(1, 100, { type: "app" });
  appAccount.value = data.data;
}

onMounted(() => {
  loadAppAccount();
});

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
const selectAccount = ref();
function handleSelect(data: any) {
  state.selectedIds = [...data].map(item => item.code);
}
function handleAccountPerm() {
  if (!selectAccount.value) {
    message(`请选择需要授权的程序账户`, {
      type: "warning",
      duration: 5000
    });
    return;
  }
  if (!state.selectedIds.length) {
    message(`请选择OpenApi授权，非OpenApi不允许授权程序账户访问`, {
      type: "warning",
      duration: 5000
    });
    return;
  }
}
</script>
