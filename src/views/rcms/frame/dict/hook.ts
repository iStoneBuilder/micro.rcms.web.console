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
  { name: "配置", type: "primary", perm: "aaa", icon: Setting }
];
export function buildColum(handleClickButton: Function) {
  const columns: PlusColumn[] = [
    {
      label: "字典项",
      minWidth: 200,
      prop: "classifyCode",
      columnsProps: {
        showOverflowTooltip: true
      }
    },
    {
      label: "字典项名称",
      minWidth: 100,
      prop: "classifyName"
    },
    {
      label: "描述",
      minWidth: 500,
      prop: "description",
      valueType: "textarea",
      hideInSearch: true
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
// 子项目配置
export const childButtons = [
  { name: "编辑", type: "primary", perm: null, icon: EditPen },
  { name: "删除", type: "danger", perm: null, icon: Delete }
];

export function buildChildColum(handleClickButton: Function) {
  const columns: PlusColumn[] = [
    {
      label: "编码",
      minWidth: 200,
      prop: "classifyCode",
      columnsProps: {
        showOverflowTooltip: true
      }
    },
    {
      label: "名称",
      minWidth: 100,
      prop: "classifyName"
    },
    {
      label: "语言",
      minWidth: 100,
      prop: "classifyName"
    },
    {
      label: "排序",
      minWidth: 100,
      prop: "classifyName",
      hideInSearch: true
    },
    {
      label: "是否启用",
      minWidth: 100,
      prop: "classifyName"
    },
    {
      label: "扩展1",
      minWidth: 100,
      prop: "classifyName",
      hideInSearch: true
    },
    {
      label: "扩展2",
      minWidth: 100,
      prop: "classifyName",
      hideInSearch: true
    },
    {
      label: "扩展3",
      minWidth: 100,
      prop: "classifyName",
      hideInSearch: true
    },
    {
      label: "扩展4",
      minWidth: 100,
      prop: "classifyName",
      hideInSearch: true
    },
    {
      label: "扩展5",
      minWidth: 100,
      prop: "classifyName",
      hideInSearch: true
    },
    {
      label: "描述",
      minWidth: 200,
      prop: "description",
      valueType: "textarea",
      hideInSearch: true,
      colProps: {
        span: 24
      }
    },
    {
      label: "操作",
      width: 150,
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
