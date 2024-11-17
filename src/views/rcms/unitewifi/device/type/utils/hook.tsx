import { onMounted, ref, reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";

let searchData = {};

export function userManage() {
  const dataList = ref([]);
  const loading = ref();

  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "类型名称",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "类型编号",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "销售名称",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "设备型号",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "本地卡模式",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "状态",
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
      width: 210,
      slot: "operation"
    }
  ];
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 15,
    currentPage: 1,
    background: true
  });
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
    onSearch,
    viewDetail,
    handleDelete
  };
}
