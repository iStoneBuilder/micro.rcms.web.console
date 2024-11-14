<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./rule";
import { FormProps } from "./types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    name: "",
    code: "",
    remark: "",
    sort: 1
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props?.formInline);

function getRef() {
  return ruleFormRef.value;
}
// 用于父页面取值
defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <!-- 输入框 -->
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入企业(商户)名称"
          />
        </el-form-item>
      </re-col>
      <!-- 下拉框 -->
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="newFormInline.id"
            placeholder="请输入类型(企业/商户)"
            clearable
          >
            <el-option label="企业" value="enterprise" />
            <el-option label="商户" value="merchant" />
          </el-select>
        </el-form-item>
      </re-col>
      <!-- 排序 -->
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="排序">
          <el-input-number
            v-model="newFormInline.sort"
            class="!w-full"
            :min="0"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <!-- 备注 -->
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="备注">
          <el-input
            v-model="newFormInline.remark"
            placeholder="请输入备注信息"
            type="textarea"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
