import { nextTick } from "process";
import Search from "../search.vue";
import { onMounted } from "vue";

let searchData = {};

export function userManage() {
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
    console.log(searchData, new Date());
  }
  onMounted(() => {
    onSearch();
  });
  return { searchForm, onSearch, viewDetail, handleDelete };
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
