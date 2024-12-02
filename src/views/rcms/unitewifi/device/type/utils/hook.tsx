import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";
import { getItemList } from "@/api/rcms/common";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "类型名称",
      prop: "typeName",
      width: 200,
      align: "left",
      cellRenderer: ({ row, props }) => (
        <el-link size={props.size} style="color: var(--el-color-primary)">
          {row.name}
        </el-link>
      )
    },
    {
      label: "类型编号",
      prop: "typeCode",
      width: 200,
      align: "left"
    },
    {
      label: "销售名称",
      prop: "sellName",
      minWidth: 200,
      align: "left"
    },
    {
      label: "设备型号",
      prop: "deviceNo",
      minWidth: 100,
      align: "left",
      valueType: "select",
      options: getItemList("MIFI_DEVICE_NO")
    },
    {
      label: "本地卡模式",
      prop: "localCardMode",
      minWidth: 100,
      align: "left",
      valueType: "select",
      options: getItemList("MIFI_CARD_MODE")
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 100,
      align: "left",
      valueType: "select",
      options: getItemList("MIFI_TYPE_STATUS")
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 200,
      align: "left"
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
