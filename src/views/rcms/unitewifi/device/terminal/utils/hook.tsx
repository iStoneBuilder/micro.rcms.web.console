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
      label: "设备SN",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "IMEI",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "上网模式",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "在线?",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "商户",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "设备类型",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "设备组",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "入库批次号",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "检测状态",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "设备状态",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "操作",
      fixed: "right",
      width: 160,
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
      dataList.value = [{}, {}];
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
