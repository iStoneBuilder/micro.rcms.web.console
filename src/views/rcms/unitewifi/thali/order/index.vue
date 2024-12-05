<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert title="套餐订单" type="success">
        <div class="alert-item">
          <p>
            商户级数据；允许查看当前商户及下级商户数据；禁止跨商户操作数据。
          </p>
        </div>
      </el-alert>
      <PlusPage
        ref="plusPageInstance"
        :columns="tableColumns"
        :request="getList"
        :search="{
          labelWidth: '100px',
          colProps: { span: 6 },
          showNumber: 3
        }"
        :table="{
          isSelection: true,
          adaptive: { offsetBottom: 70 },
          actionBar: { buttons, width: 140, type: 'link' },
          onClickAction: handleOption,
          onSelectionChange: handleSelect
        }"
        :default-page-info="pageInfo"
        :default-page-size-list="[5, 15, 20, 50]"
      />
    </div>
    <PlusDialog
      v-if="show"
      v-model="show"
      :title="'订单详情'"
      :hasFooter="false"
      :showClose="true"
      width="800"
      top="5%"
    >
      <DetailForm
        :currentRow="currentRow"
        :tableColumns="tableColumns"
        @dialogEvent="handleViewBack"
      />
    </PlusDialog>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { terminalManage } from "./utils/hook";
import { getPageRecordList } from "@/api/mifi/terminal";
import type {
  PageInfo,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";

import DetailForm from "./form/detail.vue";

const { pageInfo, loading, tableColumns, buttons, selectData } =
  terminalManage();
const plusPageInstance = ref<PlusPageInstance | null>(null);
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getPageRecordList(page, pageSize, params);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
}
// 列表按钮
const handleOption = ({ row, buttonRow }: ButtonsCallBackParams): void => {
  console.log(row);
  switch (buttonRow.code) {
    case "update":
      break;
    case "delete":
      break;
    case "detail":
      handleViewOpen(row);
      break;
  }
  refresh();
};
const handleSelect = (data: any) => {
  selectData.value = data;
};
const refresh = () => {
  plusPageInstance.value?.getList();
};
// -------- 列表相关操作 -------------
const show = ref(false);
const currentRow = ref(null);
function handleViewOpen(row) {
  currentRow.value = row;
  show.value = true;
}
function handleViewBack() {
  show.value = false;
}
</script>
