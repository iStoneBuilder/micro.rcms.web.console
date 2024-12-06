<script setup lang="ts">
import { ref, nextTick } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../../hooks";
import { findSelected } from "@/utils/common";
import { getEnterpriseListByPid } from "@/api/rcms/enterprise";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    higherDeptOptions: [],
    parentId: 0,
    name: "",
    id: "",
    code: "",
    description: "",
    enterpriseId: "",
    isEdit: false,
    merchants: []
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}
const handleChange = value => {
  nextTick(async () => {
    const selected = findSelected(newFormInline.value.higherDeptOptions, value);
    // 设置上级角色所在商户
    newFormInline.value.merchants = [];
    newFormInline.value.enterpriseId = "";
    if (selected) {
      // 加载角色可选商户
      const { data } = await getEnterpriseListByPid({
        parentId: selected?.enterpriseId
      });
      newFormInline.value.merchants = data;
    }
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
        <el-form-item label="角色编码" prop="code">
          <el-input
            v-model="newFormInline.code"
            clearable
            placeholder="请输入角色编码"
            :disabled="newFormInline.isEdit"
          />
        </el-form-item>
      </re-col>
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入角色名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="23" :xs="24" :sm="24">
        <el-form-item label="角色所属" prop="enterpriseId">
          <el-select
            v-model="newFormInline.enterpriseId"
            placeholder="请选择(企业/商户)"
            clearable
            :disabled="newFormInline.isEdit"
          >
            <el-option
              v-for="item in newFormInline.merchants"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
