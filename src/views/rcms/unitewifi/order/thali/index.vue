<!--
套餐配置
1:配置套餐组用于用户端特殊展示
2:已售卖的套餐部分禁止修改，禁止删除（不让销售直接下架）
3:未销售的套餐可以直接删除，不需要下架
-->
<template>
  <div>
    <div class="rcms-plus-page">
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
          actionBar: { buttons, width: 170, type: 'link' },
          onClickAction: handleOption,
          onSelectionChange: handleSelect
        }"
        :default-page-info="pageInfo"
        :default-page-size-list="[5, 15, 20, 50]"
      >
        <template #table-title>
          <el-row class="button-row">
            <el-button
              type="primary"
              plain
              :icon="Plus"
              @click="handleCreate('新增', 'create')"
            >
              新增
            </el-button>
            <el-button
              type="primary"
              plain
              @click="handleCreate('销售效果展示-', 'sellShow')"
            >
              销售展示效果
            </el-button>
          </el-row>
        </template>
      </PlusPage>
    </div>
    <PlusDialog
      v-if="show"
      v-model="show"
      :title="title + '套餐'"
      :hasFooter="false"
      :showClose="currForm === 'sellShow'"
      :width="dWidth"
      top="5%"
    >
      <CreateForm
        v-if="currForm === 'create'"
        :currentRow="currentRow"
        :createColumns="createColumns"
        @createEvent="handleCreateBack"
      />
      <SellShow
        v-if="currForm === 'sellShow'"
        @createEvent="handleCreateBack"
      />
    </PlusDialog>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { terminalManage } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { deleteRecord, getPageRecordList } from "@/api/mifi/device-type";
import type {
  PageInfo,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";

import { Plus } from "@element-plus/icons-vue";
import Delete from "@iconify-icons/ep/delete";

import CreateForm from "./form/create.vue";
import SellShow from "./form/sellShow.vue";

const { pageInfo, loading, tableColumns, buttons, selectData } =
  terminalManage();
const createColumns = [...tableColumns];
const dWidth = ref(800);
const plusPageInstance = ref<PlusPageInstance | null>(null);
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getPageRecordList(page, pageSize, params);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
}
// 列表按钮
const handleOption = ({ row, buttonRow }: ButtonsCallBackParams): void => {
  switch (buttonRow.code) {
    case "update":
      currentRow.value = row;
      handleCreate("编辑", "create");
      break;
    case "delete":
      handleDelete(row);
      break;
  }
};
const handleSelect = (data: any) => {
  selectData.value = data;
};
const refresh = () => {
  plusPageInstance.value?.getList();
};
// -------- 列表相关操作 -------------
const show = ref(false);
const title = ref("");
const currentRow = ref(null);
const currForm = ref("create");
function handleCreate(ops = "新增", view: string) {
  currForm.value = view;
  dWidth.value = 800;
  if (view === "sellShow") {
    dWidth.value = 400;
  }
  title.value = ops;
  show.value = true;
}
function handleCreateBack(op) {
  show.value = false;
  currentRow.value = null;
  if (op === "submit") {
    refresh();
  }
}

const handleDelete = async (row): Promise<void> => {
  ElMessageBox.confirm(
    `你确定删除（${row.typeName}）数据吗，确认是否继续?`,
    "温馨提示",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      draggable: true
    }
  )
    .then(async () => {
      await deleteRecord(row?.typeId);
      message(`删除成功！`, {
        type: "success"
      });
      refresh();
    })
    .catch(error => {
      console.log(error);
    });
};
</script>
