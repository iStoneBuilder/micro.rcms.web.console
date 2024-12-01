<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import type { PlusColumn } from "plus-pro-components";
// 父节点传值
const props = defineProps<{
  currentRow: any;
}>();
const emit = defineEmits(["createEvent"]);
const createLoading = ref(false);
const formModel = {};
const createColumns: PlusColumn[] = [
  {
    label: "类型名称",
    prop: "typeName"
  },
  {
    label: "类型编号",
    prop: "typeCode"
  },
  {
    label: "销售名称",
    prop: "sellName"
  },
  {
    label: "设备型号",
    prop: "deviceNo"
  },
  {
    label: "本地卡模式",
    prop: "cardMode"
  },
  {
    label: "备注",
    prop: "remark",
    valueType: "textarea"
  }
];
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
  cardMode: [
    {
      required: true,
      message: "请选择卡模式"
    }
  ]
};
function handleSubmit() {}
function handleClose() {
  emit("createEvent");
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
            @click="handleClose"
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
