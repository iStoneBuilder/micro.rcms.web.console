import type { PlusColumn } from "plus-pro-components";
import type { FormRules } from "element-plus";
import { getItemList, getBussList } from "@/api/rcms/common";
import { getTenantId } from "@/utils/common";

export const defaultPageInfo = {
  page: 1,
  pageSize: 15
};
export function buildColum() {
  const columns: PlusColumn[] = [
    {
      label: "iccid",
      prop: "iccid",
      width: 200,
      align: "left",
      render(value) {
        return <el-link type="primary">{value}</el-link>;
      },
      tableColumnProps: {
        fixed: true
      }
    },
    {
      label: "商户",
      prop: "enterpriseId",
      minWidth: 200,
      align: "left",
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/base/enterprise/records",
        "name",
        "id",
        { id: getTenantId() }
      )
    },
    {
      label: "卡商",
      prop: "merchantCode",
      minWidth: 100,
      align: "left",
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/mifi/merchant/records",
        "merchantName",
        "merchantCode"
      )
    },
    {
      label: "使用设备",
      prop: "deviceSn",
      minWidth: 200,
      align: "left"
    },
    {
      label: "运营商",
      prop: "carrierCode",
      minWidth: 100,
      align: "left",
      hideInSearch: true,
      valueType: "select",
      options: getItemList("MIFI_ISP"),
      tableColumnProps: {
        align: "center"
      }
    },
    {
      label: "剩余流量",
      prop: "flowRemain",
      minWidth: 200,
      align: "left",
      hideInSearch: true,
      hideInForm: true
    },
    {
      label: "网络类型",
      prop: "netType",
      minWidth: 100,
      align: "left",
      hideInSearch: true,
      tableColumnProps: {
        align: "center"
      }
    },
    {
      label: "流量状态",
      prop: "flowStatus",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "在线状态",
      prop: "onlineStatus",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "实名状态",
      prop: "nameStatus",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "SIM卡分类",
      prop: "simType",
      minWidth: 100,
      align: "left",
      hideInSearch: true,
      render(value) {
        return (
          <el-tag type="primary">{value === "Y" ? "本地卡" : "外置卡"}</el-tag>
        );
      }
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 300,
      align: "left",
      hideInSearch: true,
      valueType: "textarea",
      colProps: {
        span: 22
      }
    }
  ];
  return columns;
}
export interface State {
  /**
   * 表单弹窗是否可见
   */
  visible: boolean;
  /**
   *  提交loading
   */
  loading: boolean;
  /**
   * 是否是创建
   */
  isCreate: boolean;
  /**
   * 表单
   */
  form: {
    classifyCode: string;
    classifyName: string;
    description?: string;
  };
  /**
   * 校验
   */
  rules: FormRules;
}

export function buildEditColum() {
  const columns: PlusColumn[] = [
    {
      label: "iccid",
      prop: "name",
      width: 200,
      align: "left",
      fieldProps: {
        disabled: true
      }
    },
    {
      label: "商户",
      prop: "name",
      minWidth: 200,
      align: "left",
      fieldProps: {
        disabled: true
      }
    },
    {
      label: "卡商",
      prop: "name",
      minWidth: 200,
      align: "left",
      fieldProps: {
        disabled: true
      }
    },
    {
      label: "使用设备",
      prop: "name",
      minWidth: 200,
      align: "left",
      fieldProps: {
        disabled: true
      }
    },
    {
      label: "运营商",
      prop: "name",
      minWidth: 100,
      align: "left",
      fieldProps: {
        disabled: true
      }
    },
    {
      label: "网络类型",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "流量状态",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "入网分配",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "实名状态",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "SIM卡分类",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "备注",
      prop: "name",
      minWidth: 300,
      align: "left",
      valueType: "textarea",
      colProps: {
        span: 22
      }
    }
  ];
  return columns;
}

export const excelTemp = [{ key: "iccid", title: "ICCID" }];
