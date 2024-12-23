import { ref } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { useDetail } from "@/utils/toDetail";
import { getItemList } from "@/api/rcms/fram-common";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);

  const { toDetail } = useDetail();
  const tableColumns: PlusColumn[] = [
    {
      label: "设备SN",
      prop: "deviceSn",
      width: 200,
      tableColumnProps: {
        fixed: true
      },
      render(value) {
        return (
          <el-link
            onClick={() => {
              toDetail({ deviceSn: value }, "query", {
                path: "/device/detail",
                name: "DeviceDetail",
                meta: { title: "详情｜设备SN：" + value }
              });
            }}
            type="primary"
          >
            {value}
          </el-link>
        );
      }
    },
    ,
    {
      label: "实名用户",
      prop: "realName",
      minWidth: 200
    },
    {
      label: "ICCID",
      prop: "iccid",
      minWidth: 200
    },
    {
      label: "认证方式",
      prop: "authWay",
      minWidth: 100,
      hideInSearch: true,
      valueType: "select",
      options: getItemList("MIFI_AUTH_WAY")
    },
    {
      label: "认证状态",
      prop: "authStatus",
      minWidth: 100,
      hideInSearch: true,
      valueType: "select",
      options: getItemList("MIFI_NAME_STATUS"),
      tableColumnProps: {
        align: "center"
      }
    },
    {
      label: "认证申请时间",
      prop: "authApplyTime",
      minWidth: 160,
      hideInSearch: true,
      valueType: "date-picker"
    },
    {
      label: "认证通过时间",
      prop: "authPassTime",
      minWidth: 160,
      hideInSearch: true,
      valueType: "date-picker"
    }
  ];
  const divideColumns: PlusColumn[] = [
    {
      label: "单号",
      prop: "enterpriseId",
      minWidth: 200,
      tableColumnProps: {
        fixed: true
      }
    },
    {
      label: "运营商单号",
      prop: "deviceType",
      minWidth: 120,
      hideInSearch: true
    },
    {
      label: "ICCID",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "状态",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "实名用户",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "实名成功时间",
      prop: "batchNo",
      minWidth: 200
    },
    {
      label: "申请时间",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "清除成功时间",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    }
  ];
  return {
    pageInfo,
    loading,
    tableColumns,
    divideColumns,
    selectData
  };
}
