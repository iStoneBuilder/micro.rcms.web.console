import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "订单号",
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
      label: "商品名",
      prop: "name1",
      width: 100,
      align: "left"
    },
    {
      label: "商户",
      prop: "name2",
      minWidth: 200,
      align: "left"
    },
    {
      label: "流水号",
      prop: "name3",
      minWidth: 100,
      align: "left"
    },
    {
      label: "商品类型",
      prop: "name4",
      minWidth: 100,
      align: "left"
    },
    {
      label: "设备SN",
      prop: "name5",
      minWidth: 100,
      align: "left"
    },
    {
      label: "支付方式",
      prop: "name6",
      minWidth: 100,
      align: "left"
    },
    {
      label: "购买数量",
      prop: "name7",
      minWidth: 100,
      align: "left"
    },
    {
      label: "总价格(¥)",
      prop: "name9",
      minWidth: 200,
      align: "left"
    },
    {
      label: "已退金额(¥)",
      prop: "name10",
      minWidth: 200,
      align: "left"
    },
    {
      label: "订单状态",
      prop: "name11",
      minWidth: 100,
      align: "left"
    },
    {
      label: "退款状态",
      prop: "name12",
      minWidth: 100,
      align: "left"
    },
    {
      label: "下单时间",
      prop: "name12",
      minWidth: 100,
      align: "left"
    },
    {
      label: "支付时间",
      prop: "name12",
      minWidth: 100,
      align: "left"
    },
    {
      label: "下单人",
      prop: "name12",
      minWidth: 100,
      align: "left"
    }
  ];
  const { buttons } = useTable();
  buttons.value = [
    {
      text: "申请退款",
      code: "update",
      props: { type: "primary", plain: true }
    },
    {
      text: "详情",
      code: "detail",
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
