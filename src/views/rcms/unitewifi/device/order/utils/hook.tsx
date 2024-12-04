import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "设备SN",
      prop: "deviceSn",
      width: 200,
      tableColumnProps: {
        fixed: true
      }
    },
    {
      label: "套餐名称",
      prop: "dataPlanRules",
      width: 300
    },
    {
      label: "剩余流量(MB)",
      prop: "dataPlanRules",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "当前已用流量(MB)",
      prop: "dataPlanRules",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "总计已用流量(MB)",
      prop: "dataPlanRules",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "生效时间",
      prop: "dataPlanRules",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "过期时间",
      prop: "dataPlanRules",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "是否限速",
      prop: "dataPlanRules",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "限速值(Kbps)",
      prop: "dataPlanRules",
      minWidth: 200,
      hideInSearch: true
    }
  ];
  const { buttons } = useTable();
  buttons.value = [
    {
      text: "编辑",
      code: "update",
      props: { type: "primary", plain: true }
    },
    {
      text: "删除",
      code: "delete",
      props: { type: "danger", plain: true }
    }
  ];
  return {
    pageInfo,
    loading,
    tableColumns,
    buttons,
    selectData
  };
}
