<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert
        title="任务组：企业级数据；数据创建者可以操作相应数据。"
        type="success"
      />
      <PlusPage
        ref="plusPageInstance"
        :columns="tableColumns"
        :request="getList"
        :search="{
          labelWidth: '100px',
          colProps: { span: 6 },
          showNumber: 3
        }"
        :table="{
          isSelection: true,
          adaptive: { offsetBottom: 70 },
          actionBar: { buttons, width: 100, type: 'link', showNumber: 4 },
          onClickAction: handleOption,
          onSelectionChange: handleSelect
        }"
        :default-page-info="pageInfo"
        :default-page-size-list="pageSizeList"
      >
        <template #table-title>
          <el-row class="button-row">
            <el-button
              type="primary"
              plain
              :icon="Plus"
              @click="handleCreate({ text: '新增', code: 'create' })"
            >
              新增
            </el-button>
            <el-button
              type="danger"
              :icon="Delete"
              plain
              @click="handleDelete()"
            >
              删除
            </el-button>
          </el-row>
        </template>
      </PlusPage>
    </div>
    <PlusDialog
      v-model="show"
      :title="createTitle + '任务组'"
      :hasFooter="false"
      :showClose="false"
      width="600"
      top="5%"
      @close="handleClose"
    >
      <template #default>
        <el-card>
          <PlusForm
            v-if="show"
            ref="createFormRef"
            v-model="createForm"
            labelWidth="110"
            labelPosition="right"
            :columns="createColumns"
            :rules="createRules"
            footerAlign="center"
            @submit="handleSubmit"
          >
            <template #footer="{ handleSubmit }">
              <div style="margin: 0 auto">
                <el-button
                  type="primary"
                  :disabled="createLoading"
                  @click="handleClose"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  :loading="createLoading"
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
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus";
import { useTable } from "plus-pro-components";
import type {
  PageInfo,
  PlusColumn,
  FieldValues,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";
import { Plus, Delete, Edit } from "@element-plus/icons-vue";
import { buildTableColum } from "./utils/hook";
import { message } from "@/utils/message";
import {
  getCornGroupPageList,
  createCronGroup,
  updateCronGroup,
  deleteCronGroup
} from "@/api/cron/group";
import { getItemList } from "@/api/rcms/fram-common";

// --- Table ---
const createTitle = ref("新增");
const pageSizeList = [5, 15, 50, 100, 200];
const loading = ref(false);
const { pageInfo, buttons } = useTable<Array<any>>();
pageInfo.value.pageSize = 15;
const multipleSelection = ref<Array<any>>([]);

const tableColumns = buildTableColum();
buttons.value = [
  {
    // 修改
    text: "编辑",
    code: "edit",
    icon: Edit,
    // props v0.1.16 版本新增函数类型
    props: (row: any) => ({
      type: "primary"
    }),
    show: computed(() => true)
  },
  {
    // 删除
    text: "删除",
    code: "delete",
    icon: Delete,
    props: computed(() => ({ type: "danger" }))
  }
];

async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getCornGroupPageList(page, pageSize, params);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
}

const handleOption = ({ row, buttonRow }: ButtonsCallBackParams): void => {
  switch (buttonRow.code) {
    case "edit":
      handleCreate(buttonRow.code, row);
      break;
    case "delete":
      handleDelete(row);
      break;
  }
};

const handleSelect = (data: any) => {
  multipleSelection.value = data;
};
const plusPageInstance = ref<PlusPageInstance | null>(null);
const refresh = () => {
  plusPageInstance.value?.getList();
};

const handleCreate = (e?: Object, row?: FieldValues) => {
  row
    ? ((createTitle.value = "编辑"),
      ((row.isEdit = true), (createForm.value = row)))
    : ((createTitle.value = "新增"),
      (createForm.value = { isAuthorized: "N", isEdit: false }));
  show.value = true;
};
const handleDelete = (row?: FieldValues) => {
  if (!row && multipleSelection.value.length === 0) {
    message("请至少选择一条数据", {
      duration: 3000,
      customClass: "el",
      type: "warning"
    });
    return;
  }
  ElMessageBox.confirm("确定删除该数据吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true
  })
    .then(async () => {
      if (row) {
        await deleteCronGroup(row.quartzGroupId as string);
      } else {
        multipleSelection.value.forEach(item => {
          deleteCronGroup(item.quartzGroupId as string);
        });
      }
      refresh();
    })
    .catch(() => {
      console.log("取消删除");
    });
};

// --- 编辑页面 ---
const show = ref(false);
const createLoading = ref(false);
const createForm = ref<FieldValues>({
  isAuthorized: "N"
});
const createColumns: PlusColumn[] = [
  {
    label: "分组编码",
    prop: "quartzGroupCode",
    hideInForm: computed(() => createForm.value["isEdit"] === false),
    fieldProps: {
      disabled: true
    }
  },
  {
    label: "分组名称",
    prop: "quartzGroupName"
  },
  {
    label: "是否需要认证",
    prop: "isAuthorized",
    valueType: "select",
    options: [
      {
        label: "是",
        value: "Y"
      },
      {
        label: "否",
        value: "N"
      }
    ]
  },
  {
    label: "返回值key",
    prop: "authKey",
    hideInForm: computed(() => createForm.value["isAuthorized"] === "N")
  },
  {
    label: "请求类型",
    prop: "requestType",
    hideInForm: computed(() => createForm.value["isAuthorized"] === "N"),
    valueType: "select",
    options: getItemList("RCMS_SYS_METHOD_TYPE")
  },
  {
    label: "请求地址",
    prop: "requestPath",
    hideInForm: computed(() => createForm.value["isAuthorized"] === "N")
  },
  {
    label: "请求头参数",
    prop: "requestHeaders",
    valueType: "textarea",
    hideInForm: computed(() => createForm.value["isAuthorized"] === "N")
  },
  {
    label: "请求体参数",
    prop: "requestParams",
    valueType: "textarea",
    hideInForm: computed(() => createForm.value["isAuthorized"] === "N")
  }
];
const urlRegex =
  /^(http|https):\/\/((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|localhost|[a-zA-Z0-9.-]+)(:\d+)?\/[a-zA-Z0-9.-\/]*$/;
const alphanumericUnderscoreRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
const createRules = {
  quartzGroupName: [
    {
      required: true,
      message: "请输入名称"
    }
  ],
  isAuthorized: [
    {
      required: true,
      message: "请确认是否需要认证"
    }
  ],
  authKey: [
    {
      required: true,
      message: "请输入返回值key"
    },
    {
      validator: (rule, value, callback) => {
        if (!alphanumericUnderscoreRegex.test(value)) {
          callback(
            new Error("只包含英文字母、数字和下划线，并且必须以字母开头")
          );
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  requestType: [
    {
      required: true,
      message: "请输入请求类型"
    }
  ],
  requestPath: [
    {
      required: true,
      message: "请输入请求地址"
    },
    {
      validator: (rule, value, callback) => {
        if (!urlRegex.test(value)) {
          callback(new Error("请输入正确的请求地址！"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
};
const handleSubmit = async (values: FieldValues) => {
  createLoading.value = true;
  try {
    if (values.isEdit) {
      await updateCronGroup(values.quartzGroupId as string, values);
    } else {
      await createCronGroup(values);
    }
    show.value = false;
  } catch (error) {
    console.log(values, error);
  }
  createLoading.value = false;
  refresh();
};
const handleClose = () => {
  show.value = false;
};
</script>
