<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert title="SIM卡" type="success" :closable="false">
        <div class="alert-item">
          <p>
            ① 商户级数据，可以查看当前商户及下级商户数据；②
            只允许操作当前商户数据；③ 未绑定设备的ICCID允许删除。
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
          actionBar: { buttons, width: 150, type: 'link', showNumber: 4 },
          onClickAction: handleTableOption,
          onSelectionChange: handleSelect
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
            <el-button
              type="primary"
              plain
              :icon="useRenderIcon(Check)"
              @click="checkSim"
            >
              流量校准
            </el-button>
          </el-row>
        </template>
      </PlusPage>
      <!-- 弹窗编辑 -->
      <PlusDialogForm
        v-if="visible"
        v-model:visible="visible"
        v-model="editForm"
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
        @confirm="handleSubmitEdit"
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
            :row-props="{ gutter: 20 }"
            :col-props="{
              span: 23
            }"
            @submit="handleSubmit"
          >
            <template #plus-field-importBtn>
              <div class="file-area">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  class="file-inp"
                  @change="selectExcelFile"
                />
                <el-button type="primary" :disabled="importLoading"
                  >选择文件</el-button
                >
              </div>
              <label class="file-label">{{ importForm.fileName }}</label>
            </template>
            <template #footer="{ handleSubmit }">
              <div style="margin: 0 auto">
                <el-button
                  type="primary"
                  plain
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
import { ElMessageBox } from "element-plus";
import { message } from "@/utils/message";
import { reactive, computed, toRefs, ref } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { useTable } from "plus-pro-components";
import type {
  PlusColumn,
  PageInfo,
  PlusPageInstance,
  ButtonsCallBackParams
} from "plus-pro-components";
import { Plus, Compass } from "@element-plus/icons-vue";
import {
  getSimPageList,
  updateSim,
  deleteSim,
  importSim,
  checkSimDp
} from "@/api/mifi/sim";
import {
  defaultPageInfo,
  buildColum,
  State,
  buildEditColum,
  excelTemp
} from "./hook";
import { buildExcelTemp, readExcelData } from "@/utils/xlsxHandle";
import { getItemList, getBussList } from "@/api/rcms/fram-common";

import Upload from "@iconify-icons/ep/upload";
import Check from "@iconify-icons/ep/circle-check";
import Download from "@iconify-icons/ep/download";

const getList = async (query: PageInfo) => {
  const { page = 1, pageSize = 15 } = query || {};
  const params = query;
  delete params.page;
  delete params.pageSize;
  const { data } = await getSimPageList(page, pageSize, params);

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
const state = reactive<State>({
  visible: false,
  loading: false,
  isCreate: false,
  rules: {}
});
const columns: PlusColumn[] = buildColum();
const editColumns: PlusColumn[] = buildEditColum();
const title = computed(() => (state.isCreate ? "新增" : "编辑"));

const { buttons } = useTable();
buttons.value = [
  {
    text: "编辑",
    code: "update",
    props: { type: "primary", plain: true }
  },
  {
    text: "删除",
    code: "delete",
    props: { type: "danger", plain: true }
  },
  {
    text: "限速",
    code: "limit",
    props: { type: "primary", plain: true }
  }
];
const editForm = ref({ iccid: "" });
const handleTableOption = ({ row, buttonRow }: ButtonsCallBackParams): void => {
  switch (buttonRow.code) {
    case "update":
      editForm.value = { ...row } as any;
      state.isCreate = false;
      state.visible = true;
      break;
    case "delete":
      handleDelete(row);
      break;
    case "setting":
      break;
  }
};
const handleDelete = async (row): Promise<void> => {
  console.log(row.deviceSn);
  if (row.deviceSn != undefined) {
    message(`已关联设备的ICCID不允许删除`, {
      type: "warning"
    });
    return;
  }
  ElMessageBox.confirm("你确定删除当前数据吗，是否继续?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true
  })
    .then(async () => {
      await deleteSim(row?.iccid);
      message(`删除成功！`, {
        type: "success"
      });
      // 刷新列表
      refresh();
    })
    .catch(error => {
      console.log(error);
    });
};
const selectData = ref([]);
const handleSelect = (data: any) => {
  selectData.value = data;
};
function checkSim() {
  if (selectData.value.length > 0) {
    selectData.value.forEach(sim => {
      checkSimDp(sim.iccid, sim);
    });
    return;
  }
  message(`请至少选择一条数据！`, {
    type: "warning"
  });
}
// 取消
const handleCancel = () => {
  state.visible = false;
};

// 提交表单成功
const handleSubmitEdit = async () => {
  try {
    state.loading = true;
    const params = { ...editForm.value };
    await updateSim(params["classifyCode"], params);
    message(`${title.value}成功！`, {
      type: "success"
    });
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
  importBtn: "",
  fileName: "",
  simType: "Y",
  excelData: []
});
const importColumns: PlusColumn[] = [
  {
    label: "模版上传",
    prop: "importBtn"
  },
  {
    label: "网络类型",
    valueType: "select",
    prop: "netType",
    options: getItemList("MIFI_NET_TYPE")
  },
  {
    label: "卡商",
    valueType: "select",
    prop: "merchantCode",
    options: getBussList(
      "/test/services/api/mifi/merchant/records",
      "merchantName",
      "merchantCode"
    )
  },
  {
    label: "运营商",
    valueType: "select",
    prop: "carrierCode",
    options: getItemList("MIFI_ISP")
  },
  {
    label: "是否本地卡",
    valueType: "plus-radio",
    prop: "simType",
    options: getItemList("RCMS_SYS_YN")
  }
];
const importRules = {
  netType: [
    {
      required: true,
      message: "请选择网络类型"
    }
  ],
  merchantCode: [
    {
      required: true,
      message: "请选择卡商"
    }
  ],
  carrierCode: [
    {
      required: true,
      message: "请选择运营商"
    }
  ],
  simType: [
    {
      required: true,
      message: "请选择卡类型"
    }
  ]
};
const importLoading = ref(false);
function importData() {
  importForm.value = {
    importBtn: "",
    fileName: "",
    simType: "Y",
    excelData: []
  };
  show.value = true;
}
function handleClose() {
  show.value = false;
}
async function selectExcelFile(event) {
  const input = event.target;
  if (!input.files || input.files.length === 0) {
    return;
  }
  const file = input.files[0];
  importForm.value.fileName = file.name;
  const data = await readExcelData(excelTemp, file);
  importForm.value.excelData = data;
}
const handleSubmit = async () => {
  if (importForm.value.excelData.length == 0) {
    message(`请选择模版数据！`, {
      type: "warning"
    });
    return;
  }
  const baseData = { ...importForm.value };
  delete baseData.excelData;
  delete baseData.fileName;
  delete baseData.importBtn;
  const importData = [];
  importForm.value.excelData.forEach(item => {
    const itemData = { ...baseData };
    itemData["iccid"] = item.iccid;
    importData.push(itemData);
  });
  await importSim(importData);
  message(`SIM卡导入成功！`, {
    type: "success"
  });
  handleClose();
  // 刷新列表
  refresh();
};
const { loading, rules, visible } = toRefs(state);
</script>
<style scoped>
.file-area {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.file-inp {
  position: absolute;
  font-size: 100px;
  opacity: 0;
  right: 0;
  top: 0;
}
.file-label {
  margin-left: 14px !important;
}
</style>
