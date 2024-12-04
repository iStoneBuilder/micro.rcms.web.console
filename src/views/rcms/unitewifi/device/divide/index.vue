<!--
  设备分发说明
  1：当前商户下的数据
  2：未激活的设备才允许分发
  3：分发给下级商户
  4：清空销售设备组
-->
<template>
  <div>
    <div class="rcms-plus-page">
      <el-tabs>
        <el-tab-pane label="设备分发">
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
              adaptive: { offsetBottom: 80 },
              onSelectionChange: handleSelect
            }"
            :default-page-info="pageInfo"
            :default-page-size-list="[5, 15, 20, 50]"
          >
            <template #table-title>
              <el-row class="button-row">
                <el-button type="primary" plain :icon="useRenderIcon(Expand)">
                  选择分发
                </el-button>
              </el-row>
            </template>
          </PlusPage>
        </el-tab-pane>
        <el-tab-pane label="分发记录">Config</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { terminalManage } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getPageRecordList } from "@/api/mifi/terminal";
import type {
  PageInfo,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";
import Expand from "@iconify-icons/ep/expand";

const { pageInfo, loading, tableColumns, selectData } = terminalManage();
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
