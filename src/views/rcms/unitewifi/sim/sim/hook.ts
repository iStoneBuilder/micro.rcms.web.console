import { h, Fragment } from "vue";
import type { PlusColumn } from "plus-pro-components";
import type { FormRules } from "element-plus";
import { Setting, EditPen, RefreshLeft } from "@element-plus/icons-vue";
import { renderPermBtn } from "@/utils/auth";

export const defaultPageInfo = {
  page: 1,
  pageSize: 15
};
export const buttons = [
  { name: "编辑", type: "primary", perm: null, icon: EditPen },
  { name: "同步流量", type: "primary", perm: null, icon: RefreshLeft },
  { name: "限速", type: "primary", perm: "aaa", icon: Setting }
];
export function buildColum(handleClickButton: Function) {
  const columns: PlusColumn[] = [
    {
      label: "iccid",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "商户",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "卡商",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "使用设备",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "运营商",
      prop: "name",
      minWidth: 100,
      align: "left",
      hideInSearch: true
    },
    {
      label: "剩余流量",
      prop: "name",
      minWidth: 200,
      align: "left",
      hideInSearch: true,
      hideInForm: true
    },
    {
      label: "网络类型",
      prop: "name",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "流量状态",
      prop: "name",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "入网分配",
      prop: "name",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "实名状态",
      prop: "name",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "SIM卡分类",
      prop: "name",
      minWidth: 200,
      align: "left",
      hideInSearch: true
    },
    {
      label: "备注",
      prop: "name",
      minWidth: 300,
      align: "left",
      hideInSearch: true,
      valueType: "textarea",
      colProps: {
        span: 22
      }
    },
    {
      label: "操作",
      width: 250,
      prop: "description",
      hideInSearch: true,
      hideInForm: true,
      columnsProps: {
        align: "center"
      },
      tableColumnProps: {
        fixed: "right",
        align: "center"
      },
      render: (value, { index, row }) => {
        const CustomButton = renderPermBtn(
          buttons,
          handleClickButton,
          value,
          index,
          row
        );
        return h(Fragment, CustomButton);
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
