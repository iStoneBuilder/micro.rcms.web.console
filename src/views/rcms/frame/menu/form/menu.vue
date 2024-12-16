<template>
  <el-card>
    <PlusForm
      ref="menuFormRef"
      v-model="menuForm"
      labelWidth="110"
      labelPosition="right"
      :columns="menuColumns"
      :rules="menuRules"
      footerAlign="center"
      :row-props="{ gutter: 20 }"
      :col-props="{
        span: 12
      }"
      @submit="handleSubmit"
    >
      <template #plus-field-parentId>
        <el-cascader
          v-model="menuForm.parentId"
          class="w-full"
          :options="higherMenuOptions"
          :props="{
            value: 'id',
            label: 'title',
            emitPath: false,
            checkStrictly: true
          }"
          clearable
          filterable
          placeholder="请选择上级菜单"
        >
          <template #default="{ node, data }">
            <span>{{ transformI18n(data.title) }}</span>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          </template>
        </el-cascader>
      </template>
      <template #plus-field-icon>
        <IconSelect v-model="menuForm.icon" class="w-full" />
      </template>
      <template #plus-field-enterTransition>
        <ReAnimateSelector
          v-model="menuForm.enterTransition"
          placeholder="请选择页面进场加载动画"
        />
      </template>
      <template #plus-field-leaveTransition>
        <ReAnimateSelector
          v-model="menuForm.leaveTransition"
          placeholder="请选择页面离场加载动画"
        />
      </template>
      <template #plus-field-showLink>
        <Segmented
          :modelValue="menuForm.showLink ? 'true' : 'false'"
          :options="showLinkOptions"
          @change="
            ({ option: { value } }) => {
              menuForm.showLink = value;
            }
          "
        />
      </template>
      <template #plus-field-keepAlive>
        <Segmented
          :modelValue="menuForm.keepAlive ? 'true' : 'false'"
          :options="keepAliveOptions"
          @change="
            ({ option: { value } }) => {
              menuForm.keepAlive = value;
            }
          "
        />
      </template>
      <template #footer="{ handleSubmit }">
        <div style="margin: 0 auto">
          <el-button
            type="primary"
            plain
            :disabled="menuLoading"
            @click="handleClose"
            >取消</el-button
          >
          <el-button
            type="primary"
            :loading="menuLoading"
            @click="handleSubmit"
          >
            提交
          </el-button>
        </div>
      </template>
    </PlusForm>
  </el-card>
</template>

<script lang="tsx" setup>
import type { OptionsType } from "@/components/ReSegmented";
import Segmented from "@/components/ReSegmented";
import ReAnimateSelector from "@/components/ReAnimateSelector";
import { IconSelect } from "@/components/ReIcon";
import { transformI18n } from "@/plugins/i18n";
import { ref, defineProps, defineEmits } from "vue";
import { cloneDeep } from "@pureadmin/utils";
import type { PlusColumn } from "plus-pro-components";
import { createMenu, updateMenu } from "@/api/rcms/menu";
import { message } from "@/utils/message";

const props = defineProps<{
  currRow: object;
  dataList: Array<any>;
}>();
const emit = defineEmits(["dialogEvent"]);

const menuLoading = ref(false);
const menuForm = ref({
  id: "",
  parentId: "",
  icon: "",
  enterTransition: "",
  leaveTransition: "",
  showLink: 1,
  keepAlive: 1
});
const isCreate = JSON.stringify(props.currRow) === "{}";
if (!isCreate) {
  menuForm.value = cloneDeep(props.currRow);
}
const higherMenuOptions = fHgMuOptions(props.dataList);

const showLinkOptions: Array<OptionsType> = [
  {
    label: "显示",
    tip: "会在菜单中显示",
    value: true
  },
  {
    label: "隐藏",
    tip: "不会在菜单中显示",
    value: false
  }
];
const keepAliveOptions: Array<OptionsType> = [
  {
    label: "缓存",
    tip: "会保存该页面的整体状态，刷新后会清空状态",
    value: true
  },
  {
    label: "不缓存",
    tip: "不会保存该页面的整体状态",
    value: false
  }
];
const menuColumns: PlusColumn[] = [
  {
    label: "上级菜单",
    prop: "parentId"
  },
  {
    label: "菜单排序",
    prop: "rankSort",
    valueType: "input-number",
    fieldProps: { precision: 0, step: 1, min: 0, max: 99999999 }
  },
  {
    label: "菜单名称",
    prop: "title"
  },
  {
    label: "路由名称",
    prop: "name"
  },
  {
    label: "路由路径",
    prop: "path"
  },
  {
    label: "组件路径",
    prop: "component"
  },
  {
    label: "路由重定向",
    prop: "redirect"
  },
  {
    label: "菜单激活",
    prop: "activePath"
  },
  {
    label: "菜单图标",
    prop: "icon"
  },
  {
    label: "右侧图标",
    prop: "extraIcon"
  },
  {
    label: "进场动画",
    prop: "enterTransition"
  },
  {
    label: "离场动画",
    prop: "leaveTransition"
  },
  {
    label: "是否显示",
    prop: "showLink"
  },
  {
    label: "缓存页面",
    prop: "keepAlive"
  }
];
const menuRules = {
  title: [{ required: true, message: "菜单名称为必填项", trigger: "blur" }],
  name: [{ required: true, message: "路由名称为必填项", trigger: "blur" }],
  path: [{ required: true, message: "路由路径为必填项", trigger: "blur" }],
  auths: [{ required: true, message: "权限标识为必填项", trigger: "blur" }]
};

function fHgMuOptions(treeList) {
  if (!treeList || !treeList.length) return;
  const newTreeList = [];
  for (let i = 0; i < treeList.length; i++) {
    treeList[i].title = transformI18n(treeList[i].title);
    fHgMuOptions(treeList[i].children);
    newTreeList.push(treeList[i]);
  }
  return newTreeList;
}
const handleSubmit = async function () {
  if (isCreate) {
    await createMenu(menuForm.value);
  } else {
    await updateMenu(menuForm.value.id, menuForm);
  }
  message(`操作成功！`, {
    type: "success"
  });
  handleClose();
};
const handleClose = function () {
  emit("dialogEvent");
};
</script>

<style></style>
