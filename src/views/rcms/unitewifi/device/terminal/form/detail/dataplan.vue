<template>
  <PlusPage
    :loadingStatus="loading"
    :columns="tableColumns"
    :request="getList"
    :search="false"
    :table="{
      showOverflowTooltip: true,
      isSelection: false,
      adaptive: { offsetBottom: 330 }
    }"
    :default-page-info="pageInfo"
    :default-page-size-list="[5, 15, 20, 50]"
  />
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import type { PageInfo, PlusColumn } from "plus-pro-components";
import {
  getBussList,
  getItemList,
  getPageRecordList
} from "@/api/rcms/fram-common";
import { getTenantId } from "@/utils/common";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";
import DetailForm from "../../../thali/form/detail.vue";

const loading = ref(false);
const pageInfo = { page: 1, pageSize: 15 };
const tableColumns: PlusColumn[] = [
  {
    label: "套餐ID",
    prop: "dpOrderId",
    width: 160,
    tableColumnProps: {
      fixed: true,
      showOverflowTooltip: true
    },
    render: (value, { row }) => {
      return (
        <el-link
          style="color: var(--el-color-primary)"
          onClick={() => {
            addDrawer({
              title: "套餐详情",
              size: "50%",
              class: "rcms-drawer",
              contentRenderer: ({}) => (
                <DetailForm currentRow={row} tableColumns={tableColumns} />
              ),
              footerButtons: [
                {
                  label: "关闭",
                  size: "default",
                  type: "primary",
                  plain: true,
                  btnClick: ({ drawer: { options, index } }) => {
                    closeDrawer(options, index);
                  }
                }
              ]
            });
          }}
        >
          {value}
        </el-link>
      );
    }
  },
  {
    label: "套餐名称",
    prop: "dataPlanNo",
    width: 200,
    valueType: "select",
    options: getBussList(
      "/test/services/rcms/mifi/data-plan/records",
      "dataPlanName",
      "dataPlanNo",
      { id: getTenantId() }
    ),
    tableColumnProps: {
      fixed: true
    }
  },
  {
    label: "剩余流量(MB)",
    prop: "remainFlow",
    minWidth: 120,
    valueType: "input-number",
    fieldProps: { precision: 2 },
    hideInSearch: true
  },
  {
    label: "当前已用流量(MB)",
    prop: "usedFlow",
    minWidth: 140,
    valueType: "input-number",
    fieldProps: { precision: 2 },
    hideInSearch: true
  },
  {
    label: "总共已用流量(MB)",
    prop: "totalUsedFlow",
    minWidth: 140,
    valueType: "input-number",
    fieldProps: { precision: 2 },
    hideInSearch: true
  },
  {
    label: "生效时间",
    prop: "effectiveTime",
    valueType: "date-picker",
    minWidth: 160,
    hideInSearch: true
  },
  {
    label: "过期时间",
    prop: "expireTime",
    minWidth: 160,
    valueType: "date-picker",
    hideInSearch: true
  },
  {
    label: "是否限速",
    prop: "isLimitSpeed",
    minWidth: 90,
    hideInSearch: true,
    valueType: "select",
    options: getItemList("RCMS_SYS_YN")
  },
  {
    label: "限速值(Kbps)",
    prop: "limitSpeed",
    minWidth: 120,
    hideInSearch: true
  },
  {
    label: "是否可用",
    prop: "isAvailable",
    minWidth: 90,
    hideInSearch: true,
    valueType: "select",
    options: getItemList("RCMS_SYS_YN")
  },
  {
    label: "设备SN",
    prop: "deviceSn",
    width: 200,
    hideInSearch: true,
    hideInTable: true
  },
  {
    label: "订单号",
    prop: "orderNo",
    minWidth: 100,
    hideInSearch: true,
    hideInTable: true
  }
];
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getPageRecordList(
    "mifi/device-data-plan",
    page,
    pageSize,
    params
  );
  return { data: data.data, success: true, total: data.meta.totalRows };
}
</script>
