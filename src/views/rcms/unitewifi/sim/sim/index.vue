<template>
  <div>
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
          adaptive: { offsetBottom: 70 }
        }"
        :default-page-info="defaultPageInfo"
        :default-page-size-list="[5, 15, 20, 50]"
      >
        <template #table-title>
          <el-row class="button-row">
            <el-button
              type="primary"
              plain
              :icon="useRenderIcon(Upload)"
              @click="importData"
            >
              SIM卡导入
            </el-button>
            <el-button
              type="primary"
              plain
              :icon="useRenderIcon(Download)"
              @click="downloadTemp"
            >
              下载模板
            </el-button>
            <el-button type="primary" plain :icon="Compass">
              停机/复机
            </el-button>
            <el-button type="primary" plain :icon="useRenderIcon(Check)">
              流量校准
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
          columns: editColumns,
          labelPosition: 'left',
          rules,
          labelWidth: '120px',
          colProps: { span: 11 },
          rowProps: { gutter: 24 }
        }"
        :dialog="{
          title: title + 'SIM卡',
          width: '800px',
          top: '12vh',
          loading
        }"
        @confirm="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
    <!-- 导入 -->
    <PlusDialog
      v-model="show"
      :title="'SIM卡导入'"
      :hasFooter="false"
      :showClose="false"
      width="500"
      top="5%"
      @close="handleClose"
    >
      <template #default>
        <el-card>
          <PlusForm
            v-if="show"
            ref="importFormRef"
            v-model="importForm"
            labelWidth="110"
            labelPosition="right"
            :columns="importColumns"
            :rules="importRules"
            footerAlign="center"
            @submit="handleSubmit"
          >
            <template #plus-field-importBtn>
              <div>
                <input type="file" accept=".xlsx,.xls" />
              </div>
            </template>
            <template #footer="{ handleSubmit }">
              <div style="margin: 0 auto">
                <el-button
                  type="primary"
                  :disabled="importLoading"
                  @click="handleClose"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  :loading="importLoading"
                  @click="handleSubmit"
                  >提交</el-button
                >
              </div>
            </template>
          </PlusForm>
        </el-card>
      </template>
    </PlusDialog>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { message } from "@/utils/message";
import { reactive, computed, toRefs, ref } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import type {
  PlusColumn,
  PageInfo,
  PlusPageInstance,
  FieldValues
} from "plus-pro-components";
import { Plus, Compass } from "@element-plus/icons-vue";
import {
  getMerchantPageList,
  createMerchant,
  updateMerchant,
  deleteMerchant
} from "@/api/rcms/merchant";
import { hasPerms } from "@/utils/auth";
import {
  defaultPageInfo,
  buildColum,
  State,
  buildEditColum,
  excelTemp
} from "./hook";
import { buildExcelTemp } from "@/utils/xlsxHandle";

import { Setting, EditPen } from "@element-plus/icons-vue";
import Delete from "@iconify-icons/ep/delete";
import Upload from "@iconify-icons/ep/upload";
import Check from "@iconify-icons/ep/circle-check";
import Download from "@iconify-icons/ep/download";

const currentRow = ref({});
const REGEXP_CODE = /^[a-zA-Z][a-zA-Z0-9_]*[a-zA-Z]$/;
const router = useRouter();

const getList = async (query: PageInfo) => {
  const { page = 1, pageSize = 15 } = query || {};
  const params = query;
  delete params.page;
  delete params.pageSize;
  const { data } = await getMerchantPageList(page, pageSize, params);

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
      handleDelete(row);
      break;
    case "API配置":
      currentRow.value = { ...row };
      break;
  }
}

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
const columns: PlusColumn[] = buildColum(handleClickButton);
const editColumns: PlusColumn[] = buildEditColum();
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
const handleDelete = async (row): Promise<void> => {
  ElMessageBox.confirm("你确定删除当前数据吗，是否继续?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true
  }).then(async () => {
    await deleteMerchant(row?.classifyCode);
    message(`删除成功！`, {
      type: "success"
    });
  });
  refresh();
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
      await createMerchant(params);
      message(`${title.value}成功！`, {
        type: "success"
      });
    } else {
      await updateMerchant(params.classifyCode, params);
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
function downloadTemp() {
  buildExcelTemp(excelTemp, "SIM卡导入模版", "SIM卡");
}
// ---------导入数据-----------
const show = ref(false);
const importForm = ref({
  importBtn: ""
});
const importColumns: PlusColumn[] = [
  {
    label: "模版上传",
    prop: "importBtn"
  },
  {
    label: "类型",
    valueType: "select",
    prop: "quartzGroupName"
  },
  {
    label: "卡商",
    valueType: "select",
    prop: "quartzGroupName"
  },
  {
    label: "运营商",
    valueType: "select",
    prop: "quartzGroupName"
  },
  {
    label: "是否本地卡",
    valueType: "select",
    prop: "quartzGroupName"
  }
];
const importRules = {};
const importLoading = ref(false);
function importData() {
  show.value = true;
}

function handleClose() {
  show.value = false;
}
const { form, loading, rules, visible } = toRefs(state);
</script>
