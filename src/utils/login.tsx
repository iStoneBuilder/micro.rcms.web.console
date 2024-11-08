import { h } from "vue";
import { addDialog } from "@/components/ReDialog";
import forms from "../views/coms/login.vue";

export function reLogin() {
  addDialog({
    width: "294px",
    title: `重新登录`,
    closeOnPressEscape: false,
    showClose: false,
    hideFooter: true,
    contentRenderer: () => h(forms)
  });
}
