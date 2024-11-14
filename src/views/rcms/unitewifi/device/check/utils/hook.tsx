import { onMounted, ref, reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";

let searchData = {};

export function userManage() {
  const dataList = ref([]);
  const loading = ref();

  const columns: TableColumnList = [
    {
      label: "诊断项",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "诊断结果",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "是否正常",
      prop: "name",
      width: 100,
      align: "left"
    },
    {
      label: "处理意见",
      prop: "name",
      minWidth: 200,
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
