import { h, Fragment } from "vue";
import type { PlusColumn } from "plus-pro-components";
import type { FormRules } from "element-plus";
import { Delete, Setting, EditPen } from "@element-plus/icons-vue";
import { renderPermBtn } from "@/utils/auth";

export const defaultPageInfo = {
  page: 1,
  pageSize: 15
};
export const buttons = [
  { name: "编辑", type: "primary", perm: null, icon: EditPen },
  { name: "删除", type: "danger", perm: null, icon: Delete },
  { name: "API配置", type: "primary", perm: "aaa", icon: Setting }
];
export function buildColum(handleClickButton: Function) {
  const columns: PlusColumn[] = [
    {
      label: "卡商编码",
      minWidth: 200,
      prop: "merchantCode",
      hideInForm: true,
      hideInSearch: true,
      fieldProps: {
        disabled: false
      }
    },
    {
      label: "卡商名称",
      minWidth: 200,
      prop: "merchantName",
      columnsProps: {
        showOverflowTooltip: true
      }
    },
    {
      label: "描述",
      minWidth: 300,
      prop: "description",
      valueType: "textarea"
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
    merchantCode: string;
    merchantName: string;
    description?: string;
  };
  /**
   * 校验
   */
  rules: FormRules;
}

export interface ChildState {
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
    merchantCode: string;
    carrierCode: string;
    appKey: string;
    appSecret: string;
    disableArea: string;
    description?: string;
  };
  /**
   * 校验
   */
  rules: FormRules;
}
// 子项目配置
export const childButtons = [
  { name: "编辑", type: "primary", perm: null, icon: EditPen },
  { name: "删除", type: "danger", perm: null, icon: Delete }
];
export function buildChildColum(handleClickButton: Function) {
  const columns: PlusColumn[] = [
    {
      label: "运营商",
      minWidth: 100,
      prop: "carrierCode"
    },
    {
      label: "appKey",
      minWidth: 200,
      prop: "appKey"
    },
    {
      label: "appKey Secret",
      minWidth: 200,
      prop: "appSecret"
    },
    {
      label: "禁用区域",
      minWidth: 300,
      prop: "disableArea"
    },
    {
      label: "描述",
      minWidth: 200,
      prop: "description",
      valueType: "textarea",
      colProps: {
        span: 23
      }
    },
    {
      label: "操作",
      width: 150,
      prop: "description",
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
          childButtons,
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
