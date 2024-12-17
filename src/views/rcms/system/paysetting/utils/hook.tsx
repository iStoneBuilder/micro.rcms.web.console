import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";
import { getBussList, getItemList } from "@/api/rcms/fram-common";
import { getTenantId, getEType, getEnterpriseId } from "@/utils/common";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const isPlatform = getEType() === "platform";
  const tableColumns: PlusColumn[] = [
    {
      label: "支付方式",
      prop: "payWay",
      width: 100,
      align: "left",
      hideInSearch: true,
      valueType: "select",
      options: getItemList("RCMS_SYS_PAYWAY")
    },
    {
      label: "渠道",
      prop: "payType",
      minWidth: 160,
      align: "left",
      hideInSearch: true,
      valueType: "select",
      options: getItemList("RCMS_SYS_CHANNEL"),
      fieldProps: {
        multiple: true
      }
    },
    {
      label: "租户名称",
      prop: "enterpriseId",
      minWidth: 180,
      align: "left",
      hideInForm: true,
      valueType: "select",
      options: getBussList(
        `/test/services/api/base/enterprise/records${isPlatform ? "/list" : ""}`,
        "name",
        "id",
        isPlatform ? { parentId: getEnterpriseId() } : { id: getTenantId() }
      )
    },
    {
      label: "更新时间",
      prop: "updateDate",
      width: 160,
      align: "left",
      valueType: "date-picker",
      hideInSearch: true
    }
  ];
  const createColumns: PlusColumn[] = [
    {
      label: "支付方式",
      prop: "payWay",
      valueType: "select",
      options: getItemList("RCMS_SYS_PAYWAY")
    },
    {
      label: "渠道",
      prop: "payType",
      valueType: "select",
      options: getItemList("RCMS_SYS_CHANNEL"),
      fieldProps: {
        multiple: true
      }
    },
    {
      label: "小程序appid",
      prop: "miniAppId"
    },
    {
      label: "小程序app秘钥",
      prop: "miniAppSecret"
    },
    {
      label: "公众号appid",
      prop: "publicAppId"
    },
    {
      label: "公众号app秘钥",
      prop: "publicAppSecret"
    },
    {
      label: "支付商户ID",
      prop: "mchId"
    },
    {
      label: "支付V2秘钥",
      prop: "payV2Key"
    },
    {
      label: "支付V3秘钥",
      prop: "payV3Key"
    },
    {
      label: "支付证书序列号",
      prop: "mchSerialNumber"
    },
    {
      label: "支付商户私钥",
      prop: "payPrivateKey"
    },
    {
      label: "支付商户证书",
      prop: "payCert"
    },
    {
      label: "支付回调url",
      prop: "notifyUrl",
      colProps: {
        span: 24
      }
    },
    {
      label: "退款回调url",
      prop: "refundNotifyUrl",
      colProps: {
        span: 24
      }
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
