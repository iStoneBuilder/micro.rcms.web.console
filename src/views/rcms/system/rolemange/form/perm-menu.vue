<template>
  <div class="rcms-pure-bar">
    <el-alert title="" type="success" :closable="false">
      <p>当前商户的角色禁止修改权限，只允许修改授权下级商户角色权限</p>
    </el-alert>
    <el-button
      v-if="
        hasPerms('permission:role:menus:authorize') &&
        currentRow.enterpriseId !== getEnterpriseId()
      "
      type="primary"
      plain
      :loading="submitLoading"
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
  <div class="menu-tree">
    <el-tree
      ref="treeRef"
      style="width: 100%"
      :data="parentData"
      :show-checkbox="showSelect"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <template #default="{ data }">
        <span class="custom-tree-node">
          <span class="title">{{ data.name }}</span>
          <span class="path">{{ data.path }}</span>
          <span class="component">{{ data.component }}</span>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="tsx" setup>
import { hasPerms } from "@/utils/auth";
import { ref, defineProps, onMounted } from "vue";
import { authorizeRoleMenuPerm, getRoleMenuList } from "@/api/rcms/rolemanage";
import { nextTick } from "process";
import { message } from "@/utils/message";
import { getEnterpriseId } from "@/utils/common";
import { handleTree } from "@/utils/tree";
import { ElTree } from "element-plus";

const props = defineProps<{
  currentRow: any;
}>();
const showSelect = ref(true);
const submitLoading = ref(false);
const isRefresh = ref(false);
const treeRef = ref<InstanceType<typeof ElTree>>();
// 上级权限数据
const parentData = ref([]);
// 当前角色权限数据
const selectOld = ref([]);
const handleAuthorize = async function () {
  const selectNew = treeRef.value!.getCheckedNodes(false, false);
  const oldVl = btoa(encodeURI(JSON.stringify(selectOld.value)));
  const newVl = btoa(encodeURI(JSON.stringify(selectNew)));
  if (oldVl === newVl) {
    message(`栏目数据未修改！请勿提交`, {
      type: "warning"
    });
    return;
  }
  submitLoading.value = true;
  // 角色ID 栏目列表
  await authorizeRoleMenuPerm(props.currentRow["id"], selectNew)
    .then(() => {
      submitLoading.value = false;
      selectOld.value = selectNew;
      message(`栏目授权成功！`, {
        type: "success"
      });
    })
    .catch(error => {
      submitLoading.value = false;
    });
};
const loadTreeData = async function (isRh?: boolean) {
  isRefresh.value = isRh;
  showSelect.value = true;
  // 加载当前起租权限
  if (getEnterpriseId() === props.currentRow.enterpriseId) {
    showSelect.value = false;
    const pData = await getRoleMenuList(props.currentRow.id);
    parentData.value = handleTree(pData.data);
    isRefresh.value = false;
    return;
  }
  const pData = await getRoleMenuList(props.currentRow.parentId);
  parentData.value = handleTree(pData.data);
  // 加载父角色权限
  nextTick(async () => {
    // 加载当前角色权限
    const { data } = await getRoleMenuList(props.currentRow.id);
    data.forEach(item => {
      if (item.parentId != 0) {
        selectOld.value.push(item);
      }
    });
    treeRef.value!.setCheckedNodes(selectOld.value, false);
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
.menu-tree {
  border: 1px solid #eceef5;
  height: calc(100vh - 410px);
  .el-tree {
    overflow-y: scroll;
    height: 100%;
  }
  .custom-tree-node {
    display: flex;
    width: 100%;
    .title {
      width: 25%;
    }
    .path {
      width: 30%;
    }
    .component {
      width: 45%;
    }
  }
}
</style>
