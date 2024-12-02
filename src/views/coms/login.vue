<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { $t, transformI18n } from "@/plugins/i18n";
import { loginRules } from "../demo/login/utils/rule";
import type { FormInstance } from "element-plus";
import { useUserStoreHook } from "@/store/modules/user";
import { message } from "@/utils/message";
import { closeAllDialog } from "@/components/ReDialog";

import User from "@iconify-icons/ri/user-3-fill";
import Lock from "@iconify-icons/ri/lock-fill";
// 声明 props 类型
export interface FormProps {
  formInline: {
    username: string;
    password: string;
  };
}

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    username: "shark-admin",
    password: "TXNAMTIzNDU2Nzg="
  })
});

const newFormInline = ref(props.formInline);

const ruleFormRef = ref();
function getRef() {
  return ruleFormRef.value;
}
const { t } = useI18n();
const loading = ref(false);
const disabled = ref(false);

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      loading.value = true;
      useUserStoreHook()
        .loginByUsername({
          account: newFormInline.value.username,
          password: newFormInline.value.password
        })
        .then(res => {
          if (res.success) {
            message(t("login.pureLoginSuccess"), { type: "success" });
            closeAllDialog();
            setTimeout(() => {
              location.reload();
            }, 200);
          } else {
            message(t("login.pureLoginFail"), { type: "error" });
          }
        })
        .finally(() => (loading.value = false));
    }
  });
};

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="loginRules"
    label-width="22px"
  >
    <el-form-item
      :rules="[
        {
          required: true,
          message: transformI18n($t('login.pureUsernameReg')),
          trigger: 'blur'
        }
      ]"
      prop="username"
    >
      <el-input
        v-model="newFormInline.username"
        clearable
        :placeholder="t('login.pureUsername')"
        class="!w-[220px]"
        :prefix-icon="useRenderIcon(User)"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="newFormInline.password"
        clearable
        show-password
        :placeholder="t('login.purePassword')"
        class="!w-[220px]"
        :prefix-icon="useRenderIcon(Lock)"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        class="mt-4 !w-[220px]"
        size="default"
        type="primary"
        :loading="loading"
        :disabled="disabled"
        @click="onLogin(ruleFormRef)"
      >
        {{ t("login.pureLogin") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
