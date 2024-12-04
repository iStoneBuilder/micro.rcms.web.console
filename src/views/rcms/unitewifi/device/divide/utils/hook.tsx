import { ref } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { getBussList } from "@/api/rcms/common";
import { getTenantId } from "@/utils/common";

export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "设备SN",
      prop: "deviceSn",
      width: 200,
      render(value) {
        return (
          <el-link href={"/#/device/detail?deviceSn=" + value} type="primary">
            {value}
          </el-link>
        );
      },
      tableColumnProps: {
        fixed: true
      }
    },
    {
      label: "商户",
      prop: "enterpriseId",
      minWidth: 200,
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/base/enterprise/records",
        "name",
        "id",
        { id: getTenantId() }
      )
    },
    {
      label: "设备类型",
      prop: "deviceType",
      minWidth: 120,
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/mifi/device-type/records",
        "typeName",
        "typeCode",
        {}
      )
    },
    {
      label: "入库批次",
      prop: "batchNo",
      minWidth: 200
    }
  ];
  const divideColumns: PlusColumn[] = [
    {
      label: "分发批次号",
      prop: "enterpriseId",
      minWidth: 200
    },
    {
      label: "处理数量",
      prop: "deviceType",
      minWidth: 120,
      hideInSearch: true
    },
    {
      label: "原商户",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "目标商户",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "分发结果",
      prop: "batchNo",
      minWidth: 200,
      hideInSearch: true
    },
    {
      label: "操作者",
      prop: "batchNo",
      minWidth: 200
    },
    {
      label: "操作时间",
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
