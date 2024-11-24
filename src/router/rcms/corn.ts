export default {
  path: "/corn",
  redirect: "/corn/list",
  meta: {
    icon: "ri:timer-flash-line",
    title: "定时任务",
    rank: 10
  },
  children: [
    {
      path: "/corn/group",
      name: "任务组",
      component: () => import("@/views/rcms/corn/group/index.vue"),
      meta: {
        icon: "ep:files",
        title: "任务组"
      }
    },
    {
      path: "/corn/task",
      name: "任务列表",
      component: () => import("@/views/rcms/corn/task/index.vue"),
      meta: {
        icon: "ri:indent-increase",
        title: "任务列表"
      }
    },
    {
      path: "/corn/job",
      name: "任务调度列表",
      component: () => import("@/views/rcms/corn/job/index.vue"),
      meta: {
        icon: "ri:file-list-2-line",
        title: "任务调度列表"
      }
    }
  ]
} satisfies RouteConfigsTable;
