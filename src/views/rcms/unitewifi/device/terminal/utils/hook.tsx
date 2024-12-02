import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";
import { getBussList, getItemList } from "@/api/rcms/common";
import { getTenantId } from "@/utils/common";

export function terminalManage() {
  const formRef = ref();
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const tableColumns: PlusColumn[] = [
    {
      label: "设备SN",
      prop: "deviceSn",
      width: 200,
      align: "left",
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
      label: "在线?",
      prop: "online",
      minWidth: 70,
      align: "left",
      valueType: "select",
      options: getItemList("MIFI_IS_ONLINE"),
      render(value) {
        return (
          <el-tag type={value === "online" ? "primary" : "danger"}>
            {value === "online" ? "在线" : "离线"}
          </el-tag>
        );
      }
    },
    {
      label: "IMEI",
      prop: "imei",
      width: 200,
      align: "left"
    },
    {
      label: "上网模式",
      prop: "netMode",
      minWidth: 100,
      align: "left",
      valueType: "select",
      options: getItemList("MIFI_SURF_NET_TYPE")
    },
    {
      label: "商户",
      prop: "enterpriseId",
      minWidth: 200,
      align: "left",
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
      align: "left",
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/mifi/device-type/records",
        "typeName",
        "typeCode",
        {}
      )
    },
    {
      label: "设备组",
      prop: "deviceGroup",
      minWidth: 200,
      align: "left"
    },
    {
      label: "选卡策略",
      prop: "cardStrategy",
      minWidth: 200,
      align: "left",
      valueType: "select",
      options: getItemList("MIFI_CARD_STRATEGY")
    },
    {
      label: "流量模式",
      prop: "flowMode",
      minWidth: 200,
      align: "left",
      valueType: "select",
      options: getItemList("MIFI_FLOW_MODE")
    },
    {
      label: "入库批次号",
      prop: "batchNo",
      minWidth: 160,
      align: "left"
    },
    {
      label: "检测状态",
      prop: "checkStatus",
      minWidth: 100,
      align: "left"
    },
    {
      label: "设备状态",
      prop: "deviceStatus",
      minWidth: 100,
      align: "left"
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
    formRef,
    pageInfo,
    loading,
    tableColumns,
    buttons,
    selectData
  };
}
