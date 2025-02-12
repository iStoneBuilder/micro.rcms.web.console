<!--设备充值-->
<template>
  <el-card>
    <PlusForm
      ref="chargeFormRef"
      v-model="chargeForm"
      labelWidth="110"
      labelPosition="right"
      :columns="chargeColumns"
      :rules="chargeRules"
      footerAlign="center"
      :row-props="{ gutter: 20 }"
      :col-props="{
        span: 22
      }"
      @submit="handleSubmit"
    >
      <template #plus-field-isGift>
        <Segmented
          :modelValue="chargeForm.isGift ? 'true' : 'false'"
          :options="isGiftOptions"
          @change="
            ({ option: { value } }) => {
              chargeForm.isGift = value;
            }
          "
        />
      </template>
      <template #footer="{ handleSubmit }">
        <div style="margin: 0 auto">
          <el-button
            type="primary"
            plain
            :disabled="chargeLoading"
            @click="handleClose('cancel')"
            >取消</el-button
          >
          <el-button
            type="primary"
            :loading="chargeLoading"
            @click="handleSubmit"
            >提交</el-button
          >
        </div>
      </template>
    </PlusForm>
  </el-card>
</template>

<script setup lang="ts">
import type { OptionsType } from "@/components/ReSegmented";
import Segmented from "@/components/ReSegmented";
import { getBussList } from "@/api/rcms/fram-common";
import { ref, defineEmits } from "vue";

const emit = defineEmits(["dialogEvent"]);
const chargeLoading = ref(false);
const chargeForm = {
  isGift: "false"
};
const isGiftOptions: Array<OptionsType> = [
  {
    label: "否",
    tip: "选择非赠送套餐",
    value: true
  },
  {
    label: "是",
    tip: "选择赠送套餐",
    value: false
  }
];
const chargeColumns = [
  {
    label: "是否赠送",
    prop: "isGift"
  },
  {
    label: "套餐",
    valueType: "select",
    prop: "dataPlan",
    options: getBussList(
      "/test/services/api/mifi-device/device-type/records",
      "typeName",
      "typeCode"
    )
  }
];
const chargeRules = {
  dataPlan: [
    {
      required: true,
      message: "请选择套餐"
    }
  ]
};
const handleSubmit = function () {};
const handleClose = function (op?: string) {
  emit("dialogEvent", op);
};
</script>
