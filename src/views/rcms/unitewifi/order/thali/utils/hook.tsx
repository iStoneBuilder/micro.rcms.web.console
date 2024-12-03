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
      prop: "packageName",
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
      prop: "packageNo",
      width: 100,
      align: "left",
      hideInForm: true
    },
    {
      label: "所属商户",
      prop: "enterpriseId",
      minWidth: 160,
      align: "left",
      hideInForm: true
    },
    {
      label: "成本价格(¥)",
      prop: "packageCost",
      minWidth: 100,
      align: "left",
      hideInTable: true,
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 2, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "套餐价格(¥)",
      prop: "packagePrice",
      minWidth: 100,
      align: "left",
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 2, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "套餐总流量(GB)",
      prop: "packageFlow",
      minWidth: 160,
      align: "left",
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "套餐虚量(GB)",
      prop: "packageVoidFlow",
      minWidth: 160,
      align: "left",
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "计费类型",
      prop: "chargeType",
      minWidth: 90,
      align: "left",
      valueType: "select",
      options: getItemList("MIFI_CHARGE_TYPE")
    },
    {
      label: "有效时长",
      prop: "validDuration",
      minWidth: 90,
      align: "left",
      hideInSearch: true,
      valueType: "select",
      options: getItemList("MIFI_CHARGE_TIME")
    },
    {
      label: "是否限速",
      prop: "limitSpeed",
      minWidth: 90,
      align: "left",
      valueType: "select",
      options: getItemList("RCMS_SYS_YN")
    },
    {
      label: "赠送月份",
      prop: "giftDuration",
      minWidth: 90,
      align: "left",
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "是否上架",
      prop: "isSale",
      minWidth: 90,
      align: "left",
      valueType: "select",
      options: getItemList("RCMS_SYS_YN")
    },
    {
      label: "限制购买次数",
      prop: "limitNo",
      minWidth: 130,
      align: "left",
      tooltip: "设置为0时不限制购买次数",
      hideInSearch: true,
      valueType: "input-number",
      fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 }
    },
    {
      label: "是否赠送",
      prop: "isGift",
      minWidth: 90,
      align: "left",
      valueType: "select",
      options: getItemList("RCMS_SYS_YN")
    },
    {
      label: "套餐组",
      prop: "packageGroup",
      width: 100,
      align: "left"
    },
    {
      label: "是否推荐",
      prop: "isRecommend",
      width: 100,
      align: "left",
      hideInTable: true,
      hideInSearch: true,
      valueType: "select",
      options: getItemList("RCMS_SYS_YN")
    },
    {
      label: "排序",
      prop: "sort",
      width: 60,
      align: "left",
      valueType: "input-number",
      fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 }
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
