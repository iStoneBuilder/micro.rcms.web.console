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
