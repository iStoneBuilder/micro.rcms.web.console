import { onMounted, ref, reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import type { PlusColumn } from "plus-pro-components";

export function userManage() {
  const dataList = ref([]);
  const loading = ref();
  const state = ref({
    status: "0",
    time: new Date().toString()
  });
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
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

  const searchColumns: PlusColumn[] = [
    {
      label: "名称",
      prop: "name",
      valueType: "copy",
      tooltip: "名称最多显示6个字符"
    },
    {
      label: "状态",
      prop: "status",
      valueType: "select",
      options: [
        {
          label: "未解决",
          value: "0",
          color: "red"
        },
        {
          label: "已解决",
          value: "1",
          color: "blue"
        },
        {
          label: "解决中",
          value: "2",
          color: "yellow"
        },
        {
          label: "失败",
          value: "3",
          color: "red"
        }
      ]
    },
    {
      label: "时间",
      prop: "time",
      valueType: "date-picker"
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
    onSearch();
  }
  function onSearch() {
    loading.value = true;
    setTimeout(() => {
      dataList.value = [{}, {}];
      loading.value = false;
    }, 500);
  }
  const handleChange = (values: any) => {
    console.log(values, "change");
    onSearch();
  };
  const handleSearch = (values: any) => {
    console.log(values, "search");
    onSearch();
  };
  const handleReset = () => {
    console.log("handleReset");
    onSearch();
  };
  onMounted(() => {
    onSearch();
  });
  return {
    state,
    loading,
    columns,
    pagination,
    dataList,
    searchColumns,
    onSearch,
    viewDetail,
    handleDelete,
    handleChange,
    handleSearch,
    handleReset
  };
}
