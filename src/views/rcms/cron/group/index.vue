<template>
  <div>
    <div class="rcms-plus-page">
      <el-card>
        <PlusSearch
          v-model="searchForm"
          :columns="searchColumns"
          :show-number="3"
          :col-props="{ xs: 1, sm: 1, md: 6, lg: 6, xl: 6 }"
          :label-width="100"
          @change="handleChange"
          @search="handleSearch"
          @reset="handleReset"
        />
      </el-card>
      <el-card>
        <PlusTable
          :loadingStatus="loading"
          table-layout="auto"
          showOverflowTooltip
          :columns="tableColumns"
          :table-data="tableData"
          :is-selection="true"
          has-index-column
          :index-table-column-props="{
            label: '序号',
            width: 60
          }"
          :adaptive="{
            offsetBottom: 80
          }"
          :pagination="{
            modelValue: pageInfo,
            pageSizeList: pageSizeList,
            pageSize: 15,
            total: total
          }"
          :action-bar="{
            buttons,
            width: 120
          }"
          @paginationChange="handlePageChange"
          @selection-change="handleSelectChange"
          @clickAction="handleClickButton"
        >
          <template #title>
            <el-button type="primary" plain :icon="Plus" @click="handleCreate"
              >新增</el-button
            >
            <el-button type="danger" plain :icon="Delete" @click="handleDelete"
              >删除</el-button
            >
          </template>
        </PlusTable>
      </el-card>
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
import { ref, onMounted, reactive, toRefs, computed } from "vue";
import { ElMessageBox } from "element-plus";
import { useTable } from "plus-pro-components";
import type {
  PageInfo,
  PlusColumn,
  FieldValues,
  ButtonsCallBackParams
} from "plus-pro-components";
import { Plus, Delete, Edit } from "@element-plus/icons-vue";
import { searchColumns, buildTableColum } from "./utils/hook";
import { message } from "@/utils/message";
import {
  getCornGroupPageList,
  createCronGroup,
  updateCronGroup,
  deleteCronGroup
} from "@/api/cron/group";
import { getItemList } from "@/api/rcms/common";

// --- 查询条件区域 ---
const searchForm = ref({});
const handleChange = (values: any) => {
  search();
};
const handleSearch = (values: any) => {
  search();
};
const handleReset = () => {
  search();
};
// --- Table ---
const createTitle = ref("新增");
const pageSizeList = [5, 15, 50, 100, 200];
const loading = ref(false);
const { tableData, total, pageInfo, buttons } = useTable<Array<any>>();
pageInfo.value.pageSize = 15;
const multipleSelection = ref<Array<any>>([]);
// 列表按钮操作
const handleClickButton = (params: ButtonsCallBackParams) => {
  console.log("列表按钮操作", params);
  switch (params.text) {
    case "编辑":
      handleCreate(params.e, params.row);
      break;
    case "删除":
      handleDelete(params.e, params.row);
      break;
  }
};
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
const search = async () => {
  loading.value = true;
  const { data } = await getCornGroupPageList(
    pageInfo.value.page,
    pageInfo.value.pageSize,
    searchForm.value
  );
  tableData.value = data.data;
  total.value = data.meta.totalRows;
  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 500);
  });
  loading.value = false;
};
const handlePageChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo;
  search();
};
const handleSelectChange = (val: Array<any>) => {
  multipleSelection.value = val;
};
const handleCreate = (e?: Object, row?: FieldValues) => {
  row
    ? ((createTitle.value = "编辑"),
      ((row.isEdit = true), (createForm.value = row)))
    : ((createTitle.value = "新增"),
      (createForm.value = { isAuthorized: "N", isEdit: false }));
  show.value = true;
};
const handleDelete = (e?: Object, row?: FieldValues) => {
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
      search();
    })
    .catch(() => {
      console.log("取消删除");
    });
};
// --- 进入页面加载数据 ---
onMounted(() => {
  search();
});

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
    search();
  } catch (error) {
    console.log(values, error);
  }
  createLoading.value = false;
};
const handleClose = () => {
  show.value = false;
};
</script>
