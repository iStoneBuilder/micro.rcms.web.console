import { nextTick } from "process";
import Search from "../search.vue";
import { type Ref, onMounted, ref, reactive, toRaw } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import { getPermissionPageList } from "@/api/rcms/permission";

let searchData = {};

export function userManage(tableRef: Ref) {
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
      prop: "authCode",
      minWidth: 200,
      align: "left"
    },
    {
      label: "接口路径",
      prop: "path",
      minWidth: 500,
      align: "left"
    },
    {
      label: "接口类型",
      prop: "type",
      minWidth: 200,
      align: "left"
    },
    {
      label: "请求方式",
      prop: "method",
      minWidth: 100,
      align: "center",
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} type="success" effect="plain">
          {row.method}
        </el-tag>
      )
    },
    {
      label: "OpenApi",
      prop: "isOpenApi",
      minWidth: 100,
      align: "center",
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.isOpenApi === "Y" ? "success" : "primary"}
          effect="plain"
        >
          {row.isOpenApi === "Y" ? "是" : "否"}
        </el-tag>
      )
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
  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    nextTick(() => {
      onSearch();
    });
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    nextTick(() => {
      onSearch();
    });
  }
  async function onSearch() {
    loading.value = true;
    console.log(tableRef);
    const { data } = await getPermissionPageList(
      pagination.currentPage,
      pagination.pageSize,
      toRaw(searchData)
    );
    dataList.value = data.data;
    pagination.total = data.meta.totalRows;
    pagination.pageSize = data.meta.pageSize;
    pagination.currentPage = data.meta.curPage;
    setTimeout(() => {
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
    handleSizeChange,
    handleCurrentChange
  };
}

export function searchManage() {
  // 处理搜索页面的操作
  function handleSearchImpl(op: string, search: object) {
    searchData = search;
    nextTick(() => {
      // userManage()?.onSearch();
    });
  }
  return { handleSearchImpl };
}
