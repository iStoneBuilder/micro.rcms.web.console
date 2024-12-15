<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert
        title="任务列表：企业级数据；数据创建者可以操作相应数据。"
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
          <el-button type="primary" plain :icon="Plus" @click="handleCreate()"
            >新增</el-button
          >
          <el-popover
            placement="top-start"
            title=""
            :width="200"
            trigger="hover"
            content="未启用/已停用的任务才允许启用，已启用的才允许停用"
            ><template #reference>
              <el-button type="primary" plain :icon="SetUp" @click="handleStart"
                >启用｜停用</el-button
              >
            </template>
          </el-popover>
          <el-popover
            placement="top-start"
            title=""
            :width="200"
            trigger="hover"
            content="已启用的才允许暂停，已暂停的任务才允许恢复"
            ><template #reference>
              <el-button
                type="primary"
                plain
                :icon="Stopwatch"
                @click="handlePause"
                >暂停｜恢复</el-button
              >
            </template>
          </el-popover>
          <el-button type="danger" plain :icon="Delete" @click="handleDelete()"
            >删除</el-button
          >
        </template>
      </PlusPage>
    </div>
    <PlusDialog
      v-model="show"
      :title="createTitle + '任务'"
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
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { ElMessageBox } from "element-plus";
import { useTable } from "plus-pro-components";
import type {
  PageInfo,
  PlusColumn,
  FieldValues,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";
import { Plus, Delete, Edit, Stopwatch, SetUp } from "@element-plus/icons-vue";
import { buildTableColum, groups, createRules } from "./utils/hook";
import { message } from "@/utils/message";
import {
  getCornTaskPageList,
  createCornTask,
  updateCornTask,
  deleteCornTask,
  opertionCornTask
} from "@/api/cron/task";
import { getItemList } from "@/api/rcms/fram-common";

defineOptions({
  name: "TaskManage"
});

// --- 查询条件区域 ---
const searchForm = ref({});
// --- Table ---
const createTitle = ref("新增");
const pageSizeList = [5, 15, 50, 100, 200];
const loading = ref(false);
const { pageInfo, buttons } = useTable<Array<any>>();
pageInfo.value.pageSize = 15;
const multipleSelection = ref<Array<any>>([]);
// 列表按钮操作
const handleOption = ({ row, buttonRow }: ButtonsCallBackParams): void => {
  switch (buttonRow.code) {
    case "edit":
      handleCreate(row);
      break;
    case "delete":
      handleDelete(row);
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
const plusPageInstance = ref<PlusPageInstance | null>(null);
const search = () => {
  plusPageInstance.value?.getList();
};
const route = useRoute();
const defaultValues = ref({});
if (Object.keys(route.query).length > 0) {
  defaultValues.value = { ...defaultValues.value, ...route.query };
}
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getCornTaskPageList(page, pageSize, params);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
}

onMounted(async () => {
  plusPageInstance.value.setSearchFieldsValue(defaultValues.value);
  search();
});
const handleSelect = (data: any) => {
  multipleSelection.value = data;
};

const handleCreate = (row?: FieldValues) => {
  row
    ? ((createTitle.value = "编辑"),
      ((row.isEdit = true), (createForm.value = row)))
    : ((createTitle.value = "新增"),
      (createForm.value = {
        isAuthorized: "N",
        isEdit: false,
        enabledFlag: "disabled"
      }));
  show.value = true;
};
const handleStart = async () => {
  if (multipleSelection.value.length === 0) {
    message("请至少选择一条数据", {
      duration: 3000,
      customClass: "el",
      type: "warning"
    });
    return;
  }
  const flag = multipleSelection.value[0].enabledFlag;
  if (flag === "stopped" || flag === "disabled") {
    await opertionCornTask(
      "start" as string,
      multipleSelection.value[0].quartzId
    );
    search();
    return;
  }
  if (flag === "enabled") {
    await opertionCornTask(
      "stop" as string,
      multipleSelection.value[0].quartzId
    );
    search();
    return;
  }
  message("未启用/已停用的任务才允许启用，已启用的才允许停用", {
    duration: 3000,
    customClass: "el",
    type: "warning"
  });
};
const handlePause = async () => {
  if (multipleSelection.value.length === 0) {
    message("请至少选择一条数据", {
      duration: 3000,
      customClass: "el",
      type: "warning"
    });
    return;
  }
  const flag = multipleSelection.value[0].enabledFlag;
  if (flag === "suspend") {
    await opertionCornTask(
      "resume" as string,
      multipleSelection.value[0].quartzId
    );
    search();
    return;
  }
  if (flag === "enabled") {
    await opertionCornTask(
      "pause" as string,
      multipleSelection.value[0].quartzId
    );
    search();
    return;
  }
  message("已启用的才允许暂停，已暂停的任务才允许恢复", {
    duration: 3000,
    customClass: "el",
    type: "warning"
  });
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
        await deleteCornTask(row.quartzId as string);
      } else {
        multipleSelection.value.forEach(item => {
          deleteCornTask(item.quartzId as string);
        });
      }
      search();
    })
    .catch(() => {
      console.log("取消删除");
    });
};

// --- 编辑页面 ---
const show = ref(false);
const groupData = ref([]);
const createLoading = ref(false);
const createForm = ref<FieldValues>({
  isAuthorized: "N"
});

const createColumns: PlusColumn[] = [
  {
    label: "任务分组",
    prop: "quartzGroupCode",
    valueType: "select",
    fieldProps: { clearable: false },
    options: groups()
  },
  {
    label: "任务名称",
    prop: "quartzName"
  },
  {
    label: "任务表达式",
    prop: "quartzCron"
  },
  {
    label: "是否启用",
    prop: "enabledFlag",
    valueType: "select",
    options: getItemList("RCMS_SYS_TASK_STATUS"),
    fieldProps: { clearable: false, placeholder: "请选择" },
    hideInForm: computed(() => createForm.value["isEdit"] as boolean)
  },
  {
    label: "请求地址",
    prop: "requestPath",
    colProps: {
      span: 24
    }
  },
  {
    label: "请求类型",
    valueType: "select",
    prop: "requestType",
    fieldProps: { clearable: false },
    options: getItemList("RCMS_SYS_METHOD_TYPE")
  },
  {
    label: "认证key",
    prop: "authKey"
  },
  {
    label: "请求头参数",
    prop: "requestHeaders",
    colProps: {
      span: 24
    },
    valueType: "textarea",
    fieldProps: { placeholder: "请输入JSON字符串" }
  },
  {
    label: "请求体参数",
    prop: "requestParams",
    colProps: {
      span: 24
    },
    valueType: "textarea",
    fieldProps: { placeholder: "请输入JSON字符串" }
  }
];
const handleSubmit = async (values: FieldValues) => {
  createLoading.value = true;
  try {
    if (values.isEdit) {
      await updateCornTask(values.quartzId as string, values);
    } else {
      await createCornTask(values);
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
