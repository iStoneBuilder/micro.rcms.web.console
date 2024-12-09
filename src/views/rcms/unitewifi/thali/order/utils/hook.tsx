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
      prop: "orderNo",
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
      prop: "productName",
      width: 100,
      align: "left"
    },
    {
      label: "商户",
      prop: "enterpriseId",
      minWidth: 200,
      align: "left"
    },
    {
      label: "流水号",
      prop: "transactionId",
      minWidth: 300,
      align: "left"
    },
    {
      label: "商品类型",
      prop: "productType",
      minWidth: 100,
      align: "left"
    },
    {
      label: "设备SN",
      prop: "deviceSn",
      minWidth: 150,
      align: "left"
    },
    {
      label: "支付方式",
      prop: "payType",
      minWidth: 100,
      align: "left",
      hideInSearch: true
    },
    {
      label: "购买数量",
      prop: "buyNum",
      minWidth: 100,
      align: "left",
      hideInSearch: true
    },
    {
      label: "总价格(¥)",
      prop: "orderAmount",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "已退金额(¥)",
      prop: "refundAmount",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "订单状态",
      prop: "orderStatus",
      minWidth: 100,
      align: "left"
    },
    {
      label: "退款状态",
      prop: "refundStatus",
      minWidth: 100,
      align: "left"
    },
    {
      label: "下单时间",
      prop: "orderTime",
      minWidth: 100,
      align: "left",
      hideInSearch: true
    },
    {
      label: "支付时间",
      prop: "payTime",
      minWidth: 100,
      align: "left",
      hideInSearch: true
    },
    {
      label: "下单人",
      prop: "payBy",
      minWidth: 100,
      align: "left",
      hideInSearch: true
    }
  ];
  const { buttons } = useTable();
  buttons.value = [
    {
      text: "申请退款",
      code: "update",
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
