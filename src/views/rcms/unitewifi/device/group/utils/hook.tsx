import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";
import { getBussList } from "@/api/rcms/fram-common";
import { getTenantId } from "@/utils/common";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "设备组",
      prop: "groupName",
      width: 200,
      align: "left"
    },
    {
      label: "编号",
      prop: "groupId",
      width: 200,
      align: "left"
    },
    {
      label: "商户",
      prop: "enterpriseId",
      minWidth: 200,
      align: "left",
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/base/enterprise/records",
        "name",
        "id",
        { id: getTenantId() }
      )
    },
    {
      label: "备注",
      prop: "remark",
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
