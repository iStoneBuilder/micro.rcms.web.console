import { h, Fragment } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { Delete, EditPen } from "@element-plus/icons-vue";
import { renderPermBtn } from "@/utils/auth";

export const searchColumns: PlusColumn[] = [
  {
    label: "分组编码",
    prop: "name"
  },
  {
    label: "分组名称",
    prop: "name"
  },
  {
    label: "是否需要认证",
    prop: "city",
    valueType: "select",
    options: [
      {
        value: "Y",
        label: "是"
      },
      {
        value: "N",
        label: "否"
      }
    ]
  }
];

export const tableButtons = [
  { name: "编辑", type: "primary", perm: null, icon: EditPen },
  { name: "删除", type: "danger", perm: null, icon: Delete }
];

export function buildTableColum(handleClickButton: Function) {
  const tableColumns: PlusColumn[] = [
    {
      label: "分组编码",
      prop: "name",
      minWidth: 200
    },
    {
      label: "分组名称",
      prop: "status",
      minWidth: 200
    },
    {
      label: "是否需要认证",
      prop: "tag",
      minWidth: 200,
      valueType: "tag",
      fieldProps: (value: string) => {
        return { type: value };
      }
    },
    {
      label: "创建时间",
      prop: "time",
      minWidth: 200,
      valueType: "date-picker"
    },
    {
      label: "创建人",
      prop: "time",
      minWidth: 200,
      valueType: "date-picker"
    },
    {
      label: "操作",
      width: 200,
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
          tableButtons,
          handleClickButton,
          value,
          index,
          row
        );
        return h(Fragment, CustomButton);
      }
    }
  ];
  return tableColumns;
}

export const groupService = {
  // 加载列表数据
  getTableData: async () => {
    const data = Array.from({ length: 5 }).map((item, index) => {
      return {
        id: index,
        name: index + "name",
        status: String(index % 3),
        tag:
          index === 1
            ? "success"
            : index === 2
              ? "warning"
              : index === 3
                ? "info"
                : "danger",
        time: new Date()
      };
    });
    return {
      data: data as Array<any>,
      total: data.length
    };
  }
};
