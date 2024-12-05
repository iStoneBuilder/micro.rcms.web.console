<template>
  <div>
    <div class="rcms-plus-page">
      <el-alert
        title="任务调度列表：企业级数据；数据创建者可以操作相应数据。"
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
          adaptive: { offsetBottom: 70 }
        }"
        :default-page-info="pageInfo"
        :default-page-size-list="pageSizeList"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useTable } from "plus-pro-components";
import type { PageInfo, PlusPageInstance } from "plus-pro-components";
import { buildTableColum } from "./utils/hook";
import { getCornJobPageList } from "@/api/cron/task";

// --- Table ---
const pageSizeList = [5, 15, 50, 100, 200];
const loading = ref(false);
const { pageInfo } = useTable<Array<any>>();
pageInfo.value.pageSize = 15;
const tableColumns = buildTableColum();

const route = useRoute();
const defaultValues = ref({});
if (Object.keys(route.query).length > 0) {
  defaultValues.value = { ...defaultValues.value, ...route.query };
}
async function getList(query: PageInfo) {
  loading.value = true;
  const { page = 1, pageSize = 15 } = query || {};
  delete query.page;
  delete query.pageSize;
  const { data } = await getCornJobPageList(page, pageSize, query);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("");
    }, 100);
  });
  return { data: data.data, success: true, total: data.meta.totalRows };
}
const plusPageInstance = ref<PlusPageInstance | null>(null);
const refresh = () => {
  plusPageInstance.value?.getList();
};
onMounted(async () => {
  plusPageInstance.value.setSearchFieldsValue(defaultValues.value);
  refresh();
});
</script>
