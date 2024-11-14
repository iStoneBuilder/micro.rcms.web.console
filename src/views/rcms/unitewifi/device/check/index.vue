<script setup lang="ts">
import { ref } from "vue";
import { hasPerms } from "@/utils/auth";
import { userManage } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";

defineOptions({
  name: "UserManage"
});

function onFullscreen() {
  // 重置表格高度
  tableRef.value.setAdaptive();
}

const tableRef = ref();
const form = ref({ sn: "" });
const {
  loading,
  columns,
  pagination,
  dataList,
  onSearch,
  viewDetail,
  handleDelete
} = userManage();
</script>

<template>
  <div class="main rcms-main">
    <div class="rcms-alert">
      <el-alert
        title="温馨提示：如果所有指标都正常，但设备仍然无法上网，建议对设备进行复位后重试。仍无法正常上网再联系工程师支持解决!"
        type="error"
        :closable="false"
      />
    </div>
    <div class="rcms-table-form">
      <el-input
        v-model="form.sn"
        clearable
        size="large"
        placeholder="请输入设备SN"
        style="width: 240px"
      />
      <el-button type="primary" size="large"> 一键诊断 </el-button>
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
              详情
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
