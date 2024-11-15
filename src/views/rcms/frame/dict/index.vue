<template>
  <div class="rcms-plus-page">
    <PlusPage
      ref="plusPageInstance"
      :columns="columns"
      has-index-column
      :request="getList"
      :search="{
        labelWidth: '100px',
        colProps: { span: 6 },
        showNumber: 3
      }"
      :table="{
        isSelection: true
      }"
      :default-page-info="defaultPageInfo"
      :default-page-size-list="[5, 15, 20, 50]"
    >
      <template #table-title>
        <el-row class="button-row">
          <el-button
            v-if="hasPerms('permission:role:update')"
            type="primary"
            plain
            :icon="Plus"
            @click="handleCreate"
          >
            新增
          </el-button>
          <el-button
            v-if="hasPerms('permission:role:update')"
            type="danger"
            plain
            :icon="Delete"
          >
            删除
          </el-button>
        </el-row>
      </template>
    </PlusPage>
    <!-- 弹窗编辑 -->
    <PlusDialogForm
      v-if="visible"
      v-model:visible="visible"
      v-model="form"
      class="rcms-plus-form"
      :form="{
        columns,
        labelPosition: 'left',
        rules,
        labelWidth: '100px',
        colProps: {
          span: 23
        }
      }"
      :dialog="{
        title: title + '字典项',
        width: '500px',
        top: '12vh',
        loading
      }"
      @confirm="handleSubmit"
      @cancel="handleCancel"
    />
    <PlusDialog
      v-model="show"
      class="rcms-plus-dialog"
      title="字典子项配置"
      width="80%"
      top="5%"
      :hasFooter="false"
    >
      <component
        :is="item.component"
        class="search-form bg-bg_color w-[99/100] pt-[12px] overflow-auto"
      />
    </PlusDialog>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { reactive, computed, toRefs, ref } from "vue";
import type {
  PlusColumn,
  PageInfo,
  PlusPageInstance
} from "plus-pro-components";
import { Plus, Delete } from "@element-plus/icons-vue";
import {
  getClassifyPageList,
  createClassify,
  updateClassify
} from "@/api/rcms/classifyitem";
import { hasPerms } from "@/utils/auth";
import Item from "./item.vue";

import { defaultPageInfo, buildColum, State } from "./hook";
const show = ref(false);

const item = {
  key: "search",
  title: "查询表单",
  component: Item
};

const router = useRouter();

const getList = async (query: PageInfo) => {
  const { page = 1, pageSize = 15 } = query || {};
  const params = query;
  delete params.page;
  delete params.pageSize;
  const { data } = await getClassifyPageList(page, pageSize, params);

  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
};
const plusPageInstance = ref<PlusPageInstance | null>(null);
// 重新请求列表接口
const refresh = () => {
  plusPageInstance.value?.getList();
};

function handleClickButton(e, value, index, row, item) {
  switch (item.name) {
    case "编辑":
      state.form = { ...row } as any;
      state.isCreate = false;
      state.visible = true;
      break;
    case "删除":
      // state.isBatch = false;
      // handleDelete();
      break;
    case "配置":
      show.value = true;
      //router.push({ path: "/system/dict/item" });
      break;
  }
}

const columns: PlusColumn[] = buildColum(handleClickButton);
const REGEXP_CODE = /^[a-zA-Z][a-zA-Z0-9_]*[a-zA-Z]$/;
const state = reactive<State>({
  visible: false,
  loading: false,
  isCreate: false,
  form: {
    classifyName: "",
    classifyCode: "",
    description: ""
  },
  rules: {
    classifyCode: [
      {
        required: true,
        message: "请输入字典项"
      },
      {
        validator: (rule, value, callback) => {
          if (!REGEXP_CODE.test(value)) {
            callback(
              new Error("字典项包含：字母、下划线、数字，必须字母开始结尾")
            );
          }
          if (value.length > 100) {
            callback(new Error("字典项最多包含100个字符"));
          }
          callback();
        },
        trigger: "blur"
      }
    ],
    classifyName: [
      {
        required: true,
        message: "请输入字典项名称"
      },
      {
        validator: (rule, value, callback) => {
          if (value.length > 100) {
            callback(new Error("字典项名称最多包含100个字符"));
          }
          callback();
        },
        trigger: "blur"
      }
    ]
  }
});
const title = computed(() => (state.isCreate ? "新增" : "编辑"));
// 创建
const handleCreate = (): void => {
  state.form = {
    classifyName: "",
    classifyCode: "",
    description: ""
  };
  state.isCreate = true;
  state.visible = true;
};
// 取消
const handleCancel = () => {
  state.visible = false;
};

// 提交表单成功
const handleSubmit = async () => {
  try {
    state.loading = true;
    const params = { ...state.form };
    if (state.isCreate) {
      await createClassify(params);
      message(`${title.value}成功！`, {
        type: "success"
      });
    } else {
      await updateClassify(params.classifyCode, params);
      message(`${title.value}成功！`, {
        type: "success"
      });
    }
    // 关闭弹出框
    handleCancel();
    // 刷新列表
    refresh();
  } catch (error) {}
  state.loading = false;
};

const { form, loading, rules, visible } = toRefs(state);
</script>
