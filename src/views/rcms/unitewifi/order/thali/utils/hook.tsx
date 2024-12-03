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
      label: "套餐名",
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
      label: "套餐编号",
      prop: "name1",
      width: 100,
      align: "left",
      hideInForm: true
    },
    {
      label: "所属商户",
      prop: "name2",
      minWidth: 160,
      align: "left",
      hideInForm: true
    },
    {
      label: "成本价格(¥)",
      prop: "name3",
      minWidth: 100,
      align: "left",
      hideInTable: true,
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 2, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "套餐价格(¥)",
      prop: "name3",
      minWidth: 100,
      align: "left",
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 2, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "套餐总流量(GB)",
      prop: "name5",
      minWidth: 160,
      align: "left",
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "套餐虚量(GB)",
      prop: "name5",
      minWidth: 160,
      align: "left",
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "计费类型",
      prop: "name4",
      minWidth: 90,
      align: "left",
      valueType: "select",
      options: getItemList("MIFI_CHARGE_TYPE")
    },
    {
      label: "有效时长",
      prop: "name7",
      minWidth: 90,
      align: "left",
      hideInSearch: true,
      valueType: "select",
      options: getItemList("MIFI_CHARGE_TIME")
    },
    {
      label: "是否限速",
      prop: "name6",
      minWidth: 90,
      align: "left",
      valueType: "select",
      options: getItemList("RCMS_SYS_YN")
    },
    {
      label: "赠送月份",
      prop: "name9",
      minWidth: 90,
      align: "left",
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "是否上架",
      prop: "name10",
      minWidth: 90,
      align: "left",
      valueType: "select",
      options: getItemList("RCMS_SYS_YN")
    },
    {
      label: "限制购买次数",
      prop: "name11",
      minWidth: 120,
      align: "left",
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "是否赠送",
      prop: "name12",
      minWidth: 90,
      align: "left",
      valueType: "select",
      options: getItemList("RCMS_SYS_YN")
    },
    {
      label: "套餐组",
      prop: "name1",
      width: 100,
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
    },
    {
      text: "售卖范围",
      code: "setting",
      props: { type: "primary", plain: true }
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
