<!--设备控制-->
<script setup lang="tsx">
import type { PlusColumn } from "plus-pro-components";
import { updateRecordGroup } from "@/api/mifi/device-manage";
import { getBussList, getItemList } from "@/api/rcms/common";
import { message } from "@/utils/message";
import { ref, defineEmits, defineProps, computed } from "vue";
const props = defineProps<{
  currentRow: Array<any>;
}>();
const groupLoading = ref(false);
const emit = defineEmits(["dialogEvent"]);
const groupForm = ref({
  opType: ""
});
const groupColumns: PlusColumn[] = [
  {
    label: "操作项",
    valueType: "select",
    prop: "opType",
    options: getItemList("MIFI_DEVICE_CONTROL")
  },
  {
    label: "控制参数",
    prop: "opParam"
  }
];
const importRules = {
  opType: [
    {
      required: true,
      message: "请选择操作项"
    }
  ]
};
async function handleSubmit() {
  groupLoading.value = true;
  const submitData = [...props.currentRow];
  submitData.forEach(item => {
    item.deviceGroup = groupForm.value.opType;
  });
  await updateRecordGroup(submitData);
  message(`操作成功！`, {
    type: "success"
  });
  handleClose("submit");
}
function handleClose(op) {
  emit("dialogEvent", op);
}
</script>

<template>
  <el-card>
    <PlusForm
      ref="importFormRef"
      v-model="groupForm"
      labelWidth="100"
      labelPosition="right"
      :columns="groupColumns"
      :rules="importRules"
      footerAlign="center"
      :row-props="{ gutter: 20 }"
      :col-props="{
        span: 22
      }"
      @submit="handleSubmit"
    >
      <template #footer="{ handleSubmit }">
        <div style="margin: 0 auto">
          <el-button
            type="primary"
            plain
            :disabled="groupLoading"
            @click="handleClose('cancel')"
            >取消</el-button
          >
          <el-button
            type="primary"
            :loading="groupLoading"
            @click="handleSubmit"
            >提交</el-button
          >
        </div>
      </template>
    </PlusForm>
  </el-card>
</template>
