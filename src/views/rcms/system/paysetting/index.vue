<!--
套餐配置
-->
<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert title="支付配置" type="success" :closable="false">
        <div class="alert-item">
          <p>① 企业级数据，商户不允许配置查看该数据</p>
        </div>
      </el-alert>
      <PlusPage
        ref="plusPageInstance"
        :columns="tableColumns"
        :request="getList"
        :search="false"
        :table="{
          isSelection: false,
          adaptive: { offsetBottom: 70 },
          actionBar: {
            buttons,
            width: 100,
            type: 'link',
            showNumber: 4,
            align: 'center'
          },
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
              @click="handleCreate({ text: '新增', code: 'create' })"
            >
              新增
            </el-button>
          </el-row>
        </template>
      </PlusPage>
    </div>
    <PlusDialog
      v-if="show"
      v-model="show"
      :title="'支付配置-' + title"
      :hasFooter="false"
      :showClose="currForm === 'sellShow'"
      :width="dWidth"
      top="5%"
    >
      <CreateForm
        v-if="currForm === 'create'"
        :currentRow="currentRow"
        :createColumns="createColumns"
        @dialogEvent="handleCreateBack"
      />
    </PlusDialog>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { terminalManage } from "./utils/hook";
import { deleteRecord, getPageRecordList } from "@/api/rcms/fram-common";
import type {
  PageInfo,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";

import { Plus } from "@element-plus/icons-vue";

import CreateForm from "./form/create.vue";

const service = "base/pay-config";
const { pageInfo, loading, tableColumns, createColumns, buttons, selectData } =
  terminalManage();

const dWidth = ref("800");
const plusPageInstance = ref<PlusPageInstance | null>(null);
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getPageRecordList(service, page, pageSize, params);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
}
// 列表按钮
const handleOption = ({ row, buttonRow }: ButtonsCallBackParams): void => {
  switch (buttonRow.code) {
    case "create":
      currentRow.value = row;
      handleCreate(buttonRow);
      break;
    case "delete":
      handleDelete(row);
      break;
  }
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
const currentRow = ref(null);
const currForm = ref("create");
function handleCreate(btn, dwt?: string) {
  currForm.value = btn.code;
  dWidth.value = dwt || "880";
  title.value = btn.text;
  show.value = true;
}
function handleCreateBack(op) {
  show.value = false;
  currentRow.value = null;
  if (op === "submit") {
    refresh();
  }
}

const handleDelete = async (row): Promise<void> => {
  ElMessageBox.confirm(`你确定删除该数据吗，确认是否继续?`, "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true
  })
    .then(async () => {
      await deleteRecord(service, row?.payConfigId);
      message(`删除成功！`, {
        type: "success"
      });
      refresh();
    })
    .catch(error => {
      console.log(error);
    });
};
</script>
