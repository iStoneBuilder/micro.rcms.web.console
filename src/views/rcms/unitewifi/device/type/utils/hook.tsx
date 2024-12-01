import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "类型名称",
      prop: "name",
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
      prop: "name1",
      width: 200,
      align: "left"
    },
    {
      label: "销售名称",
      prop: "name2",
      minWidth: 200,
      align: "left"
    },
    {
      label: "设备型号",
      prop: "name3",
      minWidth: 100,
      align: "left"
    },
    {
      label: "本地卡模式",
      prop: "name4",
      minWidth: 100,
      align: "left"
    },
    {
      label: "状态",
      prop: "name5",
      minWidth: 100,
      align: "left"
    },
    {
      label: "备注",
      prop: "name6",
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
