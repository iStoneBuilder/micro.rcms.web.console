import { h, Fragment } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { Delete, EditPen } from "@element-plus/icons-vue";
import { renderPermBtn } from "@/utils/auth";

export const searchColumns: PlusColumn[] = [
  {
    label: "分组编码",
    prop: "quartzGroupCode"
  },
  {
    label: "分组名称",
    prop: "quartzGroupName"
  },
  {
    label: "是否需要认证",
    prop: "isAuthorized",
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

export const createColumns: PlusColumn[] = [
  {
    label: "状态",
    width: 120,
    prop: "status",
    valueType: "select",
    options: [
      {
        label: "未解决",
        value: "0",
        color: "red"
      },
      {
        label: "已解决",
        value: "1",
        color: "blue"
      },
      {
        label: "解决中",
        value: "2",
        color: "yellow"
      },
      {
        label: "失败",
        value: "3",
        color: "red"
      }
    ]
  },
  {
    label: "标签",
    width: 120,
    prop: "tag"
  },
  {
    label: "执行进度",
    width: 200,
    prop: "progress"
  },
  {
    label: "评分",
    width: 200,
    prop: "rate",
    valueType: "rate"
  },
  {
    label: "是否显示",
    width: 100,
    prop: "switch",
    valueType: "switch"
  },
  {
    label: "图片",
    prop: "img",
    width: 100,
    valueType: "img"
  },
  {
    label: "时间",
    prop: "time",
    valueType: "date-picker"
  },
  {
    label: "数量",
    prop: "number",
    valueType: "input-number",
    fieldProps: { precision: 2, step: 2 }
  }
];
export const createRules = {
  name: [
    {
      required: true,
      message: "请输入名称"
    }
  ],
  tag: [
    {
      required: true,
      message: "请输入标签"
    }
  ]
};

export const tableButtons = [
  { name: "编辑", type: "primary", perm: null, icon: EditPen },
  { name: "删除", type: "danger", perm: null, icon: Delete }
];

export function buildTableColum(handleClickButton: Function) {
  const tableColumns: PlusColumn[] = [
    {
      label: "分组编码",
      prop: "quartzGroupCode",
      minWidth: 200
    },
    {
      label: "分组名称",
      prop: "quartzGroupName",
      minWidth: 200
    },
    {
      label: "是否需要认证",
      prop: "isAuthorized",
      minWidth: 120,
      tableColumnProps: {
        align: "center"
      },
      render: (value: any) => {
        return h(
          <el-tag type={value === "Y" ? "success" : "warning"}>
            {value === "Y" ? "是" : "否"}
          </el-tag>
        );
      }
    },
    {
      label: "创建时间",
      prop: "createDate",
      minWidth: 160,
      valueType: "date-picker"
    },
    {
      label: "创建人",
      prop: "createBy",
      minWidth: 200,
      valueType: "date-picker"
    },
    {
      label: "操作",
      width: 170,
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
    const data = Array.from({ length: 15 }).map((item, index) => {
      return {
        id: index,
        quartzGroupName: index + "name",
        quartzGroupCode: String(index % 3),
        isAuthorized:
          index === 1 ? "N" : index === 2 ? "Y" : index === 3 ? "N" : "Y",
        createDate: new Date()
      };
    });
    return {
      data: data as Array<any>,
      total: data.length
    };
  }
};
