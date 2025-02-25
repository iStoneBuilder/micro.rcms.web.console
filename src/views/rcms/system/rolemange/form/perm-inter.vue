<template>
  <div class="rcms-pure-bar">
    <el-alert title="" type="success" :closable="false">
      <p>当前商户的角色禁止修改权限，只允许修改授权下级商户角色权限</p>
    </el-alert>
    <el-button
      v-if="
        hasPerms('permission:role:permissions:authorize') &&
        currentRow.enterpriseId !== getEnterpriseId()
      "
      type="primary"
      plain
      @click="handleAuthorize()"
    >
      授权提交
    </el-button>
    <el-button
      :loading="isRefresh"
      type="primary"
      plain
      @click="loadTreeData(true)"
    >
      刷新
    </el-button>
  </div>
  <pure-table
    ref="tableRef"
    row-key="authCode"
    :data="tableData"
    :columns="permissionColumns"
    adaptive
    border
    :Loading="isRefresh"
    :adaptiveConfig="{ offsetBottom: 45 }"
    :header-cell-style="{
      background: 'var(--el-fill-color-light)',
      color: 'var(--el-text-color-primary)'
    }"
    @selection-change="handleSelectionChange"
  />
</template>

<script lang="tsx" setup>
import { hasPerms } from "@/utils/auth";
import { ref, defineProps, onMounted } from "vue";
import { useTable } from "plus-pro-components";
import {
  authorizeRolePerm,
  getRolePermissionList
} from "@/api/rcms/rolemanage";
import { nextTick } from "process";
import { message } from "@/utils/message";
import { getEnterpriseId } from "@/utils/common";
import { Loading } from "vxe-table";

const props = defineProps<{
  currentRow: any;
}>();
const isRefresh = ref(false);
const rSelect = ref([]);
const permissionColumns: TableColumnList = [
  {
    type: "selection",
    align: "left",
    hide: props.currentRow.enterpriseId === getEnterpriseId()
  },
  {
    label: "接口名称",
    prop: "name"
  },
  {
    label: "权限编码",
    prop: "authCode"
  },
  {
    label: "服务提供商",
    prop: "serviceCode",
    width: 140,
    align: "center"
  }
];
const multipleSelection = ref([]);
const handleSelectionChange = val => {
  multipleSelection.value = val;
};
const tableRef = ref();
const toggleSelection = (rows?: any) => {
  const { toggleRowSelection, clearSelection } = tableRef.value.getTableRef();
  if (rows) {
    rows.forEach(row => {
      toggleRowSelection(row, undefined);
    });
  } else {
    clearSelection();
  }
};
const submitLoading = ref(false);
const handleAuthorize = async function () {
  const oldVl = btoa(encodeURI(JSON.stringify(rSelect.value)));
  const newVl = btoa(encodeURI(JSON.stringify(multipleSelection.value)));
  if (oldVl === newVl) {
    message(`权限未修改！请勿提交`, {
      type: "warning"
    });
    return;
  }
  submitLoading.value = true;
  // 角色ID，权限列表
  await authorizeRolePerm(props.currentRow["id"], multipleSelection.value)
    .then(() => {
      rSelect.value = multipleSelection.value;
      message(`授权成功！`, {
        type: "success"
      });
    })
    .catch(error => {
      submitLoading.value = false;
    });
};
const { tableData } = useTable<object[]>();
const loadTreeData = async function (isRh?: boolean) {
  isRefresh.value = isRh || false;
  // 当前企业的权限不允许修改(加载当前角色权限)
  if (getEnterpriseId() === props.currentRow.enterpriseId) {
    const pData = await getRolePermissionList(props.currentRow.id);
    tableData.value = pData.data;
    isRefresh.value = false;
    return;
  }
  const pData = await getRolePermissionList(props.currentRow.parentId);
  tableData.value = pData.data;
  // 加载父角色权限
  nextTick(async () => {
    // 加载当前角色权限
    const { data } = await getRolePermissionList(props.currentRow.id);
    rSelect.value = data;
    data.forEach(item => {
      for (let index = 0; index < tableData.value.length; index++) {
        const tItem = tableData.value[index];
        if (item.authCode === tItem["authCode"]) {
          toggleSelection([tItem]);
          break;
        }
      }
    });
    isRefresh.value = false;
  });
};
onMounted(async () => {
  loadTreeData();
});
</script>

<style lang="scss" scoped>
.el-col {
  text-align: center;
}
.el-drawer__body {
  padding: 0 20px !important;
}
.rcms-pure-bar {
  text-align: right;
  height: 45px;
  display: flex;
  align-items: center;
  button {
    margin-left: 10px;
  }
  .el-alert {
    --el-alert-padding: 4px 10px;
  }
}
</style>
