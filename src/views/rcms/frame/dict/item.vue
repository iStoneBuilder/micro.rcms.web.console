<template>
  <div class="rcms-plus-page">
    <PlusPage
      ref="plusPageInstance"
      :columns="columns"
      :request="getList"
      :search="{
        labelWidth: '100px',
        colProps: { span: 6 },
        showNumber: 3
      }"
      :table="{
        hasIndexColumn: true,
        isSelection: true,
        adaptive: { offsetBottom: 100 }
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
            @click="handleDelete({}, true)"
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
        labelWidth: '80px',
        rules,
        colProps: { span: 23 },
        rowProps: { gutter: 24 }
      }"
      :dialog="{
        title: title + '字典子项',
        width: '40%',
        top: '10vh',
        loading
      }"
      @confirm="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { reactive, computed, toRefs, ref, defineProps } from "vue";
import type {
  PlusColumn,
  PageInfo,
  PlusPageInstance
} from "plus-pro-components";
import { Plus, Delete } from "@element-plus/icons-vue";
import {
  getClassifyItemList,
  createClassifyItem,
  updateClassifyItem,
  deleteClassifyItem
} from "@/api/rcms/classifyitem";
import { hasPerms } from "@/utils/auth";
import { defaultPageInfo, buildChildColum, ChildState } from "./hook";

const router = useRouter();
const props = defineProps<{
  currentRow: any;
}>();
const getList = async (query: PageInfo & { classifyCode: string }) => {
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  params.classifyCode = props.currentRow.classifyCode;
  const { data } = await getClassifyItemList(page, pageSize, params);

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
      handleDelete(row, false);
      break;
  }
}

const columns: PlusColumn[] = buildChildColum(handleClickButton);
const REGEXP_CODE = /^[a-zA-Z][a-zA-Z0-9_]*[a-zA-Z]$/;
const state = reactive<ChildState>({
  visible: false,
  loading: false,
  isCreate: false,
  form: {
    itemId: "",
    itemCode: "",
    itemName: "",
    description: ""
  },
  rules: {
    itemCode: [
      {
        required: true,
        message: "请输入项编码"
      },
      {
        validator: (rule, value, callback) => {
          if (value.length > 50) {
            callback(new Error("字典项最多包含50个字符"));
          }
          callback();
        },
        trigger: "blur"
      }
    ],
    itemName: [
      {
        required: true,
        message: "请输入字典项名称"
      },
      {
        validator: (rule, value, callback) => {
          if (value.length > 50) {
            callback(new Error("字典项名称最多包含50个字符"));
          }
          callback();
        },
        trigger: "blur"
      }
    ],
    language: [
      {
        required: true,
        message: "请选择语言"
      }
    ],
    itemIndex: [
      {
        required: true,
        message: "请设置排序"
      }
    ],
    isEnabled: [
      {
        required: true,
        message: "是否启用"
      }
    ]
  }
});
const title = computed(() => (state.isCreate ? "新增" : "编辑"));
// 创建
const handleCreate = (): void => {
  state.form = {
    itemId: "",
    itemCode: "",
    itemName: "",
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
      await createClassifyItem(params);
      message(`${title.value}成功！`, {
        type: "success"
      });
    } else {
      await updateClassifyItem(params.itemId, params);
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

const handleDelete = async (row, isBatch) => {
  state.loading = true;
  await deleteClassifyItem(row);
  message(`删除成功！`, {
    type: "success"
  });
  state.loading = false;
};

const { form, loading, rules, visible } = toRefs(state);
</script>
