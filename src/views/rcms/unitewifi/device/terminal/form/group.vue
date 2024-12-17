<!--
设备分组
需要判断选择数据为同一商户数据
-->
<script setup lang="ts">
import { updateRecordGroup } from "@/api/mifi/device-manage";
import { getBussList } from "@/api/rcms/fram-common";
import { message } from "@/utils/message";
import { ref, defineEmits, defineProps } from "vue";
const props = defineProps<{
  currentRow: Array<any>;
}>();
const groupLoading = ref(false);
const emit = defineEmits(["dialogEvent"]);
const groupForm = ref({ deviceGroup: "" });
const groupColumns = [
  {
    label: "设备组",
    valueType: "select",
    prop: "deviceGroup",
    options: getBussList(
      "/test/services/api/mifi/device-group/records",
      "groupName,groupId",
      "groupId",
      {
        enterpriseId: props.currentRow[0].enterpriseId
      }
    )
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
