<template>
  <div class="rcms-plus-page">
    <el-alert title="SIM卡商" type="success" :closable="false">
      <div class="alert-item">
        <p>
          ① 企业级数据，企业下所有商户均可查看、使用； ②
          编辑、删除、API配置权限只允许数据创建商户操作。
        </p>
      </div>
    </el-alert>
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
        adaptive: { offsetBottom: 70 },
        actionBar: { buttons, width: 160 },
        onClickAction: handleTableOption,
        treeProps: {
          children: 'children'
        }
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
        title: title + '卡商',
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
      :title="'[' + currentRow?.merchantName + ']API配置'"
      width="80%"
      top="2%"
      :hasFooter="false"
    >
      <component
        :is="item.component"
        class="search-form bg-bg_color w-[99/100] pt-[12px] overflow-auto"
        :currentRow="currentRow"
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
  PlusPageInstance,
  ButtonsCallBackParams,
  ActionBarButtonsRow
} from "plus-pro-components";
import { useTable } from "plus-pro-components";
import { Plus } from "@element-plus/icons-vue";
import {
  getMerchantPageList,
  createMerchant,
  updateMerchant,
  deleteMerchant
} from "@/api/mifi/merchant";
import { ElMessageBox } from "element-plus";
import { hasDataPerms, hasPerms } from "@/utils/auth";
import Item from "./item.vue";
import { defaultPageInfo, buildColum, State } from "./hook";
import { getEnterpriseId } from "@/utils/common";

const show = ref(false);
const currentRow = ref({ merchantName: "" });
const item = {
  key: "Item",
  title: "API配置",
  component: Item
};
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
function changeColumns(columns: Array<any>, showItem: boolean) {
  columns[0].hideInForm = showItem;
  columns[0].fieldProps = {
    disabled: !showItem
  };
}
const { buttons } = useTable();
buttons.value = [
  {
    text: "编辑",
    code: "update",
    props: { type: "primary", permission: "permission:merchant:update" },
    show: (row: any, index: number, button: ActionBarButtonsRow) => {
      // 商户级+用户权限操作权限
      if (row && row["enterpriseId"]) {
        return hasDataPerms(
          button.props["permission"],
          "m:" + row["enterpriseId"]
        );
      }
      return false;
    }
  },
  {
    text: "删除",
    code: "delete",
    props: { type: "danger", permission: "permission:merchant:delete" },
    show: (row: any, index: number, button: ActionBarButtonsRow) => {
      if (row && row["enterpriseId"]) {
        return hasDataPerms(
          button.props["permission"],
          "m:" + row["enterpriseId"]
        );
      }
      return false;
    }
  },
  {
    text: "API配置",
    code: "setting",
    props: {
      type: "primary",
      permission: "permission:merchant:carrier:page:query"
    },
    show: (row: any, index: number, button: ActionBarButtonsRow) => {
      // 只需要查看权限
      return hasDataPerms(button.props["permission"]);
    }
  }
];
const handleTableOption = ({ row, buttonRow }: ButtonsCallBackParams): void => {
  switch (buttonRow.code) {
    case "update":
      state.form = { ...row } as any;
      state.isCreate = false;
      changeColumns(columns, false);
      state.visible = true;
      break;
    case "delete":
      handleDelete(row);
      break;
    case "setting":
      currentRow.value = row as any;
      show.value = true;
      break;
  }
};
const state = reactive<State>({
  visible: false,
  loading: false,
  isCreate: false,
  form: {
    merchantName: "",
    merchantCode: "",
    description: ""
  },
  rules: {
    merchantName: [
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
const columns: PlusColumn[] = buildColum();

const title = computed(() => (state.isCreate ? "新增" : "编辑"));
// 创建
const handleCreate = (): void => {
  state.form = {
    merchantName: "",
    merchantCode: "",
    description: ""
  };
  changeColumns(columns, true);
  state.isCreate = true;
  state.visible = true;
};
const handleDelete = async (row): Promise<void> => {
  ElMessageBox.confirm("你确定删除当前数据吗，是否继续?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true
  })
    .then(async () => {
      await deleteMerchant(row?.merchantCode);
      message(`删除成功！`, {
        type: "success"
      });
      refresh();
    })
    .catch(error => {
      console.log(error);
    });
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
      await updateMerchant(params.merchantCode, params);
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
