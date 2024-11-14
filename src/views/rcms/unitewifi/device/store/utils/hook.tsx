import { onMounted, ref, reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";

let searchData = {};

export function userManage() {
  const dataList = ref([]);
  const loading = ref();

  const columns: TableColumnList = [
    {
      label: "入库批次号",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "入库设备数",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "操作者",
      prop: "name",
      minWidth: 100,
      align: "left"
    },
    {
      label: "操作时间",
      prop: "name",
      minWidth: 100,
      align: "left"
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
      dataList.value = [];
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
