import dayjs from "dayjs";
import editForm from "../form.vue";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import { createEnterprise } from "@/api/rcms/enterprise";
import { getRoleList } from "@/api/rcms/rolemanage";
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

  function openDialog(title = "新增", row?: FormItemProps) {
    const options = formatHigherDeptOptions(cloneDeep(dataList.value));
    const selected = findSelected(options, row?.parentId);
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          higherDeptOptions: options,
          parentId: row?.parentId ?? 0,
          name: row?.name ?? "",
          principal: row?.principal ?? "",
          phone: row?.phone ?? "",
          email: row?.email ?? "",
          sort: row?.sort ?? 0,
          status: row?.status ?? "Y",
          remark: row?.remark ?? "",
          level: row?.level ?? 2,
          type: row?.type ?? "",
          isEdit: title === "修改",
          pType: selected?.type ?? ""
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
          message(`您${title}了部门名称为${curData.name}的这条数据`, {
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
              const { data } = await createEnterprise(curData);
              console.log(data, "===========");
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

  function handleDelete(row) {
    message(`您删除了部门名称为${row.name}的这条数据`, { type: "success" });
    onSearch();
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
