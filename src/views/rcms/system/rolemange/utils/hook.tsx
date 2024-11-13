import dayjs from "dayjs";
import editForm from "../form.vue";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { getEnterpriseListByPid } from "@/api/rcms/enterprise";
import {
  getRoleList,
  createRole,
  updateRole,
  deleteRole
} from "@/api/rcms/rolemanage";
import { addDialog } from "@/components/ReDialog";
import { reactive, ref, onMounted, h } from "vue";
import type { FormItemProps } from "./types";
import { cloneDeep, isAllEmpty, deviceDetection } from "@pureadmin/utils";
import { findSelected, getEnterpriseId } from "@/utils/common";

export function useDept() {
  const form = reactive({
    name: "",
    type: null
  });

  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);

  const columns: TableColumnList = [
    {
      label: "角色名称",
      prop: "name",
      width: 300,
      align: "left"
    },
    {
      label: "角色编码",
      prop: "code",
      width: 200,
      align: "left"
    },
    {
      label: "角色所属",
      prop: "merchant",
      width: 300,
      align: "left"
    },
    {
      label: "备注",
      prop: "description",
      minWidth: 300
    },
    {
      label: "创建人",
      minWidth: 160,
      prop: "createBy"
    },
    {
      label: "创建时间",
      minWidth: 160,
      prop: "createDate",
      formatter: ({ createDate }) =>
        dayjs(createDate).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
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
    // 这里是返回一维数组结构，前端自行处理成树结构，返回格式要求：唯一id加父节点parentId，parentId取父节点id
    const { data } = await getRoleList({ id: getEnterpriseId() });
    let newData = data;
    if (!isAllEmpty(form.name)) {
      // 前端搜索部门名称
      newData = newData.filter(item => item.name.includes(form.name));
    }
    if (!isAllEmpty(form.type)) {
      // 前端搜索状态
      newData = newData.filter(item => item.type === form.type);
    }
    const treeData = handleTree(newData);
    if (treeData.length > 0) {
      treeData[0].disabled = true;
    }
    dataList.value = treeData; // 处理成树结构
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，
    // 用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，
    // 这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = treeList[i].status === 0 ? true : false;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  async function openDialog(title = "新增", row?: FormItemProps) {
    const options = formatHigherDeptOptions(cloneDeep(dataList.value));
    const selected = findSelected(options, row?.parentId);
    let merchants = [];
    if (selected) {
      const { data } = await getEnterpriseListByPid({
        parentId: selected?.enterpriseId
      });
      merchants = data;
    }
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          higherDeptOptions: options,
          parentId: row?.parentId ?? 0,
          name: row?.name ?? "",
          id: row?.id ?? "",
          code: row?.code ?? "",
          description: row?.description ?? "",
          isEdit: title === "修改",
          enterpriseId: row?.enterpriseId ?? "",
          merchants: merchants
        }
      },
      width: "500px",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`${title}成功！`, {
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
              await createRole(curData);
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              await updateRole(curData.id, curData);
              chores();
            }
          }
        });
      }
    });
  }

  function handleDelete(row) {
    if (row?.children && row?.children.length > 0) {
      message(`存在下级角色，禁止删除！`, {
        type: "warning"
      });
      return;
    }
    ElMessageBox.confirm(
      "如果当前角色已被使用，禁止删除，是否继续?",
      "温馨提示",
      {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        draggable: true
      }
    )
      .then(async () => {
        await deleteRole(row?.id);
        onSearch();
      })
      .catch(() => {
        console.log("取消删除");
      });
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    /** 搜索 */
    onSearch,
    /** 重置 */
    resetForm,
    /** 新增、修改部门 */
    openDialog,
    /** 删除部门 */
    handleDelete
  };
}
