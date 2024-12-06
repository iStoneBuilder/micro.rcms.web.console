import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "诊断项",
      prop: "name",
      width: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "诊断结果",
      prop: "name",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "是否正常",
      prop: "name",
      width: 100,
      align: "left",
      hideInSearch: true
    },
    {
      label: "处理意见",
      prop: "name",
      minWidth: 200,
      align: "left",
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
