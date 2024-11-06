import { $t } from "@/plugins/i18n";
import { components } from "@/router/enums";

export default {
  path: "/components",
  redirect: "/components/dialog",
  meta: {
    icon: "ep:menu",
    title: $t("menus.pureComponents"),
    rank: components
  },
  children: [
    {
      path: "/components/dialog",
      name: "DialogPage",
      component: () => import("@/views/demo/components/dialog/index.vue"),
      meta: {
        title: $t("menus.pureDialog")
      }
    },
    {
      path: "/components/drawer",
      name: "DrawerPage",
      component: () => import("@/views/demo/components/drawer/index.vue"),
      meta: {
        title: $t("menus.pureDrawer")
      }
    },
    {
      path: "/components/message",
      name: "Message",
      component: () => import("@/views/demo/components/message.vue"),
      meta: {
        title: $t("menus.pureMessage")
      }
    },
    {
      path: "/components/upload",
      name: "PureUpload",
      component: () => import("@/views/demo/components/upload/index.vue"),
      meta: {
        title: $t("menus.pureUpload")
      }
    },
    {
      path: "/components/check-card",
      name: "CheckCard",
      component: () => import("@/views/demo/components/check-card.vue"),
      meta: {
        title: $t("menus.pureCheckCard"),
        extraIcon: "IF-pure-iconfont-new svg"
      }
    },
    {
      path: "/components/date-picker",
      name: "DatePicker",
      component: () => import("@/views/demo/components/date-picker.vue"),
      meta: {
        title: $t("menus.pureDatePicker")
      }
    },
    {
      path: "/components/datetime-picker",
      name: "DateTimePicker",
      component: () => import("@/views/demo/components/datetime-picker.vue"),
      meta: {
        title: $t("menus.pureDateTimePicker")
      }
    },
    {
      path: "/components/time-picker",
      name: "TimePicker",
      component: () => import("@/views/demo/components/time-picker.vue"),
      meta: {
        title: $t("menus.pureTimePicker")
      }
    },
    {
      path: "/components/icon-select",
      name: "IconSelect",
      component: () => import("@/views/demo/components/icon-select.vue"),
      meta: {
        title: $t("menus.pureIconSelect")
      }
    },
    {
      path: "/components/animatecss",
      name: "AnimateCss",
      component: () => import("@/views/demo/components/animatecss.vue"),
      meta: {
        title: $t("menus.pureAnimatecss")
      }
    },
    {
      path: "/components/cropping",
      name: "Cropping",
      component: () => import("@/views/demo/components/cropping/index.vue"),
      meta: {
        title: $t("menus.pureCropping")
      }
    },
    {
      path: "/components/segmented",
      name: "Segmented",
      component: () => import("@/views/demo/components/segmented.vue"),
      meta: {
        title: $t("menus.pureSegmented")
      }
    },
    {
      path: "/components/text",
      name: "PureText",
      component: () => import("@/views/demo/components/text.vue"),
      meta: {
        title: $t("menus.pureText"),
        extraIcon: "IF-pure-iconfont-new svg"
      }
    },
    {
      path: "/components/el-button",
      name: "PureButton",
      component: () => import("@/views/demo/components/el-button.vue"),
      meta: {
        title: $t("menus.pureElButton")
      }
    },
    {
      path: "/components/check-button",
      name: "CheckButton",
      component: () => import("@/views/demo/components/check-button.vue"),
      meta: {
        title: $t("menus.pureCheckButton"),
        extraIcon: "IF-pure-iconfont-new svg"
      }
    },
    {
      path: "/components/button",
      name: "ButtonPage",
      component: () => import("@/views/demo/components/button.vue"),
      meta: {
        title: $t("menus.pureButton")
      }
    },
    {
      path: "/components/progress",
      name: "PureProgress",
      component: () => import("@/views/demo/components/progress.vue"),
      meta: {
        title: $t("menus.pureProgress")
      }
    },
    {
      path: "/components/tag",
      name: "PureTag",
      component: () => import("@/views/demo/components/tag.vue"),
      meta: {
        title: $t("menus.pureTag")
      }
    },
    {
      path: "/components/statistic",
      name: "Statistic",
      component: () => import("@/views/demo/components/statistic.vue"),
      meta: {
        title: $t("menus.pureStatistic")
      }
    },
    {
      path: "/components/collapse",
      name: "Collapse",
      component: () => import("@/views/demo/components/collapse.vue"),
      meta: {
        title: $t("menus.pureCollapse")
      }
    },
    {
      path: "/components/cascader",
      name: "Cascader",
      component: () => import("@/views/demo/components/cascader.vue"),
      meta: {
        title: $t("menus.pureCascader")
      }
    },
    {
      path: "/components/color-picker",
      name: "ColorPicker",
      component: () => import("@/views/demo/components/color-picker.vue"),
      meta: {
        title: $t("menus.pureColorPicker")
      }
    },
    {
      path: "/components/selector",
      name: "Selector",
      component: () => import("@/views/demo/components/selector.vue"),
      meta: {
        title: $t("menus.pureSelector")
      }
    },
    {
      path: "/components/waterfall",
      name: "Waterfall",
      component: () => import("@/views/demo/components/waterfall/index.vue"),
      meta: {
        title: $t("menus.pureWaterfall")
      }
    },
    {
      path: "/components/split-pane",
      name: "SplitPane",
      component: () => import("@/views/demo/components/split-pane.vue"),
      meta: {
        title: $t("menus.pureSplitPane")
      }
    },
    {
      path: "/components/swiper",
      name: "Swiper",
      component: () => import("@/views/demo/components/swiper.vue"),
      meta: {
        title: $t("menus.pureSwiper")
      }
    },
    {
      path: "/components/timeline",
      name: "TimeLine",
      component: () => import("@/views/demo/components/timeline.vue"),
      meta: {
        title: $t("menus.pureTimeline")
      }
    },
    {
      path: "/components/count-to",
      name: "CountTo",
      component: () => import("@/views/demo/components/count-to.vue"),
      meta: {
        title: $t("menus.pureCountTo")
      }
    },
    {
      path: "/components/contextmenu",
      name: "ContextMenu",
      component: () => import("@/views/demo/components/contextmenu/index.vue"),
      meta: {
        title: $t("menus.pureContextmenu")
      }
    },
    {
      path: "/components/json-editor",
      name: "JsonEditor",
      component: () => import("@/views/demo/components/json-editor.vue"),
      meta: {
        title: $t("menus.pureJsonEditor")
      }
    },
    {
      path: "/components/seamless-scroll",
      name: "SeamlessScroll",
      component: () => import("@/views/demo/components/seamless-scroll.vue"),
      meta: {
        title: $t("menus.pureSeamless")
      }
    },
    {
      path: "/components/virtual-list",
      name: "VirtualList",
      component: () => import("@/views/demo/components/virtual-list/index.vue"),
      meta: {
        title: $t("menus.pureVirtualList")
      }
    }
  ]
} satisfies RouteConfigsTable;
