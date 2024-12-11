import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";
import { getBussList, getItemList } from "@/api/rcms/fram-common";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";
import DetailForm from "../form/detail.vue";
import { getTenantId } from "@/utils/common";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "套餐ID",
      prop: "dpOrderId",
      width: 300,
      tableColumnProps: {
        fixed: true
      },
      render: (value, { row }) => {
        return (
          <el-link
            style="color: var(--el-color-primary)"
            onClick={() => {
              addDrawer({
                title: "套餐详情",
                size: "50%",
                class: "rcms-drawer",
                contentRenderer: ({}) => (
                  <DetailForm currentRow={row} tableColumns={tableColumns} />
                ),
                footerButtons: [
                  {
                    label: "关闭",
                    size: "default",
                    type: "primary",
                    plain: true,
                    btnClick: ({ drawer: { options, index } }) => {
                      closeDrawer(options, index);
                    }
                  }
                ]
              });
            }}
          >
            {value}
          </el-link>
        );
      }
    },
    {
      label: "设备SN",
      prop: "deviceSn",
      width: 200
    },
    {
      label: "套餐名称",
      prop: "dataPlanNo",
      width: 300,
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/mifi/data-plan/records",
        "dataPlanName",
        "dataPlanNo",
        { id: getTenantId() }
      )
    },
    {
      label: "剩余流量(MB)",
      prop: "remainFlow",
      minWidth: 200,
      valueType: "input-number",
      fieldProps: { precision: 2 },
      hideInSearch: true
    },
    {
      label: "当前已用流量(MB)",
      prop: "usedFlow",
      minWidth: 200,
      valueType: "input-number",
      fieldProps: { precision: 2 },
      hideInSearch: true
    },
    {
      label: "总共已用流量(MB)",
      prop: "totalUsedFlow",
      minWidth: 200,
      valueType: "input-number",
      fieldProps: { precision: 2 },
      hideInSearch: true
    },
    {
      label: "生效时间",
      prop: "effectiveTime",
      valueType: "date-picker",
      minWidth: 160,
      hideInSearch: true
    },
    {
      label: "过期时间",
      prop: "expireTime",
      minWidth: 160,
      valueType: "date-picker",
      hideInSearch: true
    },
    {
      label: "是否限速",
      prop: "isLimitSpeed",
      minWidth: 100,
      hideInSearch: true,
      valueType: "select",
      options: getItemList("RCMS_SYS_YN")
    },
    {
      label: "限速值(Kbps)",
      prop: "limitSpeed",
      minWidth: 140,
      hideInSearch: true
    },
    {
      label: "是否可用",
      prop: "isAvailable",
      minWidth: 100,
      hideInSearch: true,
      valueType: "select",
      options: getItemList("RCMS_SYS_YN")
    },
    {
      label: "订单号",
      prop: "orderNo",
      minWidth: 100,
      hideInSearch: true,
      hideInTable: true
    }
  ];
  const { buttons } = useTable();
  buttons.value = [
    {
      text: "编辑",
      code: "update",
      props: { type: "primary", plain: true }
    },
    {
      text: "删除",
      code: "delete",
      props: { type: "danger", plain: true }
    }
  ];
  return {
    pageInfo,
    loading,
    tableColumns,
    buttons,
    selectData
  };
}
