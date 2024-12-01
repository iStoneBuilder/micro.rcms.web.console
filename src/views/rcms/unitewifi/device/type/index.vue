<template>
  <div>
    <div class="rcms-plus-page">
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
          actionBar: { buttons, width: 100, type: 'link' },
          onClickAction: handleOption,
          onSelectionChange: handleSelect
        }"
        :default-page-info="pageInfo"
        :default-page-size-list="[5, 15, 20, 50]"
      >
        <template #table-title>
          <el-row class="button-row">
            <el-button
              type="primary"
              plain
              :icon="Plus"
              @click="handleCreate()"
            >
              新增
            </el-button>
            <el-button
              type="danger"
              plain
              :icon="useRenderIcon(Delete)"
              @click="handleDelete"
            >
              删除
            </el-button>
          </el-row>
        </template>
      </PlusPage>
    </div>
    <PlusDialog
      v-if="show"
      v-model="show"
      :title="title + '设备类型'"
      :hasFooter="false"
      :showClose="false"
      width="500"
      top="5%"
    >
      <CreateForm :currentRow="currentRow" @createEvent="handleCreateBack" />
    </PlusDialog>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { terminalManage } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getTerminalPageList } from "@/api/mifi/terminal";
import type {
  PageInfo,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";

import { Plus } from "@element-plus/icons-vue";
import Delete from "@iconify-icons/ep/delete";

import CreateForm from "./form/create.vue";

const { pageInfo, loading, tableColumns, buttons, selectData } =
  terminalManage();
const plusPageInstance = ref<PlusPageInstance | null>(null);
async function getList(query: PageInfo) {
  console.log(query);
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getTerminalPageList(page, pageSize, params);
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
const title = ref("");
const currentRow = {};
function handleCreate(ops = "新增") {
  show.value = true;
  title.value = ops;
}
function handleCreateBack() {
  show.value = false;
  refresh();
}
function handleDelete() {}
</script>
