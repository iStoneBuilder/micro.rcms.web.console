<script setup lang="ts">
import { message } from "@/utils/message";
import { ref, defineProps, defineEmits } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { getItemList } from "@/api/rcms/common";
import { createRecord, updateRecord } from "@/api/mifi/device-type";
// 父节点传值
const props = defineProps<{
  currentRow: any;
  createColumns: PlusColumn[];
}>();
const emit = defineEmits(["createEvent"]);
const createLoading = ref(false);
const formModel = ref({
  deviceNo: "MIFI",
  localCardMode: "Y",
  typeId: ""
});
const disabled = ref(false);
if (props.currentRow) {
  formModel.value = { ...props.currentRow };
  disabled.value = true;
}
const newColumns = [...props.createColumns];
newColumns[0]["colProps"] = { span: 22 };
newColumns.push({
  label: "套餐规则",
  prop: "name12",
  minWidth: 90,
  align: "left",
  valueType: "textarea",
  colProps: {
    span: 22
  }
});
const createRules = {
  typeName: [
    {
      required: true,
      message: "请输入类型名称"
    }
  ],
  typeCode: [
    {
      required: true,
      message: "请输入类型编号"
    }
  ],
  sellName: [
    {
      required: true,
      message: "请输入销售名称"
    }
  ],
  deviceNo: [
    {
      required: true,
      message: "请现在设备型号"
    }
  ],
  localCardMode: [
    {
      required: true,
      message: "请选择卡模式"
    }
  ]
};
async function handleSubmit() {
  if (formModel.value.typeId !== "") {
    // 没有更改
    if (JSON.stringify(props.currentRow) === JSON.stringify(formModel.value)) {
      message(`数据未更改，请勿提交！`, {
        type: "warning"
      });
      return;
    }
    createLoading.value = true;
    await updateRecord(formModel.value.typeId, formModel.value);
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
  emit("createEvent", op);
}
</script>

<template>
  <el-card>
    <PlusForm
      ref="createFormRef"
      v-model="formModel"
      labelWidth="120"
      labelPosition="right"
      :columns="newColumns"
      :rules="createRules"
      footerAlign="center"
      :row-props="{ gutter: 20 }"
      :col-props="{
        span: 11
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
