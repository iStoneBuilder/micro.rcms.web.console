<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../../hooks";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    higherDeptOptions: [],
    enterpriseId: "",
    code: "",
    name: "",
    type: "",
    status: "",
    description: "",
    isEdit: false
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="80px"
  >
    <el-row :gutter="30">
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="账户编码" prop="code">
          <el-input
            v-model="newFormInline.code"
            clearable
            placeholder="请输入账户编码"
            :disabled="newFormInline.isEdit"
          />
        </el-form-item>
      </re-col>
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="账户名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入账户名称"
          />
        </el-form-item>
      </re-col>

      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="所属商户" prop="enterpriseId">
          <el-cascader
            v-model="newFormInline.enterpriseId"
            class="w-full"
            :options="newFormInline.higherDeptOptions"
            :props="{
              value: 'id',
              label: 'name',
              emitPath: false,
              checkStrictly: true
            }"
            clearable
            filterable
            placeholder="请选择所属商户"
            :disabled="newFormInline.isEdit"
          >
            <template #default="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="账户类型" prop="type">
          <el-select
            v-model="newFormInline.type"
            placeholder="请选择账户类型"
            class="w-full"
            clearable
            :disabled="newFormInline.isEdit"
          >
            <el-option label="程序" value="app" />
            <el-option label="账户" value="account" />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="状态">
          <el-switch
            v-model="newFormInline.status"
            inline-prompt
            :active-value="'Y'"
            :inactive-value="'N'"
            active-text="启用"
            inactive-text="停用"
            :style="switchStyle"
          />
        </el-form-item>
      </re-col>

      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="备注">
          <el-input
            v-model="newFormInline.description"
            placeholder="请输入备注信息"
            type="textarea"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
