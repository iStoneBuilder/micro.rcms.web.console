export default [
  {
    path: "/sim",
    name: "卡管理",
    component: () => import("@/views/rcms/unitewifi/sim/merchant/index.vue"),
    meta: {
      icon: "ri:bank-card-line",
      title: "卡管理",
      showLink: true
    },
    children: [
      {
        path: "/sim/merchant",
        name: "SIM卡商",
        component: () =>
          import("@/views/rcms/unitewifi/sim/merchant/index.vue"),
        meta: {
          title: "SIM卡商",
          showLink: true
        }
      },
      {
        path: "/sim/info",
        name: "SIM卡",
        component: () => import("@/views/rcms/unitewifi/sim/sim/index.vue"),
        meta: {
          title: "SIM卡",
          showLink: true
        }
      }
    ]
  },
  {
    path: "/device",
    name: "设备管理",
    component: () => import("@/views/rcms/unitewifi/device/terminal/index.vue"),
    meta: {
      icon: "ri:device-line",
      title: "设备管理",
      showLink: true
    },
    children: [
      {
        path: "/device/terminal",
        name: "Welcome21",
        component: () =>
          import("@/views/rcms/unitewifi/device/terminal/index.vue"),
        meta: {
          title: "终端设备",
          showLink: true
        }
      },
      {
        path: "/device/type",
        name: "设备类型",
        component: () => import("@/views/rcms/unitewifi/device/type/index.vue"),
        meta: {
          title: "设备类型",
          showLink: true
        }
      },
      {
        path: "/device/group",
        name: "设备分组",
        component: () =>
          import("@/views/rcms/unitewifi/device/group/index.vue"),
        meta: {
          title: "设备分组",
          showLink: true
        }
      },
      {
        path: "/device/store",
        name: "设备入库",
        component: () =>
          import("@/views/rcms/unitewifi/device/store/index.vue"),
        meta: {
          title: "设备入库",
          showLink: true
        }
      },
      {
        path: "/device/divide",
        name: "设备分发",
        component: () =>
          import("@/views/rcms/unitewifi/device/divide/index.vue"),
        meta: {
          title: "设备分发",
          showLink: true
        }
      },
      {
        path: "/device/order",
        name: "设备套餐",
        component: () =>
          import("@/views/rcms/unitewifi/device/order/index.vue"),
        meta: {
          title: "设备套餐",
          showLink: true
        }
      },
      {
        path: "/device/name",
        name: "设备实名",
        component: () => import("@/views/rcms/unitewifi/device/name/index.vue"),
        meta: {
          title: "设备实名",
          showLink: true
        }
      },
      {
        path: "/device/check",
        name: "设备诊断",
        component: () =>
          import("@/views/rcms/unitewifi/device/check/index.vue"),
        meta: {
          title: "设备诊断",
          showLink: true
        }
      }
    ]
  },
  {
    path: "/order",
    name: "套餐管理",
    component: () => import("@/views/rcms/unitewifi/order/thali/index.vue"),
    meta: {
      icon: "ep:goods",
      title: "套餐管理",
      showLink: true
    },
    children: [
      {
        path: "/order/thali",
        name: "套餐配置",
        component: () => import("@/views/rcms/unitewifi/order/thali/index.vue"),
        meta: {
          title: "套餐配置",
          showLink: true
        }
      },
      {
        path: "/order/order",
        name: "套餐订单",
        component: () => import("@/views/rcms/unitewifi/order/order/index.vue"),
        meta: {
          title: "套餐订单",
          showLink: true
        }
      },
      {
        path: "/order/stat",
        name: "订单统计",
        component: () => import("@/views/rcms/unitewifi/order/stat/index.vue"),
        meta: {
          title: "订单统计",
          showLink: true
        }
      }
    ]
  },
  {
    path: "/welcome4",
    name: "Welcome4",
    component: () => import("@/views/rcms/unitewifi/device/terminal/index.vue"),
    meta: {
      icon: "ri:bar-chart-box-line",
      title: "统计报表",
      showLink: true
    },
    children: [
      {
        path: "/welcome41",
        name: "Welcome41",
        component: () =>
          import("@/views/rcms/unitewifi/device/terminal/index.vue"),
        meta: {
          title: "流量卡上报",
          showLink: true
        }
      },
      {
        path: "/welcome42",
        name: "Welcome42",
        component: () =>
          import("@/views/rcms/unitewifi/device/terminal/index.vue"),
        meta: {
          title: "设备流量上报",
          showLink: true
        }
      },
      {
        path: "/welcome43",
        name: "Welcome43",
        component: () =>
          import("@/views/rcms/unitewifi/device/terminal/index.vue"),
        meta: {
          title: "流量卡统计",
          showLink: true
        }
      },
      {
        path: "/welcome44",
        name: "Welcome44",
        component: () =>
          import("@/views/rcms/unitewifi/device/terminal/index.vue"),
        meta: {
          title: "设备流量统计",
          showLink: true
        }
      },
      {
        path: "/welcome45",
        name: "Welcome45",
        component: () =>
          import("@/views/rcms/unitewifi/device/terminal/index.vue"),
        meta: {
          title: "卡商流量统计",
          showLink: true
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;