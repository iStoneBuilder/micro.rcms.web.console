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
      label: "接口名称",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "权限编码",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "接口路径",
      prop: "name",
      minWidth: 500,
      align: "left"
    },
    {
      label: "接口类型",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "请求方式",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "OpenApi",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "操作",
      fixed: "right",
      width: 120,
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
      dataList.value = [{}, {}, {}, {}, {}, {}, {}, {}];
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
