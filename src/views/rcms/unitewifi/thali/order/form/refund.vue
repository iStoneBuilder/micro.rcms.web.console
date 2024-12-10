<!--
设备分组
需要判断选择数据为同一商户数据
-->
<script setup lang="tsx">
import { updateRecordGroup } from "@/api/mifi/device-manage";
import { getBussList } from "@/api/rcms/fram-common";
import { message } from "@/utils/message";
import { PlusColumn } from "plus-pro-components";
import { ref, defineEmits, defineProps, computed } from "vue";
import Segmented from "@/components/ReSegmented";

const props = defineProps<{
  currentRow: object;
}>();
const refundLoading = ref(false);
const emit = defineEmits(["dialogEvent"]);
const refundForm = ref({
  refundWay: "full-refund",
  refundAmount: props.currentRow["orderAmount"] || 0,
  orderAmount: ""
});
refundForm.value = { ...refundForm.value, ...props.currentRow };
const refundColumns: PlusColumn[] = [
  {
    label: "订单号",
    prop: "orderNo",
    fieldProps: {
      disabled: true
    }
  },
  {
    label: "订单金额",
    prop: "orderAmount",
    valueType: "input-number",
    fieldProps: {
      disabled: true,
      precision: 2,
      step: 1
    }
  },
  {
    label: "退款类型",
    prop: "refundWay",
    valueType: "select"
  },
  {
    label: "退款金额",
    prop: "refundAmount",
    valueType: "input-number",
    fieldProps: computed(() => ({
      disabled: refundForm.value["refundWay"] !== "customize",
      precision: 2,
      step: 1,
      min: 0,
      max: props.currentRow["orderAmount"]
    }))
  }
];
const importRules = {
  deviceGroup: [
    {
      required: true,
      message: "请选择设备组"
    }
  ]
};

const keepAliveOptions: Array<any> = [
  {
    label: "全额退款",
    tip: "按照购买订单的总金额退款",
    value: "full-refund"
  },
  {
    label: "按用量退款",
    tip: "总金额*(已使用量/套餐总量)，已使用量不满1G按1G计算",
    value: "calculate"
  },
  {
    label: "自定义退款",
    tip: "自定义退款最大值不能大于订单总金额",
    value: "customize"
  }
];
async function handleSubmit() {
  // refundLoading.value = true;
  // const submitData = [...props.currentRow];
  // submitData.forEach(item => {
  //   item.deviceGroup = refundForm.value.deviceGroup;
  // });
  // await updateRecordGroup(submitData);
  // message(`操作成功！`, {
  //   type: "success"
  // });
  // handleClose("submit");
}
function handleClose(op) {
  emit("dialogEvent", op);
}
</script>

<template>
  <el-card>
    <PlusForm
      ref="importFormRef"
      v-model="refundForm"
      labelWidth="110"
      labelPosition="right"
      :columns="refundColumns"
      :rules="importRules"
      footerAlign="center"
      :row-props="{ gutter: 20 }"
      :col-props="{
        span: 22
      }"
      @submit="handleSubmit"
    >
      <template #plus-field-refundWay>
        <Segmented
          :modelValue="refundForm.refundWay"
          :options="keepAliveOptions"
          @change="
            ({ option: { value, tip } }) => {
              refundForm.refundWay = value;
              if (value === 'full-refund') {
                refundForm.refundAmount = refundForm['orderAmount'];
              } else {
                refundForm.refundAmount = '';
              }
            }
          "
        />
      </template>
      <template #footer="{ handleSubmit }">
        <div style="margin: 0 auto">
          <el-button
            type="primary"
            plain
            :disabled="refundLoading"
            @click="handleClose('cancel')"
            >取消</el-button
          >
          <el-button
            type="primary"
            :loading="refundLoading"
            @click="handleSubmit"
            >提交</el-button
          >
        </div>
      </template>
    </PlusForm>
  </el-card>
</template>
