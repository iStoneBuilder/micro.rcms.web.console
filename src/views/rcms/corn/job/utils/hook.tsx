import { h } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { Delete, EditPen } from "@element-plus/icons-vue";

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

export const tableButtons = [
  { name: "编辑", type: "primary", perm: null, icon: EditPen },
  { name: "删除", type: "danger", perm: null, icon: Delete }
];

export function buildTableColum() {
  const tableColumns: PlusColumn[] = [
    {
      label: "分组编码",
      prop: "quartzName",
      minWidth: 100,
      render(value) {
        return (
          <el-link href={"/#/corn/task?code=" + value} type="primary">
            {value}
          </el-link>
        );
      }
    },
    {
      label: "分组名称",
      prop: "quartzCron",
      minWidth: 200
    },
    {
      label: "是否需要认证",
      prop: "enabledFlag",
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
      label: "任务执行状态",
      prop: "quartzStatus",
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
      minWidth: 200
    }
  ];
  return tableColumns;
}
