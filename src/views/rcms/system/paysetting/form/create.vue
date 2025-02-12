<script setup lang="ts">
import { message } from "@/utils/message";
import { ref, defineProps, defineEmits } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { createRecord, updateRecord } from "@/api/rcms/fram-common";
import { cloneDeep } from "@pureadmin/utils";
const service = "base/pay-config";
// 父节点传值
const props = defineProps<{
  currentRow: any;
  createColumns: PlusColumn[];
}>();
const emit = defineEmits(["dialogEvent"]);
const createLoading = ref(false);
const formModel = ref({
  payConfigId: ""
});
if (props.currentRow) {
  formModel.value = cloneDeep(props.currentRow);
  formModel.value["payType"] = (props.currentRow["payType"] + "").split(",");
}
const newColumns = [...props.createColumns];
const createRules = {
  payWay: [
    {
      required: true,
      message: "请选择支付方式"
    }
  ],
  payType: [
    {
      required: true,
      message: "请选择支付渠道"
    }
  ]
};
async function handleSubmit() {
  createLoading.value = true;
  const submitData = cloneDeep(formModel.value);
  submitData["payType"] = formModel.value["payType"].toString();
  if (formModel.value.payConfigId !== "") {
    // 没有更改
    if (JSON.stringify(props.currentRow) === JSON.stringify(submitData)) {
      message(`数据未更改，请勿提交！`, {
        type: "warning"
      });
      createLoading.value = false;
      return;
    }
    await updateRecord(service, submitData.payConfigId, submitData).catch(
      () => {
        createLoading.value = false;
      }
    );
    if (!createLoading.value) {
      return;
    }
    message(`更新成功！`, {
      type: "success"
    });
  } else {
    await createRecord(service, submitData).catch(() => {
      createLoading.value = false;
    });
    if (!createLoading.value) {
      return;
    }
    message(`创建成功`, {
      type: "success"
    });
  }
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
        span: 12
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
