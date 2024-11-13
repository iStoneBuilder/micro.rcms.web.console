import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  code: [{ required: true, message: "账户编码必填", trigger: "blur" }],
  name: [{ required: true, message: "账户名称必填", trigger: "blur" }],
  enterpriseId: [
    { required: true, message: "所属商户必填", trigger: "change" }
  ],
  type: [{ required: true, message: "账户类型必填", trigger: "change" }]
});
/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;
