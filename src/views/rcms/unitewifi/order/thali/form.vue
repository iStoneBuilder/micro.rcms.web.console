<script setup lang="ts">
import { ref, withDefaults, defineProps } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({ name: "", id: "", code: "", sort: 0, remark: "" })
});

const ruleFormRef = ref();
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
    label-width="120px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="套餐名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入套餐名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="计费类型" prop="type">
          <el-select
            v-model="newFormInline.name"
            placeholder="请选择计费类型"
            clearable
          >
            <el-option label="累积计费" value="enterprise" />
            <el-option label="按月计费" value="merchant" />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="成本价格(¥)">
          <el-input-number
            v-model="newFormInline.sort"
            class="!w-full"
            :min="0"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="套餐价格(¥)">
          <el-input-number
            v-model="newFormInline.sort"
            class="!w-full"
            :min="0"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="套餐总流量(GB)">
          <el-input-number
            v-model="newFormInline.sort"
            class="!w-full"
            :min="0"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="套餐5G流量(GB)">
          <el-input-number
            v-model="newFormInline.sort"
            class="!w-full"
            :min="0"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="有效时长" prop="type">
          <el-select v-model="newFormInline.name" clearable>
            <el-option label="1天" value="enterp1rise" />
            <el-option label="5天" value="enterpr2ise" />
            <el-option label="7天" value="enterpri3se" />
            <el-option label="10天" value="enterpri4se" />
            <el-option label="1个月" value="enterpri5se" />
            <el-option label="2个月" value="enterpris6e" />
            <el-option label="3个月" value="enterprise7" />
            <el-option label="半年" value="enterpri8se" />
            <el-option label="1年" value="enterpr9ise" />
            <el-option label="2年" value="enterpri11se" />
            <el-option label="3年" value="enterprise12" />
            <el-option label="永久有效" value="enterpr23ise" />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="赠送月份">
          <el-input-number
            v-model="newFormInline.sort"
            class="!w-full"
            :min="0"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="限制购买次数">
          <el-input-number
            v-model="newFormInline.sort"
            class="!w-full"
            :min="0"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否限速" prop="type">
          <el-select v-model="newFormInline.name" clearable>
            <el-option label="是" value="enterprise" />
            <el-option label="否" value="merchant" />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否上架" prop="type">
          <el-select v-model="newFormInline.name" clearable>
            <el-option label="是" value="enterprise" />
            <el-option label="否" value="merchant" />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否赠送" prop="type">
          <el-select v-model="newFormInline.name" clearable>
            <el-option label="是" value="enterprise" />
            <el-option label="否" value="merchant" />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="套餐图片">
          <el-input
            v-model="newFormInline.remark"
            placeholder="请输入备注信息"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
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
      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="使用规则">
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
