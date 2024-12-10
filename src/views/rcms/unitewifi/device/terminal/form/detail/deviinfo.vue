<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <div class="rcms-op-bar">
        <div class="btn">
          <el-button type="primary" plain @click="handleDeviceCode">
            设备二维码
          </el-button>
          <el-button type="primary" plain @click="handleDeviceCheck">
            设备诊断
          </el-button>
        </div>
        <div class="icon">
          <IconifyIconOffline :icon="Refresh" />
        </div>
      </div>
      <el-collapse-item title="ICCID信息" name="1">
        <PlusDescriptions
          :column="2"
          :columns="iccidColumns"
          :data="detailData"
          :label-width="'180px'"
        />
      </el-collapse-item>
      <el-collapse-item title="设备信息" name="2">
        <PlusDescriptions
          :column="2"
          :columns="deviceColumns"
          :data="detailData"
          :label-width="'180px'"
        />
      </el-collapse-item>
      <el-collapse-item title="流量信息" name="3">
        <PlusDescriptions
          :column="2"
          :columns="dataPlanColumns"
          :data="detailData"
          :label-width="'180px'"
        />
      </el-collapse-item>
      <el-collapse-item title="网络信息" name="5">
        <PlusDescriptions
          :column="2"
          :columns="netColumns"
          :data="detailData"
          :label-width="'180px'"
        />
      </el-collapse-item>
      <el-collapse-item title="访问信息" name="6">
        <PlusDescriptions
          :column="2"
          :columns="visitColumns"
          :data="detailData"
          :label-width="'180px'"
        />
      </el-collapse-item>
      <el-collapse-item title="DHCP信息" name="4">
        <PlusDescriptions
          :column="2"
          :columns="dhcpColumns"
          :data="detailData"
          :label-width="'180px'"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="tsx" setup>
import { onMounted, ref, h } from "vue";
import { getRecord } from "@/api/rcms/fram-common";
import type { PlusColumn } from "plus-pro-components";
import { useRoute } from "vue-router";
import { getBussList, getItemList } from "@/api/rcms/fram-common";
import { getTenantId } from "@/utils/common";
import Qrcode from "./qrcode.vue";
import { addDialog } from "@/components/ReDialog";
import { useDetail } from "@/utils/toDetail";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Refresh from "@iconify-icons/ep/refresh";

const detailData = ref({});
const activeNames = ref(["1", "2", "3", "4", "5", "6"]);
const iccidColumns: PlusColumn[] = [
  {
    label: "贴片卡ICCID",
    prop: "iccid",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "贴片卡2ICCID",
    prop: "iccid2",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  }
];
const deviceColumns: PlusColumn[] = [
  {
    label: "设备SN",
    prop: "deviceSn",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "所属商户",
    prop: "enterpriseId",
    descriptionsItemProps: {
      labelAlign: "right"
    },
    valueType: "select",
    options: getBussList(
      "/test/services/rcms/base/enterprise/records",
      "name",
      "id",
      { id: getTenantId() }
    )
  },
  {
    label: "设备组名称",
    prop: "deviceGroup",
    descriptionsItemProps: {
      labelAlign: "right"
    },
    valueType: "select",
    options: getBussList(
      "/test/services/rcms/mifi/device-group/records",
      "groupName",
      "groupId"
    )
  },
  {
    label: "启动卡ICCID",
    prop: "iccid",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "贴片卡物联网号",
    prop: "msisdn1",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "贴片卡2物联网号",
    prop: "msisdn2",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "软件版本号",
    prop: "softVersion",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "IMEI",
    prop: "imei",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "上网模式",
    prop: "netMode",
    descriptionsItemProps: {
      labelAlign: "right"
    },
    valueType: "select",
    options: getItemList("MIFI_SURF_NET_TYPE")
  },
  {
    label: "本地卡模式",
    prop: "localCardMode",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "流量模式",
    prop: "flowMode",
    descriptionsItemProps: {
      labelAlign: "right"
    },
    valueType: "select",
    options: getItemList("MIFI_FLOW_MODE")
  },
  {
    label: "wifi连接数",
    prop: "wifiConnectNum",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "wifi名称",
    prop: "wifiName",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "wifiPwd",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "5G wifi名称",
    prop: "wifiName5G",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "5G wifi密码",
    prop: "wifiPwd5G",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "设备状态",
    prop: "deviceStatus",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "激活时间",
    prop: "activeTime",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "激活用户",
    prop: "activeUser",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "设备能力",
    prop: "deviceAbility",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "监测状态",
    prop: "checkStatus",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "入库批次号",
    prop: "batchNo",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  }
];
const dataPlanColumns: PlusColumn[] = [
  {
    label: "今日使用流量",
    prop: "todayFlow",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "本月已耗流量",
    prop: "monthFlow",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "累计使用流量",
    prop: "totalFlow",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  }
];
const dhcpColumns: PlusColumn[] = [
  {
    label: "IP",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "起始地址",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "结束地址",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "合约参数",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  }
];
const netColumns: PlusColumn[] = [
  {
    label: "在线状态",
    prop: "online",
    descriptionsItemProps: {
      labelAlign: "right"
    },
    valueType: "select",
    options: getItemList("MIFI_IS_ONLINE")
  },
  {
    label: "可选信号",
    prop: "signal",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "选卡策略",
    prop: "cardStrategy",
    descriptionsItemProps: {
      labelAlign: "right"
    },
    valueType: "select",
    options: getItemList("MIFI_CARD_STRATEGY")
  },
  {
    label: "设备上报限速值(Kbps)",
    prop: "limitSpeed",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "信号强度",
    prop: "signalStrength",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "本地卡模式",
    prop: "localCardMode",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  }
];
const visitColumns: PlusColumn[] = [
  {
    label: "最后访问信息",
    prop: "lastAccessInfo",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "最后流量上报时间",
    prop: "lastFlowReportTime",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "最后上报ICCID",
    prop: "lastReportIccid",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  },
  {
    label: "最后使用网络",
    prop: "lastUsedNetwork",
    descriptionsItemProps: {
      labelAlign: "right"
    }
  }
];
const handleDeviceCode = function () {
  addDialog({
    title: `设备二维码`,
    props: {},
    width: "336px",
    draggable: true,
    hideFooter: true,
    fullscreenIcon: false,
    closeOnClickModal: false,
    contentRenderer: () => h(Qrcode, {}),
    beforeSure: (done, { options }) => {}
  });
};
const route = useRoute();
const { toDetail } = useDetail();
const handleDeviceCheck = function () {
  toDetail({ deviceSn: route.query.deviceSn }, "query", {
    path: "/device/check",
    name: "DeviceCheck",
    meta: { title: "设备诊断" }
  });
};
onMounted(async () => {
  const route = useRoute();
  const { data } = await getRecord(
    "mifi/device-manage",
    route.query.deviceSn as string
  );
  detailData.value = { ...data };
});
</script>
