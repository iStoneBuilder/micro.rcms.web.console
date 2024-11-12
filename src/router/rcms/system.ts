export default {
  path: "/system",
  redirect: "/system/enterprise",
  meta: {
    icon: "ri:settings-3-line",
    title: "系统管理",
    rank: 1
  },
  children: [
    {
      path: "/system/enterprise",
      name: "企业管理",
      component: () => import("@/views/rcms/system/enterprise/index.vue"),
      meta: {
        title: "企业管理"
      }
    },
    {
      path: "/system/merchant",
      name: "商户管理",
      component: () => import("@/views/rcms/system/enterprise/index.vue"),
      meta: {
        title: "商户管理"
      }
    },
    {
      path: "/system/rolelist",
      name: "角色管理",
      component: () => import("@/views/rcms/system/rolemange/index.vue"),
      meta: {
        title: "角色管理"
      }
    },
    {
      path: "/system/account",
      name: "账户管理",
      component: () => import("@/views/rcms/system/accounts/index.vue"),
      meta: {
        title: "账户管理"
      }
    },
    {
      path: "/system/account1",
      name: "支付配置",
      component: () => import("@/views/rcms/system/accounts/index.vue"),
      meta: {
        title: "支付配置"
      }
    },
    {
      path: "/system/enterprise4",
      name: "用户管理",
      component: () => import("@/views/rcms/system/enterprise/index.vue"),
      meta: {
        title: "用户管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
