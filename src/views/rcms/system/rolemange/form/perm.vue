<template>
  <div class="rcms-plus-page">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="角色信息" name="1">
        <PlusDescriptions
          :column="2"
          :columns="newColumns"
          :data="currentRow"
          :label-width="160"
        />
      </el-collapse-item>
      <el-collapse-item title="角色授权" name="2">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="菜单权限" name="first">
            <permMenu :currentRow="currentRow" />
          </el-tab-pane>
          <el-tab-pane label="接口权限" name="second">
            <permInter :currentRow="currentRow" />
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { cloneDeep } from "@pureadmin/utils";
import permInter from "./perm-inter.vue";
import permMenu from "./perm-menu.vue";
const props = defineProps<{
  currentRow: any;
  createColumns: TableColumnList;
}>();
const activeNames = ref(["1", "2"]);
const activeTab = ref("first");
const newColumns = cloneDeep(props.createColumns);
newColumns.splice(-1, 1);
newColumns.forEach(item => {
  item["descriptionsItemProps"] = {
    labelAlign: "right"
  };
});
</script>
