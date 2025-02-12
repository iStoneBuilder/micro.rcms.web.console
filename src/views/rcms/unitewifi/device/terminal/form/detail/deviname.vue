<template>
  <div class="rcms-plus-page">
    <PlusPage
      ref="plusPageInstance"
      :columns="tableColumns"
      :request="getList"
      :search="false"
      :table="{
        isSelection: false,
        adaptive: { offsetBottom: 355 },
        actionBar: { buttons, width: 150, type: 'link', showNumber: 4 },
        onClickAction: handleTableOption
      }"
      :default-page-info="pageInfo"
      :default-page-size-list="[5, 15, 20, 50]"
    />
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type {
  ButtonsCallBackParams,
  PageInfo,
  PlusColumn,
  PlusPageInstance
} from "plus-pro-components";
import { getItemList, getPageRecordList } from "@/api/rcms/fram-common";
import { useRoute } from "vue-router";
import { syncDeviceSimName } from "@/api/mifi/device-name";
const { pageInfo } = useTable<Array<any>>();
const loading = ref(false);
const tableColumns: PlusColumn[] = [
  {
    label: "实名用户",
    prop: "realName",
    hideInSearch: true,
    minWidth: 200
  },
  {
    label: "ICCID",
    prop: "iccid",
    hideInSearch: true,
    minWidth: 200
  },
  {
    label: "认证方式",
    prop: "authWay",
    minWidth: 100,
    hideInSearch: true,
    valueType: "select",
    options: getItemList("MIFI_AUTH_WAY")
  },
  {
    label: "认证状态",
    prop: "authStatus",
    minWidth: 100,
    hideInSearch: true,
    valueType: "select",
    options: getItemList("MIFI_NAME_STATUS"),
    tableColumnProps: {
      align: "center"
    }
  },
  {
    label: "认证申请时间",
    prop: "authApplyTime",
    minWidth: 160,
    hideInSearch: true,
    valueType: "date-picker"
  },
  {
    label: "认证通过时间",
    prop: "authPassTime",
    minWidth: 160,
    hideInSearch: true,
    valueType: "date-picker"
  }
];
const route = useRoute();
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  params["deviceSn"] = route.query.deviceSn;
  const { data } = await getPageRecordList(
    "mifi-device/device-name",
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
const { buttons } = useTable();
buttons.value = [
  {
    text: "实名同步",
    code: "sync",
    props: { type: "primary", plain: true }
  },
  {
    text: "清除实名",
    code: "clean",
    props: { type: "danger", plain: true }
  }
];
const plusPageInstance = ref<PlusPageInstance | null>(null);
const refresh = () => {
  plusPageInstance.value?.getList();
};
// 列表按钮
const handleTableOption = async ({
  row,
  buttonRow
}: ButtonsCallBackParams): Promise<void> => {
  switch (buttonRow.code) {
    case "sync":
      await syncDeviceSimName(row.iccid, row);
      break;
    case "clean":
      break;
  }
  refresh();
};
</script>
