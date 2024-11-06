import { $t } from "@/plugins/i18n";
import { menuoverflow } from "@/router/enums";

export default {
  path: "/menuoverflow",
  redirect: "/menuoverflow/index",
  meta: {
    title: $t("menus.pureMenuOverflow"),
    rank: menuoverflow
  },
  children: [
    {
      path: "/menuoverflow/index",
      name: "MenuOverflow",
      component: () => import("@/views/demo/menuoverflow/index.vue"),
      meta: {
        title: $t("menus.pureChildMenuOverflow"),
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
