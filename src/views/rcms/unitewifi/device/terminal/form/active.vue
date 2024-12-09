<!--设备激活-->
<script setup lang="tsx">
import type { PlusColumn } from "plus-pro-components";
import { updateRecordGroup } from "@/api/mifi/device-manage";
import { getBussList } from "@/api/rcms/fram-common";
import { message } from "@/utils/message";
import { ref, defineEmits, defineProps } from "vue";
const props = defineProps<{
  currentRow: Array<any>;
}>();
const groupLoading = ref(false);
const emit = defineEmits(["dialogEvent"]);
const groupForm = ref({
  deviceGroup: "",
  tips: "已绑定用户设备，不选择用户时，即设备解绑用户"
});
const groupColumns: PlusColumn[] = [
  {
    label: "用户",
    valueType: "select",
    prop: "deviceGroup",
    options: getBussList(
      "/test/services/rcms/mifi/device-group/records",
      "groupName,groupId",
      "groupId"
    )
  },
  {
    label: "温馨提示",
    valueType: "text",
    prop: "tips",
    renderField: value => {
      return <div style="color: red;font-size: 12px;">{value}</div>;
    }
  }
];
const importRules = {};
async function handleSubmit() {
  groupLoading.value = true;
  const submitData = [...props.currentRow];
  submitData.forEach(item => {
    item.deviceGroup = groupForm.value.deviceGroup;
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
      labelWidth="80"
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
      <template #plus-label-tips="{ label }">
        <span style="color: red; font-size: 12px">{{ label + ":" }}</span>
      </template>
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
