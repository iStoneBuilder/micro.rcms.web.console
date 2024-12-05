import { h } from "vue";
import type { PlusColumn } from "plus-pro-components";

export function buildTableColum() {
  const tableColumns: PlusColumn[] = [
    {
      label: "任务名称",
      prop: "quartzName",
      minWidth: 180,
      tableColumnProps: {
        fixed: true
      }
    },
    {
      label: "任务调度ID",
      prop: "jobId",
      minWidth: 300
    },
    {
      label: "任务调度状态",
      prop: "jobStatus",
      minWidth: 120,
      tableColumnProps: {
        align: "center"
      },
      render: (value: any) => {
        return h(
          <el-tag type={value === "success" ? "success" : "warning"}>
            {value}
          </el-tag>
        );
      }
    },
    {
      label: "响应编码",
      prop: "responseCode",
      minWidth: 100,
      tableColumnProps: {
        align: "center"
      }
    },
    {
      label: "响应内容",
      prop: "responseBody",
      minWidth: 320,
      tableColumnProps: {
        align: "center"
      }
    },
    {
      label: "任务开始时间",
      prop: "startTime",
      minWidth: 160,
      valueType: "date-picker"
    },
    {
      label: "任务结束时间",
      prop: "endTime",
      minWidth: 160,
      valueType: "date-picker"
    },
    {
      label: "创建人",
      prop: "createBy",
      minWidth: 140
    },
    {
      label: "创建时间",
      prop: "createDate",
      minWidth: 160,
      valueType: "date-picker"
    }
  ];
  return tableColumns;
}
