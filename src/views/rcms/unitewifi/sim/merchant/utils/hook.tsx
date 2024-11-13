import { nextTick } from "process";
import Search from "../search.vue";
import { onMounted, ref, reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";

let searchData = {};

export function userManage() {
  const dataList = ref([]);
  const loading = ref();

  const columns: TableColumnList = [
    {
      label: "卡商编号",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "卡商名称",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "备注",
      prop: "name",
      width: 400,
      align: "left"
    },
    {
      label: "操作",
      fixed: "right",
      width: 260,
      slot: "operation"
    }
  ];
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 15,
    currentPage: 1,
    background: true
  });
  const searchForm = {
    key: "search",
    title: "查询表单",
    component: Search
  };
  function viewDetail(title: string, row: object) {
    console.log(title, row);
  }
  function handleDelete(title: string, row: object) {
    console.log(title, row);
  }
  function onSearch() {
    loading.value = true;
    console.log(searchData, new Date());
    setTimeout(() => {
      dataList.value = [{}];
      loading.value = false;
    }, 500);
  }
  onMounted(() => {
    onSearch();
  });
  return {
    loading,
    columns,
    pagination,
    dataList,
    searchForm,
    onSearch,
    viewDetail,
    handleDelete
  };
}

export function searchManage() {
  // 处理搜索页面的操作
  function handleSearchImpl(op: string, search: object) {
    searchData = search;
    nextTick(() => {
      userManage()?.onSearch();
    });
  }
  return { handleSearchImpl };
}
