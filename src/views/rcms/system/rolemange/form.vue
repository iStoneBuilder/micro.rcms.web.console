<script setup lang="ts">
import { ref, nextTick } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { usePublicHooks } from "../hooks";
import { findSelected } from "@/utils/common";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    higherDeptOptions: [],
    parentId: 0,
    name: "",
    principal: "",
    phone: "",
    email: "",
    sort: 0,
    status: "Y",
    remark: "",
    type: "",
    level: 0,
    isEdit: false,
    pType: ""
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}
const handleChange = value => {
  nextTick(() => {
    const selected = findSelected(newFormInline.value.higherDeptOptions, value);
    newFormInline.value.pType = selected.type;
  });
};

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
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="上级" prop="parentId">
          <el-cascader
            ref="pemRef"
            v-model="newFormInline.parentId"
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
            placeholder="请选择上级角色"
            :disabled="newFormInline.isEdit"
            @change="handleChange"
          >
            <template #default="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="角色编码" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入角色编码"
          />
        </el-form-item>
      </re-col>
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="角色名称">
          <el-input
            v-model="newFormInline.principal"
            clearable
            placeholder="请输入角色名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="角色所属" prop="type">
          <el-select
            v-model="newFormInline.type"
            placeholder="请选择(企业/商户)"
            clearable
            :disabled="newFormInline.isEdit"
          >
            <el-option label="企业" value="enterprise" />
            <el-option label="商户" value="merchant" />
          </el-select>
        </el-form-item>
      </re-col>
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
