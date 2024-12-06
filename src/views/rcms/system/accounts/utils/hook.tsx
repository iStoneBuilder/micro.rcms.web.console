import "./reset.css";
import dayjs from "dayjs";
import { REGEXP_PWD } from "./rule";
import roleForm from "../form/role.vue";
import editForm from "../form/index.vue";
import { zxcvbn } from "@zxcvbn-ts/core";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import userAvatar from "@/assets/user.jpg";
import { usePublicHooks } from "../../../hooks";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import ReCropperPreview from "@/components/ReCropperPreview";
import type { FormItemProps, RoleFormItemProps } from "./types";
import { getKeyList, isAllEmpty, deviceDetection } from "@pureadmin/utils";
import {
  getAccountPageList,
  createAccount,
  updateAccount,
  deleteAccount
} from "@/api/rcms/account";
import { getEnterpriseRoleList, getRoleList } from "@/api/rcms/rolemanage";
import { getEnterpriseId } from "@/utils/common";

import { getEnterpriseList } from "@/api/rcms/enterprise";
import {
  ElForm,
  ElInput,
  ElFormItem,
  ElProgress,
  ElMessageBox
} from "element-plus";
import {
  type Ref,
  h,
  ref,
  toRaw,
  watch,
  computed,
  reactive,
  onMounted
} from "vue";
import { nextTick } from "process";

export function useUser(tableRef: Ref, treeRef: Ref) {
  const form = reactive({
    // 左侧部门树的id
    enterpriseId: null,
    code: null,
    name: null,
    status: null
  });
  const allRole = ref([]);
  const formRef = ref();
  const ruleFormRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  // 上传头像信息
  const avatarInfo = ref();
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const higherDeptOptions = ref();
  const treeData = ref([]);
  const treeLoading = ref(true);
  const selectedNum = ref(0);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 15,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "账户",
      prop: "code",
      width: 130,
      fixed: "left"
    },
    {
      label: "账户名称",
      prop: "name",
      width: 150
    },
    {
      label: "账户类型",
      prop: "type",
      width: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.type === "account" ? "primary" : "danger"}
          effect="plain"
        >
          {row.type === "account" ? "账户" : "程序"}
        </el-tag>
      )
    },
    {
      label: "账户所属",
      prop: "merchant",
      width: 200
    },
    {
      label: "角色",
      prop: "rNames",
      width: 300
    },
    {
      label: "状态",
      prop: "status",
      width: 90,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={"Y"}
          inactive-value={"N"}
          active-text="已启用"
          inactive-text="已停用"
          inline-prompt
          style={switchStyle.value}
          onChange={() => onChange(scope as any)}
        />
      )
    },
    {
      label: "创建时间",
      width: 220,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 140,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });
  // 重置的新密码
  const pwdForm = reactive({
    newPwd: ""
  });
  const pwdProgress = [
    { color: "#e74242", text: "非常弱" },
    { color: "#EFBD47", text: "弱" },
    { color: "#ffa500", text: "一般" },
    { color: "#1bbf1b", text: "强" },
    { color: "#008000", text: "非常强" }
  ];
  // 当前密码强度（0-4）
  const curScore = ref();

  function onChange({ row }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === "N" ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.name
      }</strong>用户吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(async () => {
        await updateAccount(row.code, { status: row.status });
        message("已成功修改用户状态", {
          type: "success"
        });
      })
      .catch(() => {
        row.status === "N" ? (row.status = "Y") : (row.status = "N");
      });
  }

  function handleDelete(row) {
    ElMessageBox.confirm(`确认是否删除账户: ${row.name} `, "温馨提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      draggable: true
    })
      .then(async () => {
        await deleteAccount(row?.code);
        onSearch();
      })
      .catch(() => {
        console.log("取消删除");
      });
    onSearch();
  }

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

  /** 当CheckBox选择项发生变化时会触发该事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }

  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    tableRef.value.getTableRef().clearSelection();
  }

  /** 批量删除 */
  function onbatchDel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    // 接下来根据实际业务，通过选中行的某项数据，比如下面的id，调用接口进行批量删除
    message(`已删除用户编号为 ${getKeyList(curSelected, "id")} 的数据`, {
      type: "success"
    });
    tableRef.value.getTableRef().clearSelection();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getAccountPageList(
      pagination.currentPage,
      pagination.pageSize,
      toRaw(form)
    );
    const accounts = data.data;
    // 处理角色显示
    accounts.forEach(item => {
      const roles = item?.roles?.split(",") ?? [];
      const names = [];
      roles.forEach(code => {
        for (let index = 0; index < allRole.value.length; index++) {
          const iRole = allRole.value[index];
          if (iRole.code === code) {
            names.push(iRole.name);
            break;
          }
        }
      });
      item.rNames = names.join(",");
    });
    dataList.value = accounts;
    pagination.total = data.meta.totalRows;
    pagination.pageSize = data.meta.pageSize;
    pagination.currentPage = data.meta.curPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    form.enterpriseId = null;
    treeRef.value.onTreeReset();
    onSearch();
  };

  function onTreeSelect({ id, selected }) {
    form.enterpriseId = selected ? id : null;
    onSearch();
  }

  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
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
    addDialog({
      title: `${title}账户`,
      props: {
        formInline: {
          title,
          higherDeptOptions: formatHigherDeptOptions(higherDeptOptions.value),
          enterpriseId: row?.enterpriseId ?? 0,
          code: row?.code ?? "",
          name: row?.name ?? "",
          type: row?.type ?? "account",
          status: row?.status ?? "Y",
          description: row?.description ?? "",
          isEdit: title === "修改"
        }
      },
      width: "400px",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了用户名称为${curData.name}的这条数据`, {
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
              await createAccount(curData);
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              await updateAccount(curData.code, curData);
              chores();
            }
          }
        });
      }
    });
  }

  const cropRef = ref();
  /** 上传头像 */
  function handleUpload(row) {
    addDialog({
      title: "裁剪、上传头像",
      width: "40%",
      closeOnClickModal: false,
      fullscreen: deviceDetection(),
      contentRenderer: () =>
        h(ReCropperPreview, {
          ref: cropRef,
          imgSrc: row.avatar || userAvatar,
          onCropper: info => (avatarInfo.value = info)
        }),
      beforeSure: done => {
        console.log("裁剪后的图片信息：", avatarInfo.value);
        // 根据实际业务使用avatarInfo.value和row里的某些字段去调用上传头像接口即可
        done(); // 关闭弹框
        onSearch(); // 刷新表格数据
      },
      closeCallBack: () => cropRef.value.hidePopover()
    });
  }

  watch(
    pwdForm,
    ({ newPwd }) =>
      (curScore.value = isAllEmpty(newPwd) ? -1 : zxcvbn(newPwd).score)
  );

  /** 重置密码 */
  function handleReset(row) {
    addDialog({
      title: `重置 ${row.name} 的密码`,
      width: "400px",
      draggable: true,
      closeOnClickModal: false,
      fullscreen: deviceDetection(),
      contentRenderer: () => (
        <div>
          <ElForm ref={ruleFormRef} model={pwdForm}>
            <ElFormItem
              prop="newPwd"
              rules={[
                {
                  validator: (rule, value, callback) => {
                    if (value === "") {
                      callback(new Error("请输入新密码"));
                    } else if (!REGEXP_PWD.test(value)) {
                      callback(
                        new Error(
                          "密码格式应为8-18位数字、字母、符号的任意两种组合"
                        )
                      );
                    } else {
                      callback();
                    }
                  },
                  trigger: "blur"
                }
              ]}
            >
              <ElInput
                clearable
                show-password
                type="password"
                v-model={pwdForm.newPwd}
                placeholder="请输入新密码"
              />
            </ElFormItem>
          </ElForm>
          <div class="mt-4 flex">
            {pwdProgress.map(({ color, text }, idx) => (
              <div
                class="w-[19vw]"
                style={{ marginLeft: idx !== 0 ? "4px" : 0 }}
              >
                <ElProgress
                  striped
                  striped-flow
                  duration={curScore.value === idx ? 6 : 0}
                  percentage={curScore.value >= idx ? 100 : 0}
                  color={color}
                  stroke-width={10}
                  show-text={false}
                />
                <p
                  class="text-center"
                  style={{ color: curScore.value === idx ? color : "" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
      closeCallBack: () => (pwdForm.newPwd = ""),
      beforeSure: done => {
        ruleFormRef.value.validate(async valid => {
          if (valid) {
            // 根据实际业务使用pwdForm.newPwd和row里的某些字段去调用重置用户密码接口即可
            await updateAccount(row.code, { password: btoa(pwdForm.newPwd) });
            // 表单规则校验通过
            message(`已成功重置 ${row.name} 用户的密码`, {
              type: "success"
            });
            done(); // 关闭弹框
            onSearch(); // 刷新表格数据
          }
        });
      }
    });
  }

  /** 分配角色 */
  async function handleRole(row) {
    // 选中的角色列表
    const { data } = await getEnterpriseRoleList({
      enterpriseId: row.enterpriseId
    });
    addDialog({
      title: `分配角色`,
      props: {
        formInline: {
          code: row?.code ?? "",
          name: row?.name ?? "",
          merchant: row?.merchant ?? "",
          roleOptions: data ?? [],
          ids: row?.roles?.split(",") ?? []
        }
      },
      width: "400px",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(roleForm),
      beforeSure: async (done, { options }) => {
        const curData = options.props.formInline as RoleFormItemProps;
        // 根据实际业务使用curData.ids和row里的某些字段去调用修改角色接口即可
        await updateAccount(row.code, { roles: curData.ids.toString() });
        done(); // 关闭弹框
        message(`授权 ${row.name} 账户成功！`, {
          type: "success"
        });
        onSearch(); // 刷新表格数据
      }
    });
  }

  async function loadEnterPriseTree() {
    // 归属部门
    const { data } = await getEnterpriseList({ id: getEnterpriseId() });
    higherDeptOptions.value = handleTree(data);
    treeData.value = handleTree(data);
    treeLoading.value = false;
  }

  onMounted(async () => {
    treeLoading.value = true;
    //  加载角色数据
    const { data } = await getRoleList({ id: getEnterpriseId() });
    allRole.value = data;
    onSearch();
    loadEnterPriseTree();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    treeData,
    treeLoading,
    selectedNum,
    pagination,
    buttonClass,
    deviceDetection,
    onSearch,
    resetForm,
    onbatchDel,
    openDialog,
    onTreeSelect,
    handleDelete,
    handleUpload,
    handleReset,
    handleRole,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
