import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { getMenuList, deleteMenu } from "@/api/rcms/menu";
import { transformI18n } from "@/plugins/i18n";
import { reactive, ref, onMounted, h } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { isAllEmpty } from "@pureadmin/utils";

export function useMenu() {
  const form = reactive({
    title: ""
  });

  const show = ref(false);
  const dataList = ref([]);
  const loading = ref(true);
  const opTitle = ref("");
  const currRow = ref({});

  const columns: TableColumnList = [
    {
      label: "菜单名称",
      prop: "title",
      align: "left",
      width: 300,
      cellRenderer: ({ row }) => (
        <div>
          <span class="inline-block mr-1">
            {h(useRenderIcon(row.icon), {
              style: { paddingTop: "1px" }
            })}
          </span>
          <span>{transformI18n(row.title)}</span>
        </div>
      )
    },
    {
      label: "路由名称",
      prop: "name",
      width: 200
    },
    {
      label: "路由路径",
      prop: "path",
      width: 200
    },
    {
      label: "组件路径",
      prop: "component"
    },
    {
      label: "排序",
      prop: "rankSort",
      width: 60
    },
    {
      label: "隐藏",
      prop: "showLink",
      width: 60,
      align: "center",
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.showLink === "true" ? "primary" : "success"}
        >
          {row.showLink === "true" ? "否" : "是"}
        </el-tag>
      )
    },
    {
      label: "操作",
      fixed: "right",
      width: 160,
      slot: "operation"
    }
  ];

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getMenuList();
    // 这里是返回一维数组结构，前端自行处理成树结构，返回格式要求：唯一id加父节点parentId，
    // parentId取父节点id
    let newData = data;
    if (!isAllEmpty(form.title)) {
      // 前端搜索菜单名称
      newData = newData.filter(item =>
        transformI18n(item.title).includes(form.title)
      );
    }
    dataList.value = handleTree(newData); // 处理成树结构
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title = "新增", row?: object) {
    opTitle.value = title;
    currRow.value = row || {};
    show.value = true;
  }

  function handleDelete(row) {
    if (row?.children && row?.children.length > 0) {
      message(`存在下级菜单，禁止删除！`, {
        type: "warning"
      });
      return;
    }
    ElMessageBox.confirm("你确定删除当前数据吗，是否继续?", "温馨提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      draggable: true
    })
      .then(async () => {
        await deleteMenu(row?.id);
        message(`删除成功！`, {
          type: "success"
        });
        onSearch();
      })
      .catch(() => {
        console.log("取消删除");
      });
    onSearch();
  }

  function handleCallBack() {
    currRow.value = {};
    show.value = false;
    onSearch();
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    show,
    opTitle,
    currRow,
    loading,
    columns,
    dataList,
    /** 搜索 */
    onSearch,
    /** 重置 */
    resetForm,
    /** 新增、修改菜单 */
    openDialog,
    /** 删除菜单 */
    handleDelete,
    handleCallBack
  };
}
