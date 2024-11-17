export default {
  path: "/system",
  redirect: "/system/enterprise",
  meta: {
    icon: "ri:settings-3-line",
    title: "系统管理",
    rank: 10
  },
  children: [
    {
      path: "/system/enterprise",
      name: "企业管理",
      component: () => import("@/views/rcms/system/enterprise/index.vue"),
      meta: {
        icon: "ep:office-building",
        title: "企业管理"
      }
    },
    {
      path: "/system/merchant",
      name: "商户管理",
      component: () => import("@/views/rcms/system/enterprise/index.vue"),
      meta: {
        icon: "ep:office-building",
        title: "商户管理"
      }
    },
    {
      path: "/system/rolelist",
      name: "角色管理",
      component: () => import("@/views/rcms/system/rolemange/index.vue"),
      meta: {
        icon: "ri:admin-line",
        title: "角色管理"
      }
    },
    {
      path: "/system/account",
      name: "账户管理",
      component: () => import("@/views/rcms/system/accounts/index.vue"),
      meta: {
        icon: "ri:user-5-line",
        title: "账户管理"
      }
    },
    {
      path: "/system/paySetting",
      name: "支付配置",
      component: () => import("@/views/rcms/system/paysetting/index.vue"),
      meta: {
        icon: "ri:wechat-pay-line",
        title: "支付配置"
      }
    },
    {
      path: "/system/userManage",
      name: "用户管理",
      component: () => import("@/views/rcms/system/usermange/index.vue"),
      meta: {
        icon: "ri:user-6-line",
        title: "用户管理"
      }
    },
    {
      path: "/system/menu",
      name: "栏目管理",
      component: () => import("@/views/rcms/frame/menu/index.vue"),
      meta: {
        icon: "ri:align-center",
        keepAlive: true,
        title: "栏目管理"
      }
    },
    {
      path: "/system/dict",
      name: "字典管理",
      component: () => import("@/views/rcms/frame/dict/index.vue"),
      meta: {
        icon: "ep:tickets",
        keepAlive: true,
        title: "字典管理"
      }
    },
    {
      path: "/system/apis",
      name: "接口管理",
      component: () => import("@/views/rcms/frame/apis/index.vue"),
      meta: {
        icon: "ri:usb-line",
        keepAlive: true,
        title: "接口管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
