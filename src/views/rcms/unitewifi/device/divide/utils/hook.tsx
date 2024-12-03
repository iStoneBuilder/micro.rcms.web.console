import { ref } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { getBussList } from "@/api/rcms/common";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "设备SN",
      prop: "name",
      width: 200,
      align: "left",
      cellRenderer: ({ row, props }) => (
        <el-link size={props.size} style="color: var(--el-color-primary)">
          {row.name}
        </el-link>
      ),
      tableColumnProps: {
        fixed: true
      }
    },
    {
      label: "商户",
      prop: "name1",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "设备类型",
      prop: "name2",
      minWidth: 200,
      align: "left",
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/mifi/device-type/records",
        "typeName",
        "typeCode",
        {}
      )
    },
    {
      label: "入库批次",
      prop: "name3",
      minWidth: 200,
      align: "left"
    }
  ];
  return {
    pageInfo,
    loading,
    tableColumns,
    selectData
  };
}
