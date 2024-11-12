export default [
  {
    path: "/welcome1",
    name: "Welcome1",
    component: () => import("@/views/demo/welcome/index.vue"),
    meta: {
      icon: "ri:bank-card-line",
      title: "SIM卡管理",
      showLink: true
    },
    children: [
      {
        path: "/welcome11",
        name: "Welcome11",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "SIM卡商",
          showLink: true
        }
      },
      {
        path: "/welcome12",
        name: "Welcome12",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "SIM卡",
          showLink: true
        }
      }
    ]
  },
  {
    path: "/welcome2",
    name: "Welcome2",
    component: () => import("@/views/demo/welcome/index.vue"),
    meta: {
      icon: "ri:device-line",
      title: "设备管理",
      showLink: true
    },
    children: [
      {
        path: "/welcome21",
        name: "Welcome21",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "终端设备",
          showLink: true
        }
      },
      {
        path: "/welcome221",
        name: "Welcome221",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "设备类型",
          showLink: true
        }
      },
      {
        path: "/welcome22",
        name: "Welcome22",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "设备分组",
          showLink: true
        }
      },
      {
        path: "/welcome23",
        name: "Welcome23",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "设备入库",
          showLink: true
        }
      },
      {
        path: "/welcome24",
        name: "Welcome24",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "设备分发",
          showLink: true
        }
      },
      {
        path: "/welcome25",
        name: "Welcome25",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "设备套餐",
          showLink: true
        }
      },
      {
        path: "/welcome26",
        name: "Welcome26",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "设备实名",
          showLink: true
        }
      },
      {
        path: "/welcome27",
        name: "Welcome27",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "设备诊断",
          showLink: true
        }
      }
    ]
  },
  {
    path: "/welcome3",
    name: "Welcome3",
    component: () => import("@/views/demo/welcome/index.vue"),
    meta: {
      icon: "ep:goods",
      title: "套餐订单",
      showLink: true
    },
    children: [
      {
        path: "/welcome31",
        name: "Welcome31",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "套餐配置",
          showLink: true
        }
      },
      {
        path: "/welcome32",
        name: "Welcome32",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "套餐订单",
          showLink: true
        }
      },
      {
        path: "/welcome33",
        name: "Welcome33",
        component: () => import("@/views/demo/welcome/index.vue"),
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
    component: () => import("@/views/demo/welcome/index.vue"),
    meta: {
      icon: "ri:bar-chart-box-line",
      title: "统计报表",
      showLink: true
    },
    children: [
      {
        path: "/welcome41",
        name: "Welcome41",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "流量卡上报",
          showLink: true
        }
      },
      {
        path: "/welcome42",
        name: "Welcome42",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "设备流量上报",
          showLink: true
        }
      },
      {
        path: "/welcome43",
        name: "Welcome43",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "流量卡统计",
          showLink: true
        }
      },
      {
        path: "/welcome44",
        name: "Welcome44",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "设备流量统计",
          showLink: true
        }
      },
      {
        path: "/welcome45",
        name: "Welcome45",
        component: () => import("@/views/demo/welcome/index.vue"),
        meta: {
          title: "卡商流量统计",
          showLink: true
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
