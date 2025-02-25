<script setup lang="ts">
import { ref, nextTick } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { usePublicHooks } from "../../hooks";
import { findSelected } from "@/utils/common";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    higherDeptOptions: [],
    parentId: 0,
    id: "",
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
            placeholder="请选择上级企业(商户)"
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
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入企业(商户)名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="newFormInline.type"
            placeholder="请输入类型(企业/商户)"
            clearable
            :disabled="newFormInline.isEdit"
          >
            <el-option
              v-if="newFormInline.pType === 'platform'"
              label="企业"
              value="enterprise"
            />
            <el-option label="商户" value="merchant" />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="负责人">
          <el-input
            v-model="newFormInline.principal"
            clearable
            placeholder="请输入负责人"
          />
        </el-form-item>
      </re-col>

      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="newFormInline.phone"
            clearable
            placeholder="请输入手机号"
          />
        </el-form-item>
      </re-col>
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="newFormInline.email"
            clearable
            placeholder="请输入邮箱"
          />
        </el-form-item>
      </re-col>

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
