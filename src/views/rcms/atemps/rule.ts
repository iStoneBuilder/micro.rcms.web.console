import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  parentId: [
    { required: true, message: "上级企业(商户)为必填项", trigger: "change" }
  ]
});
