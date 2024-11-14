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
      label: "ICCID",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "商户",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "卡商",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "使用设备",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "运营商",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "剩余流量",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "网络类型",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "流量状态",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "入网分配",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "实名状态",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "SIM卡分类",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "备注",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
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
      dataList.value = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ];
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
