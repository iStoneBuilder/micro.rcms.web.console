<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { FormProps } from "../utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    code: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-card>
    <el-form ref="ruleFormRef" :model="newFormInline" label-width="80px">
      <el-row :gutter="30">
        <re-col :value="23" :xs="24" :sm="24">
          <el-form-item label="设备组" prop="code">
            <el-input
              v-model="newFormInline.code"
              clearable
              placeholder="请输入账户编码"
            />
          </el-form-item>
        </re-col>
      </el-row>
    </el-form>
  </el-card>
</template>
