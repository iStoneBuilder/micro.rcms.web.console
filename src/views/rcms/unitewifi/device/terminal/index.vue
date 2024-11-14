<script setup lang="ts">
import { ref } from "vue";
import { hasPerms } from "@/utils/auth";
import { userManage } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import More from "@iconify-icons/ep/more-filled";

defineOptions({
  name: "UserManage"
});

function onFullscreen() {
  // 重置表格高度
  tableRef.value.setAdaptive();
}

const tableRef = ref();
const {
  loading,
  columns,
  pagination,
  dataList,
  searchForm,
  onSearch,
  viewDetail,
  handleDelete
} = userManage();
</script>

<template>
  <div class="main rcms-main">
    <component
      :is="searchForm.component"
      class="search-form bg-bg_color w-[99/100] pt-[12px] overflow-auto"
    />
    <div class="rcms-table-btn">
      <el-button type="danger" plain :icon="useRenderIcon(Delete)">
        删除
      </el-button>
      <el-button type="primary" plain :icon="useRenderIcon(Delete)">
        设备分组
      </el-button>
      <el-button type="primary" plain :icon="useRenderIcon(Delete)">
        设备激活
      </el-button>
      <el-button type="primary" plain :icon="useRenderIcon(Delete)">
        设备控制
      </el-button>
      <el-button type="primary" plain :icon="useRenderIcon(Delete)">
        设备充值
      </el-button>
      <el-button type="primary" plain :icon="useRenderIcon(Delete)">
        转移套餐
      </el-button>
      <el-button type="primary" plain :icon="useRenderIcon(Delete)">
        设备停机
      </el-button>
      <el-button type="primary" plain :icon="useRenderIcon(Delete)">
        设备初始化
      </el-button>

      <el-dropdown style="margin: 15px 0 0 10px">
        <el-button type="primary" plain :icon="useRenderIcon(More)" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-button link type="primary" :icon="useRenderIcon(Delete)">
                设备入库
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button link type="primary" :icon="useRenderIcon(Delete)">
                设备分发
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <PureTableBar
      title=""
      :columns="columns"
      @refresh="onSearch"
      @fullscreen="onFullscreen"
    >
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          adaptive
          :adaptiveConfig="{ offsetBottom: 120 }"
          align-whole="center"
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          default-expand-all
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="{ ...pagination, size }"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
        >
          <template #operation="{ row }">
            <el-button
              v-if="hasPerms('permission:role:update')"
              class="reset-margin"
              link
              :type="row.parentId == 0 ? 'info' : 'primary'"
              :size="size"
              :icon="useRenderIcon(Delete)"
              :disabled="row.disabled"
            >
              编辑
            </el-button>
            <el-button
              v-if="hasPerms('permission:role:permission')"
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(Delete)"
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
</style>
