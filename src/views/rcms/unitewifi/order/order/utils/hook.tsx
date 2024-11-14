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
      label: "订单号",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "商品名称",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "商户",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "商品类型",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "设备SN",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "支付方式",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "购买数量",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "总价格(¥)",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "已退款金额(¥)",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "订单状态",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "退款状态",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "下单时间",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "下单人",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "操作",
      fixed: "right",
      width: 200,
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
