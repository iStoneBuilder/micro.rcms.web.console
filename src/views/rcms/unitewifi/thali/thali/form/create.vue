<script setup lang="ts">
import { message } from "@/utils/message";
import { ref, defineProps, defineEmits } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { createRecord, updateRecord } from "@/api/rcms/fram-common";
const service = "mifi-flow/data-plan";
// 父节点传值
const props = defineProps<{
  currentRow: any;
  createColumns: PlusColumn[];
}>();
const emit = defineEmits(["dialogEvent"]);
const createLoading = ref(false);
const formModel = ref({
  dataPlanNo: "",
  dataPlanType: "domestic",
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
  prop: "dataPlanRules",
  minWidth: 90,
  align: "left",
  valueType: "textarea",
  colProps: {
    span: 24
  }
});
const createRules = {
  dataPlanName: [
    {
      required: true,
      message: "请输入套餐名称"
    }
  ],
  dataPlanType: [
    {
      required: true,
      message: "请选择计费类型"
    }
  ],
  dataPlanCost: [
    {
      required: true,
      message: "请设置套餐成本"
    }
  ],
  dataPlanPrice: [
    {
      required: true,
      message: "请设置销售价格"
    }
  ],
  dataPlanFlow: [
    {
      required: true,
      message: "必填，请设置套餐总流量"
    }
  ],
  dataPlanVoidFlow: [
    {
      required: true,
      message: "必填，请设置套餐虚量"
    }
  ],
  chargeType: [
    {
      required: true,
      message: "必填，请选择计费类型"
    }
  ],
  validDuration: [
    {
      required: true,
      message: "必填，请设置有效期"
    }
  ],
  limitSpeed: [
    {
      required: true,
      message: "必填，请选择是否限速"
    }
  ],
  giftDuration: [
    {
      required: true,
      message: "必填，请设置赠送月份"
    }
  ],
  isSale: [
    {
      required: true,
      message: "必填，请选择是否上架"
    }
  ],
  limitNo: [
    {
      required: true,
      message: "必填，请输入限制购买次数"
    }
  ],
  isGift: [
    {
      required: true,
      message: "必填，请选择是否赠送"
    }
  ],
  isRecommend: [
    {
      required: true,
      message: "必填，请选择是否推荐"
    }
  ],
  sort: [
    {
      required: true,
      message: "必填，请输入排序值"
    }
  ],
  dataPlanRules: [
    {
      required: true,
      message: "必填，请输入套餐规则"
    }
  ]
};
async function handleSubmit() {
  createLoading.value = true;
  if (formModel.value.dataPlanNo !== "") {
    // 没有更改
    if (JSON.stringify(props.currentRow) === JSON.stringify(formModel.value)) {
      message(`数据未更改，请勿提交！`, {
        type: "warning"
      });
      createLoading.value = false;
      return;
    }
    await updateRecord(
      service,
      formModel.value.dataPlanNo,
      formModel.value
    ).catch(() => {
      createLoading.value = false;
    });
    if (!createLoading.value) {
      return;
    }
    message(`更新成功！`, {
      type: "success"
    });
  } else {
    await createRecord(service, formModel.value).catch(() => {
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
