import { h } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { Delete, EditPen } from "@element-plus/icons-vue";
import { getItemList, getBussList } from "@/api/rcms/common";

export const enabledData: Array<any> = [];

export async function enabled() {
  return enabledData.length === 0
    ? await getItemList("RCMS_SYS_TASK_RUN_STATUS")
    : enabledData;
}

export async function groups() {
  return await getBussList(
    "/cron/services/rcms/quzrtz/group/records/list",
    "quartzGroupName",
    "quartzGroupCode",
    {}
  );
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
      width: 200,
      render(value) {
        return (
          <el-link href={"/#/cron/job?quartzName=" + value} type="primary">
            {value}
          </el-link>
        );
      },
      tableColumnProps: {
        fixed: true
      }
    },
    {
      label: "任务组",
      prop: "quartzGroupCode",
      minWidth: 140,
      valueType: "select",
      options: groups()
    },
    {
      label: "Corn表达式",
      prop: "quartzCron",
      minWidth: 140
    },
    {
      label: "请求地址",
      prop: "requestPath",
      minWidth: 400
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
      prop: "nextExecTime",
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
      minWidth: 160
    },
    {
      label: "更新时间",
      prop: "updateDate",
      minWidth: 160,
      valueType: "date-picker"
    },
    {
      label: "更新人",
      prop: "updateBy",
      minWidth: 160
    }
  ];
  return tableColumns;
}
const urlRegex =
  /^(http|https):\/\/((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|localhost|[a-zA-Z0-9.-]+)(:\d+)?\/[a-zA-Z0-9.-\/]*$/;
const alphanumericUnderscoreRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
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
      message: "请输入认证key"
    },
    {
      validator: (rule, value, callback) => {
        if (!alphanumericUnderscoreRegex.test(value)) {
          callback(
            new Error("只包含英文字母、数字和下划线，并且必须以字母开头")
          );
        } else {
          callback();
        }
      },
      trigger: "blur"
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
    },
    {
      validator: (rule, value, callback) => {
        if (!urlRegex.test(value)) {
          callback(new Error("请输入正确的请求地址！"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
};
