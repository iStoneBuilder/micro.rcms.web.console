<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert title="终端设备" type="success">
        <div class="alert-item">
          <p>
            ① 商户级数据，可以查看当前商户及下级商户数据；②
            只允许操作当前商户数据；③ 未激活设备允许删除
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
          actionBar: { buttons, width: 100, type: 'link' },
          onClickAction: handleOption,
          onSelectionChange: handleSelect
        }"
        :default-page-info="pageInfo"
        :default-page-size-list="[5, 15, 20, 50]"
      >
        <template #table-title>
          <el-row class="button-row">
            <el-popover
              v-for="(item, index) in barButton"
              :key="index"
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="item.content || item.name"
            >
              <template #reference>
                <el-button
                  :type="'primary'"
                  plain
                  :icon="useRenderIcon(item.icon)"
                  @click="handleDialog(item)"
                >
                  {{ item.name }}
                </el-button>
              </template>
            </el-popover>
          </el-row>
        </template>
      </PlusPage>
    </div>
    <PlusDialog
      v-if="show"
      v-model="show"
      :title="title"
      :hasFooter="false"
      :showClose="false"
      width="500"
      top="5%"
    >
      <ImportForm v-if="currForm === 'store'" @dialogEvent="handleCallBack" />
      <GroupForm
        v-if="currForm === 'group'"
        :currentRow="selectData"
        @dialogEvent="handleCallBack"
      />
      <ActiveForm
        v-if="currForm === 'active'"
        :currentRow="selectData"
        @dialogEvent="handleCallBack"
      />
      <ControlForm
        v-if="currForm === 'control'"
        :currentRow="selectData"
        @dialogEvent="handleCallBack"
      />
    </PlusDialog>
  </div>
</template>

<script lang="tsx" setup>
import { ref, defineOptions } from "vue";
import { terminalManage } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getPageRecordList } from "@/api/mifi/device-manage";
import type {
  PageInfo,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";

import ImportForm from "./form/import.vue";
import GroupForm from "./form/group.vue";
import ActiveForm from "./form/active.vue";
import ControlForm from "./form/control.vue";

import { message } from "@/utils/message";

defineOptions({
  name: "DeviceTerminal"
});

const { pageInfo, loading, tableColumns, buttons, selectData, barButton } =
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
      break;
    case "delete":
      break;
    case "setting":
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
const show = ref(false);
const title = ref("设备入库");
const currForm = ref("");
// 打开弹出框
function handleDialog(op) {
  title.value = op.name;
  currForm.value = op.code;
  if (op.isBatch !== undefined && selectData.value.length === 0) {
    message(`请至少选择一条数据！`, {
      type: "warning"
    });
    return;
  }
  if (op.isBatch === false && selectData.value.length > 1) {
    message(`当前操作不允许批量处理`, {
      type: "warning"
    });
    return;
  }
  show.value = true;
}
// -------- 列表相关操作 -------------
function handleCallBack(op) {
  show.value = false;
  if (op != "cancel") {
    refresh();
  }
}
</script>
