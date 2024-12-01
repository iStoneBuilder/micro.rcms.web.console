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
      label: "IMEI",
      prop: "name1",
      width: 200,
      align: "left"
    },
    {
      label: "上网模式",
      prop: "name2",
      minWidth: 200,
      align: "left"
    },
    {
      label: "在线?",
      prop: "name3",
      minWidth: 100,
      align: "left"
    },
    {
      label: "商户",
      prop: "name4",
      minWidth: 200,
      align: "left"
    },
    {
      label: "设备类型",
      prop: "name5",
      minWidth: 200,
      align: "left"
    },
    {
      label: "设备组",
      prop: "name6",
      minWidth: 200,
      align: "left"
    },
    {
      label: "选卡策略",
      prop: "name7",
      minWidth: 200,
      align: "left"
    },
    {
      label: "流量模式",
      prop: "name9",
      minWidth: 200,
      align: "left"
    },
    {
      label: "入库批次号",
      prop: "name10",
      minWidth: 200,
      align: "left"
    },
    {
      label: "检测状态",
      prop: "name11",
      minWidth: 200,
      align: "left"
    },
    {
      label: "设备状态",
      prop: "name12",
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
