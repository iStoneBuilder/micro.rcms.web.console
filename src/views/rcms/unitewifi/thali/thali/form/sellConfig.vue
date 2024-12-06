<script setup lang="ts">
import { message } from "@/utils/message";
import { ref, defineProps, defineEmits } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { getBussList } from "@/api/rcms/common";
import { updateRecordSell } from "@/api/mifi/data-plan";
// 父节点传值
const props = defineProps<{
  currentRow: any;
}>();
const emit = defineEmits(["dialogEvent"]);
const createLoading = ref(false);
const formModel = ref({ dataPlanNo: "" });
const rowData = {
  ...props.currentRow
};
if (rowData.saleDeviceType) {
  rowData.saleDeviceType = rowData.saleDeviceType.split(",");
}
if (rowData.saleDeviceGroup) {
  rowData.saleDeviceGroup = rowData.saleDeviceGroup.split(",");
}
formModel.value = {
  ...rowData
};
const newColumns: PlusColumn[] = [
  {
    label: "套餐编号",
    prop: "dataPlanNo",
    width: 130,
    align: "left",
    fieldProps: {
      disabled: true
    }
  },
  {
    label: "套餐名",
    prop: "dataPlanName",
    width: 200,
    align: "left",
    fieldProps: {
      disabled: true
    }
  },
  {
    label: "设备类型",
    prop: "saleDeviceType",
    width: 200,
    align: "left",
    valueType: "select",
    fieldProps: {
      multiple: true
    },
    options: getBussList(
      "/test/services/rcms/mifi/device-type/records",
      "typeName",
      "typeCode",
      {}
    )
  },
  {
    label: "设备组",
    prop: "saleDeviceGroup",
    width: 200,
    align: "left",
    valueType: "select",
    fieldProps: {
      multiple: true
    },
    options: getBussList(
      "/test/services/rcms/mifi/device-group/records",
      "groupName,groupId",
      "groupId",
      {
        enterpriseId: rowData.enterpriseId
      }
    )
  }
];
const createRules = {
  saleDeviceGroup1: [
    {
      required: true,
      message: "请输入套餐名称"
    }
  ]
};
async function handleSubmit() {
  createLoading.value = true;
  const submitForm = { ...formModel.value };
  if (submitForm["saleDeviceType"]) {
    submitForm["saleDeviceType"] = submitForm["saleDeviceType"].toString();
  }
  if (submitForm["saleDeviceGroup"]) {
    submitForm["saleDeviceGroup"] = submitForm["saleDeviceGroup"].toString();
  }
  if (JSON.stringify(props.currentRow) === JSON.stringify(submitForm)) {
    message(`数据未更改，请勿提交！`, {
      type: "warning"
    });
    createLoading.value = false;
    return;
  }
  await updateRecordSell(formModel.value.dataPlanNo, submitForm).catch(() => {
    createLoading.value = false;
  });
  message(`设置成功！`, {
    type: "success"
  });
  createLoading.value = false;
  handleClose("submit");
}
function handleClose(op = "cancel") {
  emit("dialogEvent", op);
}
</script>

<template>
  <el-card>
    <PlusForm
      ref="createFormRef"
      v-model="formModel"
      labelWidth="140"
      labelPosition="right"
      :columns="newColumns"
      :rules="createRules"
      footerAlign="center"
      :row-props="{ gutter: 20 }"
      :col-props="{
        span: 23
      }"
      @submit="handleSubmit"
    >
      <template #footer="{ handleSubmit }">
        <div style="margin: 0 auto">
          <el-button
            type="primary"
            plain
            :disabled="createLoading"
            @click="handleClose()"
            >取消</el-button
          >
          <el-button
            type="primary"
            :loading="createLoading"
            @click="handleSubmit"
            >提交</el-button
          >
        </div>
      </template>
    </PlusForm>
  </el-card>
</template>
<style scoped>
.el-form {
  margin-right: 50px;
}
</style>
