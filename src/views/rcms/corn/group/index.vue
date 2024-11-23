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
            pageSizeList: pageSizeList,
            total: total
          }"
          @paginationChange="handlePageChange"
          @selection-change="handleSelectChange"
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
            @submit="handleDgSubmit"
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
import type { PageInfo, PlusColumn, FieldValues } from "plus-pro-components";
import { Plus, Delete } from "@element-plus/icons-vue";
import { searchColumns, buildTableColum, groupService } from "./utils/hook";

// --- 查询条件区域 ---
const searchForm = ref({});

const handleChange = (values: any) => {
  console.log(values, "change");
  getList();
};
const handleSearch = (values: any) => {
  console.log(values, "search");
  getList();
};
const handleReset = () => {
  console.log("handleReset");
  getList();
};
// --- Table ---
const createTitle = ref("新增");
const pageSizeList = [5, 10, 20, 50, 100];
const loading = ref(false);
const { tableData, total, pageInfo } = useTable<Array<any>>();
const multipleSelection = ref<Array<any>>([]);
// 列表按钮操作
const handleClickButton = (e, value, index, row, item) => {
  console.log("列表按钮操作", item.name, index);
  switch (item.name) {
    case "编辑":
      handleCreate(e, row);
      break;
    case "删除":
      handleDelete(row);
      break;
  }
};
const tableColumns = buildTableColum(handleClickButton);
const getList = async () => {
  loading.value = true;
  console.log("~~~ 加载数据 ~~~~");
  try {
    const { data, total: dataTotal } = await groupService.getTableData();
    tableData.value = data;
    total.value = dataTotal;
  } catch (error) {}
  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 500);
  });
  loading.value = false;
};
const handlePageChange = (_pageInfo: PageInfo): void => {
  console.log(_pageInfo, "page change");
  pageInfo.value = _pageInfo;
  getList();
};
const handleSelectChange = (val: Array<any>) => {
  console.log("handleSelectChange");
  multipleSelection.value = val;
};
const handleCreate = (e?: object, row?: object) => {
  row ? (createTitle.value = "编辑") : (createTitle.value = "新增");
  show.value = true;
};
const handleDelete = (row?: object) => {
  ElMessageBox.confirm("确定删除该数据吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true
  })
    .then(async () => {
      getList();
    })
    .catch(() => {
      console.log("取消删除");
    });
};
// --- 进入页面加载数据 ---
onMounted(() => {
  getList();
});

// --- 编辑页面 ---
const show = ref(false);
const createLoading = ref(false);
const createForm = ref<FieldValues>({
  isAuthorized: "N"
});
const createColumns: PlusColumn[] = [
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
    hideInForm: computed(() => createForm.value["isAuthorized"] === "N")
  },
  {
    label: "请求地址",
    prop: "requestPath",
    hideInForm: computed(() => createForm.value["isAuthorized"] === "N")
  },
  {
    label: "请求参数",
    prop: "requestParams",
    hideInForm: computed(() => createForm.value["isAuthorized"] === "N")
  },
  {
    label: "请求头参数",
    prop: "requestHeaders",
    hideInForm: computed(() => createForm.value["isAuthorized"] === "N")
  }
];
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
    }
  ]
};
const handleDgSubmit = (values: FieldValues) => {
  console.log(values, "Submit");
  createLoading.value = true;
};
const handleClose = () => {
  createForm.value = { isAuthorized: "N" };
  show.value = false;
};
</script>
