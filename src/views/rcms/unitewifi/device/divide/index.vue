<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert title="设备分发" type="success" :closable="false">
        <div class="alert-item">
          <p>
            ① 商户级数据，只允许查看、分发当前商户数据到下级商户； ②
            分发数据时清空分发设备的设备分组、修改设备关联的ICCID的商户信息； ③
            分发记录可以查看当前商户及下级商户分发记录
          </p>
        </div>
      </el-alert>
      <el-tabs v-model="activeName">
        <el-tab-pane label="设备分发" name="tab1">
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
              adaptive: { offsetBottom: 80 },
              onSelectionChange: handleSelect
            }"
            :default-page-info="pageInfo"
            :default-page-size-list="[5, 15, 20, 50]"
          >
            <template #table-title>
              <el-row class="button-row">
                <div>
                  <el-select
                    v-model="targetMch"
                    placeholder="请选择目标(下级)商户"
                    clearable
                    @change="targetMchChange"
                  >
                    <el-option
                      v-for="(item, index) in targetOptions"
                      :key="index"
                      :label="item['label']"
                      :value="item"
                    />
                  </el-select>
                  <el-button
                    type="primary"
                    plain
                    :icon="useRenderIcon(Expand)"
                    @click="handleDivide"
                  >
                    分发
                  </el-button>
                </div>
              </el-row>
            </template>
          </PlusPage>
        </el-tab-pane>
        <el-tab-pane label="分发记录" name="tab2">
          <PlusPage
            ref="plusPageInstance2"
            :columns="divideColumns"
            :request="getDivideList"
            :search="{
              labelWidth: '100px',
              colProps: { span: 6 },
              showNumber: 3
            }"
            :table="{
              isSelection: false,
              adaptive: { offsetBottom: 550 }
            }"
            :default-page-info="pageInfo"
            :default-page-size-list="[5, 15, 20, 50]"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { onMounted, ref } from "vue";
import { terminalManage } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import {
  createRecord,
  getBussList,
  getPageRecordList
} from "@/api/rcms/fram-common";
import type { PageInfo, PlusPageInstance } from "plus-pro-components";
import Expand from "@iconify-icons/ep/expand";
import { getEnterpriseId } from "@/utils/common";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";

const activeName = ref("tab1");
const { pageInfo, loading, tableColumns, divideColumns, selectData } =
  terminalManage();
const plusPageInstance = ref<PlusPageInstance | null>(null);
const plusPageInstance2 = ref<PlusPageInstance | null>(null);
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  params["activeStatus"] = "N";
  params["enterpriseId"] = getEnterpriseId();
  const { data } = await getPageRecordList(
    "mifi/device-manage",
    page,
    pageSize,
    params
  );
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
}
async function getDivideList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  const { data } = await getPageRecordList(
    "mifi/device-divide",
    page,
    pageSize,
    params
  );
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
}
const targetMch = ref("");
const targetMchChange = function (value) {
  targetMch.value = value;
};
const targetOptions = ref([]);
const handleSelect = (data: any) => {
  selectData.value = data;
};
const refresh = () => {
  plusPageInstance.value?.getList();
};
const handleDivide = function () {
  if (targetMch.value === "" || targetMch.value === undefined) {
    message(`请选择设备分发的目标商户`, {
      type: "warning"
    });
    return;
  }
  if (selectData.value.length === 0) {
    message(`请至少选择一条数据！`, {
      type: "warning"
    });
    return;
  }
  ElMessageBox.confirm(
    `您确认将选择的设备分发 ${targetMch.value["label"]} 到吗?`,
    "温馨提示",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      draggable: true
    }
  )
    .then(async () => {
      const divideData = {
        orgMch: getEnterpriseId(),
        targetMch: targetMch.value["value"],
        list: selectData.value
      };
      await createRecord("mifi/device-divide", divideData)
        .then(() => {
          message(`分发成功！`, {
            type: "success"
          });
          refresh();
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
};
onMounted(async () => {
  targetOptions.value = await getBussList(
    "/test/services/api/base/enterprise/records/list",
    "name",
    "id",
    { parentId: getEnterpriseId() }
  );
});
</script>
<style lang="scss" scoped>
.button-row {
  div {
    display: flex;
    width: fit-content;
    align-items: center;
    button {
      margin-left: 15px;
    }
    :deep(.el-select__wrapper) {
      width: 200px;
    }
  }
}
</style>
