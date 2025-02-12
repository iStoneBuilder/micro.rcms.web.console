import { ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PlusColumn } from "plus-pro-components";
import { getBussList, getItemList } from "@/api/rcms/fram-common";
import { getTenantId } from "@/utils/common";
import { useDetail } from "@/utils/toDetail";

import Device from "@iconify-icons/ep/cellphone";
import Active from "@iconify-icons/ep/coin";
import Pointer from "@iconify-icons/ep/pointer";
import Wallet from "@iconify-icons/ep/wallet";
import Transform from "@iconify-icons/ep/bottom-right";
import ShutDown from "@iconify-icons/ri/shut-down-line";
import InitInstall from "@iconify-icons/ri/install-line";
import Upload from "@iconify-icons/ep/upload";

export function terminalManage() {
  const formRef = ref();
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);

  const { toDetail } = useDetail();
  const tableColumns: PlusColumn[] = [
    {
      label: "设备SN",
      prop: "deviceSn",
      width: 200,
      align: "left",
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
        "/test/services/api/base/enterprise/records",
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
        "/test/services/api/mifi-device/device-type/records",
        "typeName",
        "typeCode",
        {}
      )
    },
    {
      label: "设备组",
      prop: "deviceGroup",
      minWidth: 160,
      align: "left",
      valueType: "select",
      options: getBussList(
        "/test/services/api/mifi-device/device-group/records",
        "groupName",
        "groupId"
      )
    },
    {
      label: "选卡策略",
      prop: "cardStrategy",
      minWidth: 100,
      align: "left",
      valueType: "select",
      options: getItemList("MIFI_CARD_STRATEGY")
    },
    {
      label: "流量模式",
      prop: "flowMode",
      minWidth: 140,
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
  const barButton = [
    {
      name: "设备入库",
      code: "store",
      content: "Excel中SN重复的数据只导入一条；已导入过的SN将不会覆盖导入。",
      icon: Upload,
      type: "success"
    },
    {
      name: "设备分组",
      code: "group",
      content: "请选择至少一条数据，允许批量操作",
      icon: Device,
      isBatch: true
    },
    {
      name: "设备激活",
      code: "active",
      content: "请选择一条数据，不允许批量操作！",
      icon: Active,
      isBatch: false
    },
    {
      name: "设备控制",
      code: "control",
      content: "请选择一条数据，不允许批量操作！",
      icon: Pointer,
      isBatch: false
    },
    {
      name: "设备充值",
      code: "charge",
      content: "请选择至少一条数据，允许批量操作",
      icon: Wallet,
      isBatch: false
    },
    {
      name: "套餐转移",
      code: "store",
      content: "请选择一条数据，不允许批量操作！",
      icon: Transform,
      isBatch: false
    },
    {
      name: "停机/复机",
      code: "store",
      content: "请选择至少一条数据，允许批量操作",
      icon: ShutDown,
      isBatch: true
    },
    {
      name: "设备初始化",
      code: "store",
      content: "请选择至少一条数据，允许批量操作",
      icon: InitInstall,
      isBatch: true
    }
  ];
  return {
    formRef,
    pageInfo,
    loading,
    tableColumns,
    buttons,
    selectData,
    barButton
  };
}
