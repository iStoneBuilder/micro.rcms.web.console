<template>
  <div class="rcms-plus-page">
    <PlusPage
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
      :form="{ columns, labelPosition: 'top', rules }"
      :dialog="{
        title: dialogTitle + '用户组',
        width: '500px',
        top: '12vh',
        loading
      }"
      @confirm="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, toRefs } from "vue";
import type { PlusColumn, PageInfo } from "plus-pro-components";
import { Plus, Delete } from "@element-plus/icons-vue";
import { getClassifyPageList } from "@/api/rcms/classifyitem";
import { hasPerms } from "@/utils/auth";

import { defaultPageInfo, buildColum, State } from "./hook";

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

function handleClickButton(e, value, index, row, item) {
  console.log(e, value, index, row, item);
}

const columns: PlusColumn[] = buildColum(handleClickButton);

const state = reactive<State>({
  visible: false,
  loading: false,
  isCreate: true,
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
      }
    ],
    classifyName: [
      {
        required: true,
        message: "请输入字典项名称"
      }
    ]
  }
});
const dialogTitle = computed(() => (state.isCreate ? "新增" : "编辑"));
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
    // if (state.isCreate) {
    //   await GroupServe.create(params);
    //   ElMessage.success("创建成功");
    // } else {
    //   await GroupServe.update(params);
    //   ElMessage.success("更新成功");
    // }
    // handleCancel();
    // refresh();
  } catch (error) {}
  state.loading = false;
};

const { form, loading, rules, visible } = toRefs(state);
</script>
