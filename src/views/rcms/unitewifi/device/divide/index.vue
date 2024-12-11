<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert title="设备分发" type="success" :closable="false">
        <div class="alert-item">
          <p>
            ① 商户级数据，只允许查看、分发当前商户数据到下级商户； ②
            分发数据时清空分发设备的设备分组、修改设备关联的ICCID的商户信息。
          </p>
        </div>
      </el-alert>
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
        <el-tab-pane label="分发记录">
          <PlusPage
            ref="plusPageInstance"
            :columns="divideColumns"
            :request="getList"
            :search="{
              labelWidth: '100px',
              colProps: { span: 6 },
              showNumber: 3
            }"
            :table="{
              isSelection: true,
              adaptive: { offsetBottom: 450 },
              onSelectionChange: handleSelect
            }"
            :default-page-info="pageInfo"
            :default-page-size-list="[5, 15, 20, 50]"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { terminalManage } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getPageRecordList } from "@/api/rcms/fram-common";
import type { PageInfo, PlusPageInstance } from "plus-pro-components";
import Expand from "@iconify-icons/ep/expand";
import { getEnterpriseId } from "@/utils/common";

const { pageInfo, loading, tableColumns, divideColumns, selectData } =
  terminalManage();
const plusPageInstance = ref<PlusPageInstance | null>(null);
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  params["activeStatus"] = "N";
  params["enterpriseId"] = getEnterpriseId();
  const { data } = await getPageRecordList(
    "mifi/device-manage",
    page,
    pageSize,
    params
  );
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
}
const handleSelect = (data: any) => {
  selectData.value = data;
};
const refresh = () => {
  plusPageInstance.value?.getList();
};
// -------- 列表相关操作 -------------
</script>
