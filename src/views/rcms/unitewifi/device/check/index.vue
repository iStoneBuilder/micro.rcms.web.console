<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert title="设备诊断" type="success" :closable="false">
        <div class="alert-item">
          <P>
            如果所有指标都正常，但设备仍然无法上网，
            建议对设备进行复位后重试。仍无法正常上网再联系工程师支持解决!
          </P>
        </div>
      </el-alert>
      <el-tabs>
        <el-tab-pane label="设备诊断">
          <PlusPage
            ref="plusPageInstance"
            class="rcms-plus-tab"
            :columns="tableColumns"
            :request="getList"
            :search="false"
            :table="{
              isSelection: false,
              adaptive: { offsetBottom: 80 },
              actionBar: { buttons, width: 100, type: 'link' },
              onClickAction: handleOption,
              onSelectionChange: handleSelect
            }"
            :default-page-info="pageInfo"
            :default-page-size-list="[5, 15, 20, 50]"
          >
            <template #table-title>
              <div class="rcms-table-form">
                <el-input
                  clearable
                  size="large"
                  placeholder="请输入设备SN"
                  style="width: 240px"
                />
                <el-button type="primary" size="large" plain>
                  一键诊断
                </el-button>
              </div>
            </template>
          </PlusPage>
        </el-tab-pane>
        <el-tab-pane label="诊断项配置"> 配置 </el-tab-pane>
      </el-tabs>
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
      <CreateForm :currentRow="currentRow" @dialogEvent="handleCreateBack" />
    </PlusDialog>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { terminalManage } from "./utils/hook";
import { deleteRecord, getPageRecordList } from "@/api/mifi/device-type";
import type {
  PageInfo,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";

import CreateForm from "./form/create.vue";

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
  switch (buttonRow.code) {
    case "update":
      currentRow.value = row;
      handleCreate("编辑");
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
function handleCreate(ops = "新增") {
  show.value = true;
  title.value = ops;
}
function handleCreateBack(op) {
  show.value = false;
  currentRow.value = null;
  if (op === "submit") {
    refresh();
  }
}

const handleDelete = async (row): Promise<void> => {
  ElMessageBox.confirm(
    `你确定删除（${row.typeName}）数据吗，确认是否继续?`,
    "温馨提示",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      draggable: true
    }
  )
    .then(async () => {
      await deleteRecord(row?.typeId);
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
