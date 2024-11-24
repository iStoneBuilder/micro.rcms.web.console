import { h } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { Delete, EditPen } from "@element-plus/icons-vue";
import { getItemList } from "@/api/rcms/common";

export const enabledData: Array<any> = [];

export async function enabled() {
  return enabledData.length === 0
    ? await getItemList("RCMS_SYS_TASK_STATUS")
    : enabledData;
}

export const searchColumns: PlusColumn[] = [
  {
    label: "任务组",
    valueType: "select",
    prop: "quartzGroupCode"
  },
  {
    label: "任务名称",
    prop: "quartzGroupName"
  },
  {
    label: "任务状态",
    prop: "enabledFlag",
    valueType: "select",
    options: enabled()
  }
];

export const tableButtons = [
  { name: "编辑", type: "primary", perm: null, icon: EditPen },
  { name: "删除", type: "danger", perm: null, icon: Delete }
];
export const enabledFlag = {
  disable: "未启用",
  suspend: "暂停",
  enable: "启用"
};
export function buildTableColum() {
  const tableColumns: PlusColumn[] = [
    {
      label: "任务名称",
      prop: "quartzName",
      minWidth: 200,
      render(value) {
        return (
          <el-link href={"/#/corn/job?code=" + value} type="primary">
            {value}
          </el-link>
        );
      }
    },
    {
      label: "Corn表达式",
      prop: "quartzCron",
      minWidth: 200
    },
    {
      label: "任务状态",
      prop: "enabledFlag",
      minWidth: 120,
      tableColumnProps: {
        align: "center"
      },
      render: (value: any) => {
        return value
          ? h(
              <el-tag type={value ? "success" : "warning"}>
                {enabledFlag[value]}
              </el-tag>
            )
          : "";
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
        return value
          ? h(
              <el-tag type={value === "Y" ? "success" : "danger"}>
                {value === "Y" ? "执行成功" : "执行失败"}
              </el-tag>
            )
          : "";
      }
    },
    {
      label: "下次执行时间",
      prop: "createDate",
      minWidth: 160,
      valueType: "date-picker"
    },
    {
      label: "描述",
      prop: "quartzDesc",
      minWidth: 200
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
