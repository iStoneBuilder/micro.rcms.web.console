<script setup lang="ts">
import { message } from "@/utils/message";
import { ref, defineProps, defineEmits } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { createRecord, updateRecord } from "@/api/mifi/device-group";
// 父节点传值
const props = defineProps<{
  currentRow: any;
}>();
const emit = defineEmits(["dialogEvent"]);
const createLoading = ref(false);
const formModel = ref({
  groupId: ""
});
const disabled = ref(false);
if (props.currentRow) {
  formModel.value = { ...props.currentRow };
  disabled.value = true;
}
const createColumns: PlusColumn[] = [
  {
    label: "设备组",
    prop: "groupName"
  },
  {
    label: "备注",
    prop: "remark",
    valueType: "textarea"
  }
];
const createRules = {
  groupName: [
    {
      required: true,
      message: "请输入类型名称"
    }
  ]
};
async function handleSubmit() {
  if (formModel.value.groupId !== "") {
    // 没有更改
    if (JSON.stringify(props.currentRow) === JSON.stringify(formModel.value)) {
      message(`数据未更改，请勿提交！`, {
        type: "warning"
      });
      return;
    }
    createLoading.value = true;
    await updateRecord(formModel.value.groupId, formModel.value);
    message(`更新成功！`, {
      type: "success"
    });
  } else {
    createLoading.value = true;
    await createRecord(formModel.value);
    message(`创建成功`, {
      type: "success"
    });
  }
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
      labelWidth="110"
      labelPosition="right"
      :columns="createColumns"
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
