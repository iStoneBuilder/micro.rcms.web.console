import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  parentId: [
    { required: true, message: "上级角色为必填项", trigger: "change" }
  ],
  code: [{ required: true, message: "角色编码为必填项", trigger: "blur" }],
  name: [{ required: true, message: "角色名称为必填项", trigger: "blur" }],
  enterpriseId: [
    { required: true, message: "角色所属为必填项", trigger: "change" }
  ]
});
