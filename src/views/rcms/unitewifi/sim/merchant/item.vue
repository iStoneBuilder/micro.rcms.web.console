<template>
  <div class="rcms-plus-page">
    <PlusPage
      ref="plusPageInstance"
      :columns="columns"
      :request="getList"
      :search="false"
      :table="{
        hasIndexColumn: true,
        isSelection: true,
        adaptive: { offsetBottom: 130 }
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
        labelWidth: '130px',
        rules,
        colProps: { span: 23 },
        rowProps: { gutter: 24 }
      }"
      :dialog="{
        title: title + 'API配置',
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
import { ElMessageBox } from "element-plus";
import { getItemList } from "@/api/rcms/fram-common";
import { message } from "@/utils/message";
import { reactive, computed, toRefs, ref, defineProps, onMounted } from "vue";
import type {
  PlusColumn,
  PageInfo,
  PlusPageInstance
} from "plus-pro-components";
import { Plus, Delete } from "@element-plus/icons-vue";
import {
  getMerchantCarrierList,
  createMerchantCarrier,
  updateMerchantCarrier,
  deleteMerchantCarrier
} from "@/api/mifi/merchant";
import { hasPerms } from "@/utils/auth";
import { defaultPageInfo, buildChildColum, ChildState } from "./hook";

const router = useRouter();
const langOptions = ref([]);
const props = defineProps<{
  currentRow: any;
}>();
const getList = async (query: PageInfo & { merchantCode: string }) => {
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  params.merchantCode = props.currentRow.merchantCode;
  const { data } = await getMerchantCarrierList(page, pageSize, params);

  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
};
onMounted(async () => {
  // 加载运营商
  langOptions.value = await getItemList("MIFI_ISP");
  columns[0].options = langOptions.value;
});
const plusPageInstance = ref<PlusPageInstance | null>(null);
// 重新请求列表接口
const refresh = () => {
  plusPageInstance.value?.getList();
};

function handleClickButton(e, value, index, row, item) {
  switch (item.name) {
    case "编辑":
      state.form = { ...row } as any;
      columns[0].fieldProps = { disabled: true };
      state.isCreate = false;
      state.visible = true;
      break;
    case "删除":
      handleDelete(row, false);
      break;
  }
}

const columns: PlusColumn[] = buildChildColum(handleClickButton);
const state = reactive<ChildState>({
  visible: false,
  loading: false,
  isCreate: false,
  form: {
    merchantCode: "",
    carrierCode: "",
    appKey: "",
    appSecret: "",
    disableArea: "",
    description: ""
  },
  rules: {
    carrierCode: [
      {
        required: true,
        message: "请选择运营商"
      }
    ],
    appKey: [
      {
        required: true,
        message: "请输入appKey"
      },
      {
        validator: (rule, value, callback) => {
          if (value.length > 50) {
            callback(new Error("最多包含50个字符"));
          }
          callback();
        },
        trigger: "blur"
      }
    ],
    appSecret: [
      {
        required: true,
        message: "请输入appKey Secret"
      },
      {
        validator: (rule, value, callback) => {
          if (value.length > 50) {
            callback(new Error("最多包含50个字符"));
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
    merchantCode: props?.currentRow?.merchantCode,
    carrierCode: "",
    appKey: "",
    appSecret: "",
    disableArea: "",
    description: ""
  };
  columns[0].fieldProps = { disabled: false };
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
    params.merchantCode = props.currentRow.merchantCode;
    if (state.isCreate) {
      await createMerchantCarrier(params);
      message(`${title.value}成功！`, {
        type: "success"
      });
    } else {
      await updateMerchantCarrier(params.carrierCode, params);
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
  ElMessageBox.confirm("你确定删除当前数据吗，是否继续?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true
  }).then(async () => {
    await deleteMerchantCarrier(row?.itemId);
    message(`删除成功！`, {
      type: "success"
    });
  });
  // 刷新列表
  refresh();
  state.loading = false;
};

const { form, loading, rules, visible } = toRefs(state);
</script>
