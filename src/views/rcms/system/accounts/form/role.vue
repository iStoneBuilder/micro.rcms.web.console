<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { RoleFormProps } from "../utils/types";

const props = withDefaults(defineProps<RoleFormProps>(), {
  formInline: () => ({
    code: "",
    name: "",
    merchant: "",
    roleOptions: [],
    ids: []
  })
});

const newFormInline = ref(props.formInline);
</script>

<template>
  <el-form :model="newFormInline">
    <el-row :gutter="30">
      <re-col>
        <el-form-item label="账户编码">
          <el-input v-model="newFormInline.code" disabled />
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="账户名称">
          <el-input v-model="newFormInline.name" disabled />
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="账户所属">
          <el-input v-model="newFormInline.merchant" disabled />
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="角色列表">
          <el-select
            v-model="newFormInline.ids"
            placeholder="请选择"
            class="w-full"
            clearable
            multiple
          >
            <el-option
              v-for="(item, index) in newFormInline.roleOptions"
              :key="index"
              :value="item.code"
              :label="item.name"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
