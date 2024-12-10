<template>
  <div class="rcms-plus-page">
    <el-alert title="设备诊断" type="error" :closable="false">
      <div class="alert-item">
        <p>
          如果所有指标都正常，但设备仍然无法上网，
          建议对设备进行复位后重试。仍无法正常上网再联系工程师支持解决!
        </p>
      </div>
    </el-alert>
    <el-tabs>
      <el-tab-pane label="设备诊断">
        <PlusPage
          ref="plusPageInstance"
          class="rcms-plus-tab"
          :columns="tableColumns"
          :request="getList"
          :search="false"
          :table="{
            isSelection: false,
            adaptive: { offsetBottom: 80 }
          }"
          :default-page-info="pageInfo"
          :default-page-size-list="[5, 15, 20, 50]"
        >
          <template #table-title>
            <div class="rcms-table-form">
              <el-input
                v-model="deviceSn"
                clearable
                size="large"
                placeholder="请输入设备SN"
                style="width: 240px"
              />
              <el-button
                type="primary"
                size="large"
                plain
                @click="handleDeviceCheck"
              >
                一键诊断
              </el-button>
            </div>
          </template>
        </PlusPage>
      </el-tab-pane>
      <el-tab-pane label="诊断项配置"> 配置 </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="tsx" setup>
import { onMounted, ref } from "vue";
import { getPageRecordList } from "@/api/mifi/device-type";
import type {
  PageInfo,
  PlusPageInstance,
  PlusColumn
} from "plus-pro-components";
import { useRoute } from "vue-router";

const pageInfo = { page: 1, pageSize: 15 };
const loading = ref(false);
const tableColumns: PlusColumn[] = [
  {
    label: "诊断项",
    prop: "name",
    width: 200,
    align: "left",
    hideInSearch: true
  },
  {
    label: "诊断结果",
    prop: "name",
    minWidth: 200,
    align: "left",
    hideInSearch: true
  },
  {
    label: "是否正常",
    prop: "name",
    width: 100,
    align: "left",
    hideInSearch: true
  },
  {
    label: "处理意见",
    prop: "name",
    minWidth: 200,
    align: "left",
    hideInSearch: true
  }
];
const deviceSn = ref("");
const route = useRoute();
const plusPageInstance = ref<PlusPageInstance | null>(null);
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  const params = { ...query };
  delete params.page;
  delete params.pageSize;
  if (deviceSn.value) {
    params["deviceSn"] = deviceSn.value;
  }
  const { data } = await getPageRecordList(page, pageSize, params);
  return { data: data.data, success: true, total: data.meta.totalRows };
}
const refresh = () => {
  plusPageInstance.value?.getList();
};
const handleDeviceCheck = function () {
  refresh();
};
onMounted(() => {
  deviceSn.value = (route.query.deviceSn as string) || "";
  refresh();
});
</script>

<style lang="scss" scoped>
.rcms-plus-page {
  :deep(.el-card__body) {
    padding: 0px !important;
  }
}
</style>
