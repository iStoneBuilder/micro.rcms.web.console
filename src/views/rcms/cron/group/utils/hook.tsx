import { h } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { Delete, EditPen } from "@element-plus/icons-vue";
import { getItemList } from "@/api/rcms/common";

export const tableButtons = [
  { name: "编辑", type: "primary", perm: null, icon: EditPen },
  { name: "删除", type: "danger", perm: null, icon: Delete }
];

export function buildTableColum() {
  const tableColumns: PlusColumn[] = [
    {
      label: "分组编码",
      prop: "quartzGroupCode",
      minWidth: 100,
      render(value) {
        return (
          <el-link
            href={"/#/cron/task?quartzGroupCode=" + value}
            type="primary"
          >
            {value}
          </el-link>
        );
      },
      tableColumnProps: {
        fixed: true
      }
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
      },
      valueType: "select",
      options: getItemList("RCMS_SYS_YN")
    },
    {
      label: "创建时间",
      prop: "createDate",
      minWidth: 160,
      valueType: "date-picker",
      hideInSearch: true
    },
    {
      label: "创建人",
      prop: "createBy",
      minWidth: 200,
      hideInSearch: true
    }
  ];
  return tableColumns;
}
