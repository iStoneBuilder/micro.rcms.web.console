<!--
套餐配置
-->
<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert title="套餐配置" type="success" :closable="false">
        <div class="alert-item">
          <p>
            ① 商户级数据，允许查看当前商户及下级商户数据； ②
            已售卖的套餐部分禁止修改，禁止删除（不的销售套餐直接修改下架）； ③
            未销售的套餐可直接删除； ④ 禁止跨商户操作数据。
          </p>
        </div>
      </el-alert>
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
          actionBar: { buttons, width: 165, type: 'link', showNumber: 4 },
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
              @click="handleCreate({ text: '新增', code: 'create' })"
            >
              新增
            </el-button>
            <el-button
              type="success"
              plain
              @click="
                handleCreate({ text: '销售效果展示', code: 'sellShow' }, '400')
              "
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
      :title="'套餐-' + title"
      :hasFooter="false"
      :showClose="currForm === 'sellShow'"
      :width="dWidth"
      top="5%"
    >
      <CreateForm
        v-if="currForm === 'create'"
        :currentRow="currentRow"
        :createColumns="createColumns"
        @dialogEvent="handleCreateBack"
      />
      <SellShow
        v-if="currForm === 'sellShow'"
        @dialogEvent="handleCreateBack"
      />
      <SellConfig
        v-if="currForm === 'setting'"
        :currentRow="currentRow"
        @dialogEvent="handleCreateBack"
      />
    </PlusDialog>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { terminalManage } from "./utils/hook";
import { deleteRecord, getPageRecordList } from "@/api/rcms/fram-common";
import type {
  PageInfo,
  ButtonsCallBackParams,
  PlusPageInstance
} from "plus-pro-components";

import { Plus } from "@element-plus/icons-vue";

import CreateForm from "./form/create.vue";
import SellShow from "./form/sellShow.vue";
import DetailForm from "./form/detail.vue";
import SellConfig from "./form/sellConfig.vue";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";

const service = "mifi-flow/data-plan";
const { pageInfo, loading, tableColumns, buttons, selectData } =
  terminalManage();
tableColumns[0].render = (value, data) => {
  return (
    <el-link
      onClick={() => {
        currentRow.value = data["row"];
        handleCreate({ code: "detail" }, "70%");
      }}
      type="primary"
    >
      {value}
    </el-link>
  );
};
const createColumns = [...tableColumns];
const dWidth = ref("800");
const plusPageInstance = ref<PlusPageInstance | null>(null);
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getPageRecordList(service, page, pageSize, params);
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
    case "create":
      currentRow.value = row;
      handleCreate(buttonRow);
      break;
    case "delete":
      handleDelete(row);
      break;
    case "detail":
      currentRow.value = row;
      handleCreate(buttonRow, "70%");
      break;
    case "setting":
      currentRow.value = row;
      handleCreate(buttonRow, "600");
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
function handleCreate(btn, dwt?: string) {
  if (btn.code === "detail") {
    addDrawer({
      title: "套餐详情-" + currentRow.value["dataPlanName"],
      size: "70%",
      class: "rcms-drawer",
      hideFooter: false,
      contentRenderer: ({ index }) => (
        <DetailForm
          currentRow={currentRow.value}
          createColumns={createColumns}
        />
      ),
      footerButtons: [
        {
          label: "关闭",
          size: "default",
          type: "primary",
          plain: true,
          btnClick: ({ drawer: { options, index }, button }) => {
            closeDrawer(options, index);
          }
        }
      ]
    });
    return;
  }
  currForm.value = btn.code;
  dWidth.value = dwt || "880";
  title.value = btn.text;
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
    `你确定删除（${row.dataPlanName}）数据吗，确认是否继续?`,
    "温馨提示",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      draggable: true
    }
  )
    .then(async () => {
      await deleteRecord(service, row?.dataPlanNo);
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
