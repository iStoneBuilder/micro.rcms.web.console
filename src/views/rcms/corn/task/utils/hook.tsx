import { h } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { Delete, EditPen } from "@element-plus/icons-vue";
import { getItemList, getBussList } from "@/api/rcms/common";

export const enabledData: Array<any> = [];

export const groupsData: Array<any> = [];

export async function enabled() {
  return enabledData.length === 0
    ? await getItemList("RCMS_SYS_TASK_RUN_STATUS")
    : enabledData;
}

export async function groups() {
  return groupsData.length === 0
    ? await getBussList(
        "/corn/services/rcms/quzrtz/group/records/list",
        "quartzGroupName",
        "quartzGroupCode",
        {}
      )
    : groupsData;
}

export const searchColumns: PlusColumn[] = [
  {
    label: "任务组",
    valueType: "select",
    prop: "quartzGroupCode",
    options: groups()
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
      valueType: "select",
      options: enabled()
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
export const createRules = {
  quartzGroupCode: [
    {
      required: true,
      message: "请输入选择任务组"
    }
  ],
  quartzName: [
    {
      required: true,
      message: "请输入任务名称"
    }
  ],
  quartzCron: [
    {
      required: true,
      message: "请输入Corn表达式"
    }
  ],
  authKey: [
    {
      required: true,
      message: "请输入返回值key"
    }
  ],
  enabledFlag: [
    {
      required: true,
      message: "请选择任务状态"
    }
  ],
  requestType: [
    {
      required: true,
      message: "请输入请求类型"
    }
  ],
  requestPath: [
    {
      required: true,
      message: "请输入请求地址"
    }
  ]
};
