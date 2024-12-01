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
            <el-button type="danger" plain :icon="useRenderIcon(Delete)">
              删除
            </el-button>
            <el-button type="primary" plain :icon="useRenderIcon(Device)">
              设备分组
            </el-button>
            <el-button type="primary" plain :icon="useRenderIcon(Active)">
              设备激活
            </el-button>
            <el-button type="primary" plain :icon="useRenderIcon(Pointer)">
              设备控制
            </el-button>
            <el-button type="primary" plain :icon="useRenderIcon(Wallet)">
              设备充值
            </el-button>
            <el-button type="primary" plain :icon="useRenderIcon(Transform)">
              转移套餐
            </el-button>
            <el-button type="primary" plain :icon="useRenderIcon(ShutDown)">
              设备停机
            </el-button>
            <el-button type="primary" plain :icon="useRenderIcon(InitInstall)">
              设备初始化
            </el-button>
          </el-row>
        </template>
      </PlusPage>
    </div>
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
import Delete from "@iconify-icons/ep/delete";
import More from "@iconify-icons/ep/more-filled";
import Device from "@iconify-icons/ep/cellphone";
import Active from "@iconify-icons/ep/coin";
import Pointer from "@iconify-icons/ep/pointer";
import Wallet from "@iconify-icons/ep/wallet";
import Transform from "@iconify-icons/ep/bottom-right";
import ShutDown from "@iconify-icons/ri/shut-down-line";
import InitInstall from "@iconify-icons/ri/install-line";

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
// -------- 列表相关操作 -------------
</script>
