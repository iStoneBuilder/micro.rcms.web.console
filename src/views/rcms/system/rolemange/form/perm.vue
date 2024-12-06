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
        <pure-table
          ref="tableRef"
          :data="tableData"
          :columns="tableColumns"
          @selection-change="handleSelectionChange"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
import { cloneDeep } from "@pureadmin/utils";
import { useTable } from "plus-pro-components";
import { getRolePermissionList } from "@/api/rcms/rolemanage";
import { nextTick } from "process";
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
const tableColumns: TableColumnList = [
  {
    type: "selection",
    align: "left"
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
    prop: "serviceCode"
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
const { tableData } = useTable<object[]>();
onMounted(async () => {
  const pData = await getRolePermissionList(props.currentRow.parentId);
  tableData.value = pData.data;
  // 加载父角色权限
  nextTick(async () => {
    // 加载当前角色权限
    const { data } = await getRolePermissionList(props.currentRow.id);
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
</style>
