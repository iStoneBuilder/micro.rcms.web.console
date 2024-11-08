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
      path: "/system/enterprise1",
      name: "商户管理",
      component: () => import("@/views/rcms/system/enterprise/index.vue"),
      meta: {
        title: "商户管理"
      }
    },
    {
      path: "/system/enterprise3",
      name: "角色管理",
      component: () => import("@/views/rcms/system/enterprise/index.vue"),
      meta: {
        title: "角色管理"
      }
    },
    {
      path: "/system/enterprise2",
      name: "账户管理",
      component: () => import("@/views/rcms/system/enterprise/index.vue"),
      meta: {
        title: "账户管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
