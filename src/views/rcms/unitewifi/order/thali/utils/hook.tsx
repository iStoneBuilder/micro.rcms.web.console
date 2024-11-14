import { nextTick } from "process";
import { message } from "@/utils/message";
import editForm from "../form.vue";
import Search from "../search.vue";
import { addDialog } from "@/components/ReDialog";
import { onMounted, ref, reactive, h } from "vue";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";

let searchData = {};
// index方法字段
export function userManage() {
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref();

  const columns: TableColumnList = [
    {
      label: "套餐名称",
      prop: "name",
      width: 200,
      fixed: "left",
      align: "left"
    },
    {
      label: "套餐编号",
      prop: "name",
      width: 200,
      align: "left"
    },
    {
      label: "所属商户",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "成本价格(¥)",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "套餐价格(¥)",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "计费类型",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "套餐总流量(GB)",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "是否限速",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "有效时长",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "是否上架",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "赠送月份",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "是否赠送",
      prop: "name",
      minWidth: 200,
      align: "left"
    },
    {
      label: "操作",
      fixed: "right",
      width: 300,
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
  function openDialog(title = "新增", row?: FormItemProps) {
    console.log(title, row);
    addDialog({
      title: `${title}套餐`,
      props: {
        formInline: {
          id: row?.id ?? "",
          name: row?.name ?? "",
          code: row?.code ?? "",
          sort: row?.sort ?? 0,
          remark: row?.remark ?? ""
        }
      },
      width: "800px",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`${title}数据成功！`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(async valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              console.log(curData);
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
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
    handleDelete,
    openDialog
  };
}
// 查询条件
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
