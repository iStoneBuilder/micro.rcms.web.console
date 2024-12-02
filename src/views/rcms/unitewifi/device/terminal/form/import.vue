<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Download from "@iconify-icons/ep/download";
import { getBussList, getItemList } from "@/api/rcms/common";
import { buildExcelTemp, readExcelData } from "@/utils/xlsxHandle";
import { message } from "@/utils/message";
import { importRecords } from "@/api/mifi/device-manage";
const importForm = ref({
  fileName: "",
  excelData: []
});
const importColumns = [
  {
    label: "模版下载",
    prop: "downloadBtn"
  },
  {
    label: "模版上传",
    prop: "importBtn"
  },
  {
    label: "设备类型",
    valueType: "select",
    prop: "deviceType",
    options: getBussList(
      "/test/services/rcms/mifi/device-type/records",
      "typeName",
      "typeCode"
    )
  },
  {
    label: "流量模式",
    valueType: "select",
    prop: "flowMode",
    tooltip: "当前只支持平台购买套餐模式",
    options: getItemList("MIFI_FLOW_MODE")
  },
  {
    label: "上网模式",
    valueType: "select",
    prop: "netMode",
    options: getItemList("MIFI_SURF_NET_TYPE")
  },
  {
    label: "测试流量",
    valueType: "input-number",
    fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 },
    prop: "testFlow",
    tooltip: "用于用户测试流量，有效期1年，单位：MB"
  }
];
const importRules = {
  deviceType: [
    {
      required: true,
      message: "请选择设备类型"
    }
  ],
  flowMode: [
    {
      required: true,
      message: "请选择流量模式"
    }
  ],
  netMode: [
    {
      required: true,
      message: "请选择上网模式"
    }
  ]
};
const importLoading = ref(false);
const emit = defineEmits(["dialogEvent"]);
async function selectExcelFile(event) {
  const input = event.target;
  if (!input.files || input.files.length === 0) {
    return;
  }
  const file = input.files[0];
  importForm.value.fileName = file.name;
  const data = await readExcelData(excelTemp, file);
  importForm.value.excelData = data;
}
const handleSubmit = async () => {
  if (importForm.value.excelData.length == 0) {
    message(`请选择模版数据！`, {
      type: "warning"
    });
    return;
  }
  // 构建数据
  const submitData = [];
  const excelData = [...importForm.value.excelData];
  const formData = { ...importForm.value };
  delete formData.excelData;
  delete formData.fileName;
  excelData.forEach(item => {
    submitData.push({ ...formData, ...item });
  });
  await importRecords(submitData);
  message(`请选择模版数据！`, {
    type: "success"
  });
  handleClose("submit");
};
function handleClose(op) {
  emit("dialogEvent", op);
}
const excelTemp = [
  { key: "deviceSn", title: "设备SN" },
  { key: "iccid", title: "贴片卡ICCID" },
  { key: "iotNo", title: "贴片卡物联网号" },
  { key: "iccid2", title: "贴片卡2ICCID" },
  { key: "iotNo2", title: "贴片卡2物联网号" }
];
function downloadTemp() {
  buildExcelTemp(excelTemp, "终端设备模版", "终端设备");
}
</script>
<template>
  <el-card>
    <PlusForm
      ref="importFormRef"
      v-model="importForm"
      labelWidth="110"
      labelPosition="right"
      :columns="importColumns"
      :rules="importRules"
      footerAlign="center"
      :row-props="{ gutter: 20 }"
      :col-props="{
        span: 22
      }"
      @submit="handleSubmit"
    >
      <template #plus-field-downloadBtn>
        <el-button
          type="primary"
          plain
          :icon="useRenderIcon(Download)"
          @click="downloadTemp"
          >点击下载</el-button
        >
      </template>
      <template #plus-field-importBtn>
        <div class="file-area">
          <input
            type="file"
            accept=".xlsx,.xls"
            class="file-inp"
            @change="selectExcelFile"
          />
          <el-button type="primary" plain :disabled="importLoading"
            >选择文件</el-button
          >
        </div>
        <label class="file-label">{{ importForm.fileName }}</label>
      </template>
      <template #footer="{ handleSubmit }">
        <div style="margin: 0 auto">
          <el-button
            type="primary"
            plain
            :disabled="importLoading"
            @click="handleClose('cancel')"
            >取消</el-button
          >
          <el-button
            type="primary"
            :loading="importLoading"
            @click="handleSubmit"
            >提交</el-button
          >
        </div>
      </template>
    </PlusForm>
  </el-card>
</template>
<style scoped>
.file-area {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.file-inp {
  position: absolute;
  font-size: 100px;
  opacity: 0;
  right: 0;
  top: 0;
  cursor: pointer;
}
.file-label {
  margin-left: 14px !important;
}
</style>
