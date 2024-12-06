<template>
  <div class="rcms-plus-page">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="角色信息" name="1">
        <PlusDescriptions
          :column="2"
          :columns="newColumns"
          :data="currentRow"
          :label-width="160"
        />
      </el-collapse-item>
      <el-collapse-item title="角色授权" name="2">
        <div class="rcms-pure-bar">
          <el-alert title="" type="success" :closable="false">
            <p>当前商户的角色禁止修改权限，只允许修改授权下级商户角色权限</p>
          </el-alert>
          <el-button
            v-if="
              hasPerms('permission:role:authorize') &&
              currentRow.enterpriseId !== getEnterpriseId()
            "
            type="primary"
            plain
            @click="handleAuthorize()"
          >
            授权提交
          </el-button>
        </div>
        <pure-table
          ref="tableRef"
          row-key="authCode"
          :data="tableData"
          :columns="tableColumns"
          adaptive
          border
          :adaptiveConfig="{ offsetBottom: 20 }"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts" setup>
import { hasPerms } from "@/utils/auth";
import { ref, defineProps, onMounted } from "vue";
import { cloneDeep } from "@pureadmin/utils";
import { useTable } from "plus-pro-components";
import {
  authorizeRolePerm,
  getRolePermissionList
} from "@/api/rcms/rolemanage";
import { nextTick } from "process";
import { message } from "@/utils/message";
import { getEnterpriseId } from "@/utils/common";
const props = defineProps<{
  currentRow: any;
  createColumns: TableColumnList;
}>();
const activeNames = ref(["1", "2"]);
const newColumns = cloneDeep(props.createColumns);
newColumns.splice(-1, 1);
newColumns.forEach(item => {
  item["descriptionsItemProps"] = {
    labelAlign: "right"
  };
});
// ------权限数据-------
const rSelect = ref([]);
const tableColumns: TableColumnList = [
  {
    type: "selection",
    align: "left",
    hide: props.currentRow.enterpriseId === getEnterpriseId()
  },
  {
    label: "权限",
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
onMounted(async () => {
  let id =
    props.currentRow.parentId === "0"
      ? props.currentRow.id
      : props.currentRow.parentId;
  const pData = await getRolePermissionList(id);
  tableData.value = pData.data;
  if (props.currentRow.parentId === "0") {
    return;
  }
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
  });
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
