import { ref } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { useDetail } from "@/utils/toDetail";

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
      prop: "enterpriseId",
      minWidth: 200
    },
    {
      label: "ICCID",
      prop: "deviceType",
      minWidth: 120
    },
    {
      label: "msisdn",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "认证方式",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "认证状态",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "认证时间",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "认证通过时间",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
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
