<script setup lang="ts">
import { ref, defineOptions } from "vue";
import { hasPerms, hasDataPerms } from "@/utils/auth";
import { useDept } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Refresh from "@iconify-icons/ep/refresh";
import { getEnterpriseId } from "@/utils/common";

defineOptions({
  name: "RoleManage"
});

const formRef = ref();
const tableRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  onSearch,
  resetForm,
  openDialog,
  handleDelete,
  handleRolePerm
} = useDept();

function onFullscreen() {
  // 重置表格高度
  tableRef.value.setAdaptive();
}
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      title="角色管理"
      :columns="columns"
      :tableRef="tableRef?.getTableRef()"
      class="rcms-tab-bar"
      @refresh="onSearch"
      @fullscreen="onFullscreen"
    >
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          adaptive
          :adaptiveConfig="{ offsetBottom: 60 }"
          align-whole="center"
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          default-expand-all
          :loading="loading"
          border
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
        >
          <template #operation="{ row }">
            <el-button
              v-if="hasPerms('permission:role:create')"
              class="reset-margin"
              link
              :type="'primary'"
              :size="size"
              @click="openDialog('新增', { parentId: row.id } as any)"
            >
              新增
            </el-button>
            <el-button
              v-if="
                !hasDataPerms('permission:role:update', 'm:' + row.enterpriseId)
              "
              class="reset-margin"
              link
              :type="'primary'"
              :size="size"
              @click="openDialog('修改', row)"
            >
              修改
            </el-button>
            <el-button
              v-if="hasPerms('permission:role:permissions:authorize')"
              class="reset-margin"
              link
              :size="size"
              :type="'primary'"
              @click="handleRolePerm(row)"
            >
              授权
            </el-button>
            <el-button
              v-if="hasPerms('permission:role:delete') && !row.disabled"
              class="reset-margin"
              link
              :type="row.disabled ? 'info' : 'primary'"
              :size="size"
              :disabled="row.disabled"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-table__inner-wrapper::before) {
  height: 0;
}
.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
:deep(.items-center) {
  div:nth-child(1) {
    display: flex;
    .el-divider--vertical {
      margin: 8px;
    }
  }
}
</style>
