import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";
import { getBussList } from "@/api/rcms/common";
import { getTenantId } from "@/utils/common";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "租户名称",
      prop: "enterpriseId",
      minWidth: 180,
      align: "left",
      hideInForm: true,
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/base/enterprise/records",
        "name",
        "id",
        { id: getTenantId() }
      )
    },
    {
      label: "支付方式",
      prop: "dataPlanCost",
      minWidth: 100,
      align: "left",
      hideInSearch: true
    },
    {
      label: "状态",
      prop: "dataPlanPrice",
      minWidth: 100,
      align: "left",
      hideInSearch: true
    },
    {
      label: "渠道",
      prop: "dataPlanFlow",
      minWidth: 160,
      align: "left",
      hideInSearch: true
    },
    {
      label: "更新时间",
      prop: "dataPlanVoidFlow",
      minWidth: 160,
      align: "left",
      hideInSearch: true
    }
  ];
  const createColumns: PlusColumn[] = [
    {
      label: "支付方式",
      prop: "dataPlanCost"
    },
    {
      label: "渠道",
      prop: "dataPlanCost"
    },
    {
      label: "小程序AppId",
      prop: "dataPlanCost"
    },
    {
      label: "小程序app秘钥",
      prop: "dataPlanCost"
    },
    {
      label: "公众号appid",
      prop: "dataPlanCost"
    },
    {
      label: "公众号app秘钥",
      prop: "dataPlanCost"
    },
    {
      label: "微信支付商户ID",
      prop: "dataPlanCost"
    },
    {
      label: "微信支付V2秘钥",
      prop: "dataPlanCost"
    },
    {
      label: "微信支付V3秘钥",
      prop: "dataPlanCost"
    },
    {
      label: "微信支付证书序列号",
      prop: "dataPlanCost"
    },
    {
      label: "微信支付回调url",
      prop: "dataPlanCost",
      colProps: {
        span: 24
      }
    },
    {
      label: "微信退款回调url",
      prop: "dataPlanCost",
      colProps: {
        span: 24
      }
    },
    {
      label: "微信支付商户私钥",
      prop: "dataPlanCost"
    },
    {
      label: "微信支付商户证书",
      prop: "dataPlanCost"
    }
  ];
  const { buttons } = useTable();
  buttons.value = [
    {
      text: "编辑",
      code: "create",
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
    createColumns,
    buttons,
    selectData
  };
}
