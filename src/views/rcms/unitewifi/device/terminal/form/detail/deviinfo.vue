<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="ICCID信息" name="1">
        <PlusDescriptions
          :column="2"
          :columns="iccidColumns"
          :data="iccidInfo"
          :label-width="180"
        />
      </el-collapse-item>
      <el-collapse-item title="设备信息" name="2">
        <PlusDescriptions
          :column="2"
          :columns="deviceColumns"
          :data="iccidInfo"
          :label-width="180"
        />
      </el-collapse-item>
      <el-collapse-item title="流量信息" name="3">
        <PlusDescriptions
          :column="2"
          :columns="dataPlanColumns"
          :data="iccidInfo"
          :label-width="180"
        />
      </el-collapse-item>
      <el-collapse-item title="网络信息" name="5">
        <PlusDescriptions
          :column="2"
          :columns="netColumns"
          :data="iccidInfo"
          :label-width="180"
        />
      </el-collapse-item>
      <el-collapse-item title="访问信息" name="6">
        <PlusDescriptions
          :column="2"
          :columns="visitColumns"
          :data="iccidInfo"
          :label-width="180"
        />
      </el-collapse-item>
      <el-collapse-item title="DHCP信息" name="4">
        <PlusDescriptions
          :column="2"
          :columns="dhcpColumns"
          :data="iccidInfo"
          :label-width="180"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn } from "plus-pro-components";
import { ref } from "vue";

const activeNames = ref(["1", "2", "3", "4", "5", "6"]);
const iccidInfo = ref({});
const iccidColumns: PlusColumn[] = [
  {
    label: "贴片卡ICCID",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "贴片卡2ICCID",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  }
];
const deviceColumns: PlusColumn[] = [
  {
    label: "设备SN",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "所属商户",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "设备组名称",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "启动卡ICCID",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "贴片卡物联网号",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "贴片卡2物联网号",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "软件版本号",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "IMEI",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "上网模式",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "本地卡模式",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  }
];
const dataPlanColumns: PlusColumn[] = [
  {
    label: "今日使用流量",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "本月已耗流量",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "累计使用流量",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  }
];
const dhcpColumns: PlusColumn[] = [
  {
    label: "IP",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "起始地址",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "结束地址",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "合约参数",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  }
];
const netColumns: PlusColumn[] = [
  {
    label: "在线状态",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "可选信号",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "选卡策略",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "设备上报限速值(Kbps)",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "信号强度",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "本地卡模式",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  }
];
const visitColumns: PlusColumn[] = [
  {
    label: "最后访问信息",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "最后流量上报时间",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "最后上报ICCID",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  },
  {
    label: "最后使用网络",
    prop: "dataPlanRules",
    descriptionsItemProps: {
      align: "right"
    }
  }
];
</script>
