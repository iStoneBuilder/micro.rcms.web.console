<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert title="套餐订单" type="success" :closable="false">
        <div class="alert-item">
          <p>
            ① 商户级数据,允许查看当前商户及下级商户数据； ② 禁止跨商户操作数据;
            ③ 已申请退款的订单不允许重复申请
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
          actionBar: { buttons, width: 90, type: 'link' },
          onClickAction: handleOption,
          onSelectionChange: handleSelect
        }"
        :default-page-info="pageInfo"
        :default-page-size-list="[5, 15, 20, 50]"
      />
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { terminalManage } from "./utils/hook";
import { getPageRecordList } from "@/api/rcms/fram-common";
import type {
  PageInfo,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";

const { pageInfo, loading, tableColumns, buttons, selectData } =
  terminalManage();
const plusPageInstance = ref<PlusPageInstance | null>(null);
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getPageRecordList("pay/order", page, pageSize, params);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  data.data.push({ orderNo: "MS20192993994959" });
  return { data: data.data, success: true, total: data.meta.totalRows };
}
// 列表按钮
const handleOption = ({ row, buttonRow }: ButtonsCallBackParams): void => {
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
</script>
