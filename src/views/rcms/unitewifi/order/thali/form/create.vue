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
  typeId: "",
  isRecommend: "N",
  isGift: "N",
  isSale: "Y",
  limitSpeed: "N",
  giftDuration: 0,
  limitNo: 0,
  sort: 0
});
const disabled = ref(false);
if (props.currentRow) {
  formModel.value = { ...props.currentRow };
  disabled.value = true;
}
const newColumns = [...props.createColumns];
newColumns[0]["colProps"] = { span: 24 };
newColumns.push({
  label: "套餐规则",
  prop: "name12",
  minWidth: 90,
  align: "left",
  valueType: "textarea",
  colProps: {
    span: 24
  }
});
const createRules = {
  packageName: [
    {
      required: true,
      message: "请输入套餐名称"
    }
  ],
  packageType: [
    {
      required: true,
      message: "请选择计费类型"
    }
  ],
  packageCost: [
    {
      required: true,
      message: "请设置套餐成本"
    }
  ],
  packagePrice: [
    {
      required: true,
      message: "请设置销售价格"
    }
  ],
  packageFlow: [
    {
      required: true,
      message: "必填，请设置套餐总流量"
    }
  ],
  packageVoidFlow: [
    {
      required: true,
      message: "必填，请设置套餐虚量"
    }
  ],
  chargeType: [
    {
      required: true,
      message: "必填，请输入正确值"
    }
  ],
  validDuration: [
    {
      required: true,
      message: "必填，请输入正确值"
    }
  ],
  limitSpeed: [
    {
      required: true,
      message: "必填，请输入正确值"
    }
  ],
  giftDuration: [
    {
      required: true,
      message: "必填，请输入正确值"
    }
  ],
  isSale: [
    {
      required: true,
      message: "必填，请输入正确值"
    }
  ],
  limitNo: [
    {
      required: true,
      message: "必填，请输入正确值"
    }
  ],
  isGift: [
    {
      required: true,
      message: "必填，请输入正确值"
    }
  ],
  isRecommend: [
    {
      required: true,
      message: "必填，请输入正确值"
    }
  ],
  sort: [
    {
      required: true,
      message: "必填，请输入正确值"
    }
  ],
  packageRules: [
    {
      required: true,
      message: "必填，请输入正确值"
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
