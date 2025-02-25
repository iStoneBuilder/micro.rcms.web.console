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
    meta: {
      icon: "ri:device-line",
      title: "设备管理",
      showLink: true
    },
    redirect: "/device/terminal",
    children: [
      {
        path: "/device/terminal",
        name: "DeviceTerminal",
        component: () =>
          import("@/views/rcms/unitewifi/device/terminal/index.vue"),
        meta: {
          title: "终端设备",
          showLink: true
        }
      },

      {
        path: "/device/detail",
        name: "DeviceDetail",
        component: () =>
          import("@/views/rcms/unitewifi/device/terminal/form/detail.vue"),
        meta: {
          title: "设备详情",
          showLink: false,
          activePath: "/device/terminal"
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
          import("@/views/rcms/unitewifi/device/thali/index.vue"),
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
        name: "DeviceCheck",
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
    path: "/thali",
    name: "套餐管理",
    component: () => import("@/views/rcms/unitewifi/thali/thali/index.vue"),
    meta: {
      icon: "ep:goods",
      title: "套餐管理",
      showLink: true
    },
    children: [
      {
        path: "/thali/thali",
        name: "套餐配置",
        component: () => import("@/views/rcms/unitewifi/thali/thali/index.vue"),
        meta: {
          title: "套餐配置",
          showLink: true
        }
      },
      {
        path: "/thali/order",
        name: "套餐订单",
        component: () => import("@/views/rcms/unitewifi/thali/order/index.vue"),
        meta: {
          title: "套餐订单",
          showLink: true
        }
      }
    ]
  },
  {
    path: "/flow",
    name: "统计报表",
    meta: {
      icon: "ri:bar-chart-box-line",
      title: "统计报表",
      showLink: true
    },
    redirect: "/flow/report",
    children: [
      {
        path: "/flow/report",
        name: "DeviceReport",
        component: () => import("@/views/rcms/unitewifi/flow/deviceReport.vue"),
        meta: {
          title: "设备流量上报",
          showLink: true
        }
      },
      {
        path: "/flow/sim",
        name: "SimStatistics",
        component: () =>
          import("@/views/rcms/unitewifi/flow/simStatistics.vue"),
        meta: {
          title: "流量卡统计",
          showLink: true
        }
      },
      {
        path: "/flow/device",
        name: "DeviceStatistics",
        component: () =>
          import("@/views/rcms/unitewifi/flow/deviceStatistics.vue"),
        meta: {
          title: "设备流量统计",
          showLink: true
        }
      },
      {
        path: "/flow/merchant",
        name: "MerchantStatistics",
        component: () =>
          import("@/views/rcms/unitewifi/flow/merchantStatistics.vue"),
        meta: {
          title: "商户流量统计",
          showLink: true
        }
      },
      {
        path: "/flow/simMch",
        name: "SimMchStatistics",
        component: () =>
          import("@/views/rcms/unitewifi/flow/simMchStatistics.vue"),
        meta: {
          title: "卡商流量统计",
          showLink: true
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
