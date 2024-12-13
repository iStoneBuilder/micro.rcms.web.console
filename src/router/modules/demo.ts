import { $t } from "@/plugins/i18n";

export default {
  path: "/about",
  redirect: "/about/index",
  meta: {
    icon: "ep:data-analysis",
    title: "框架示列",
    rank: 1000
  },
  children: [
    {
      path: "/components",
      redirect: "/components/dialog",
      meta: {
        icon: "ep:menu",
        title: $t("menus.pureComponents")
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
          component: () =>
            import("@/views/demo/components/datetime-picker.vue"),
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
          component: () =>
            import("@/views/demo/components/waterfall/index.vue"),
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
          component: () =>
            import("@/views/demo/components/contextmenu/index.vue"),
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
          component: () =>
            import("@/views/demo/components/seamless-scroll.vue"),
          meta: {
            title: $t("menus.pureSeamless")
          }
        },
        {
          path: "/components/virtual-list",
          name: "VirtualList",
          component: () =>
            import("@/views/demo/components/virtual-list/index.vue"),
          meta: {
            title: $t("menus.pureVirtualList")
          }
        }
      ]
    },
    {
      path: "/able",
      redirect: "/able/watermark",
      meta: {
        icon: "ri:ubuntu-fill",
        title: $t("menus.pureAble")
      },
      children: [
        {
          path: "/able/mqtt-client",
          name: "MqttClient",
          component: () => import("@/views/demo/able/mqtt-client.vue"),
          meta: {
            title: $t("menus.pureMqtt"),
            extraIcon: "IF-pure-iconfont-new svg"
          }
        },
        {
          path: "/able/verify",
          name: "Verify",
          component: () => import("@/views/demo/able/verify.vue"),
          meta: {
            title: $t("menus.pureVerify")
          }
        },
        {
          path: "/able/watermark",
          name: "WaterMark",
          component: () => import("@/views/demo/able/watermark.vue"),
          meta: {
            title: $t("menus.pureWatermark")
          }
        },
        {
          path: "/able/print",
          name: "Print",
          component: () => import("@/views/demo/able/print/index.vue"),
          meta: {
            title: $t("menus.purePrint")
          }
        },
        {
          path: "/able/download",
          name: "Download",
          component: () => import("@/views/demo/able/download.vue"),
          meta: {
            title: $t("menus.pureDownload")
          }
        },
        {
          path: "/able/excel",
          name: "Excel",
          component: () => import("@/views/demo/able/excel.vue"),
          meta: {
            title: $t("menus.pureExcel")
          }
        },
        {
          path: "/components/ripple",
          name: "Ripple",
          component: () => import("@/views/demo/able/ripple.vue"),
          meta: {
            title: $t("menus.pureRipple")
          }
        },
        {
          path: "/able/debounce",
          name: "Debounce",
          component: () => import("@/views/demo/able/debounce.vue"),
          meta: {
            title: $t("menus.pureDebounce")
          }
        },
        {
          path: "/able/directives",
          name: "Directives",
          component: () => import("@/views/demo/able/directives.vue"),
          meta: {
            title: $t("menus.pureOptimize")
          }
        },
        {
          path: "/able/draggable",
          name: "Draggable",
          component: () => import("@/views/demo/able/draggable.vue"),
          meta: {
            title: $t("menus.pureDraggable"),
            transition: {
              enterTransition: "animate__zoomIn",
              leaveTransition: "animate__zoomOut"
            }
          }
        },
        {
          path: "/able/pdf",
          name: "Pdf",
          component: () => import("@/views/demo/able/pdf.vue"),
          meta: {
            title: $t("menus.purePdf")
          }
        },
        {
          path: "/able/barcode",
          name: "BarCode",
          component: () => import("@/views/demo/able/barcode.vue"),
          meta: {
            title: $t("menus.pureBarcode")
          }
        },
        {
          path: "/able/qrcode",
          name: "QrCode",
          component: () => import("@/views/demo/able/qrcode.vue"),
          meta: {
            title: $t("menus.pureQrcode")
          }
        },
        {
          path: "/able/map",
          name: "MapPage",
          component: () => import("@/views/demo/able/map.vue"),
          meta: {
            title: $t("menus.pureMap"),
            keepAlive: true,
            transition: {
              name: "fade"
            }
          }
        },
        {
          path: "/able/wavesurfer",
          name: "Wavesurfer",
          component: () => import("@/views/demo/able/wavesurfer/index.vue"),
          meta: {
            title: $t("menus.pureWavesurfer")
          }
        },
        {
          path: "/able/video",
          name: "VideoPage",
          component: () => import("@/views/demo/able/video.vue"),
          meta: {
            title: $t("menus.pureVideo")
          }
        },
        {
          path: "/able/video-frame",
          name: "VideoFrame",
          component: () => import("@/views/demo/able/video-frame/index.vue"),
          meta: {
            title: $t("menus.pureVideoFrame")
          }
        },
        {
          path: "/able/danmaku",
          name: "Danmaku",
          component: () => import("@/views/demo/able/danmaku/index.vue"),
          meta: {
            title: $t("menus.pureDanmaku")
          }
        },
        {
          path: "/able/infinite-scroll",
          name: "InfiniteScroll",
          component: () => import("@/views/demo/able/infinite-scroll.vue"),
          meta: {
            title: $t("menus.pureInfiniteScroll")
          }
        },
        {
          path: "/able/menu-tree",
          name: "MenuTree",
          component: () => import("@/views/demo/able/menu-tree.vue"),
          meta: {
            title: $t("menus.pureMenuTree")
          }
        },
        {
          path: "/able/line-tree",
          name: "LineTree",
          component: () => import("@/views/demo/able/line-tree.vue"),
          meta: {
            title: $t("menus.pureLineTree")
          }
        },
        {
          path: "/able/typeit",
          name: "Typeit",
          component: () => import("@/views/demo/able/typeit.vue"),
          meta: {
            title: $t("menus.pureTypeit")
          }
        },
        {
          path: "/able/sensitive",
          name: "Sensitive",
          component: () => import("@/views/demo/able/sensitive.vue"),
          meta: {
            title: $t("menus.pureSensitive")
          }
        },
        {
          path: "/able/pinyin",
          name: "Pinyin",
          component: () => import("@/views/demo/able/pinyin.vue"),
          meta: {
            title: $t("menus.purePinyin")
          }
        }
      ]
    },
    {
      path: "/table",
      redirect: "/table/index",
      meta: {
        icon: "ri:table-line",
        title: $t("menus.pureTable")
      },
      children: [
        {
          path: "/table/index",
          name: "PureTable",
          component: () => import("@/views/demo/table/index.vue"),
          meta: {
            title: $t("menus.pureTableBase")
          }
        },
        {
          path: "/table/high",
          name: "PureTableHigh",
          component: () => import("@/views/demo/table/high.vue"),
          meta: {
            title: $t("menus.pureTableHigh")
          }
        },
        {
          path: "/table/edit",
          name: "PureTableEdit",
          component: () => import("@/views/demo/table/edit.vue"),
          meta: {
            title: $t("menus.pureTableEdit"),
            extraIcon: "IF-pure-iconfont-new svg"
          }
        },
        {
          path: "/table/virtual",
          name: "VxeTable",
          component: () => import("@/views/demo/table/virtual.vue"),
          meta: {
            title: $t("menus.pureVxeTable"),
            extraIcon: "IF-pure-iconfont-new svg"
          }
        }
      ]
    },
    {
      path: "/about/index",
      name: "About",
      component: () => import("@/views/demo/about/index.vue"),
      meta: {
        title: $t("menus.pureAbout")
      }
    },
    {
      path: "/editor/index",
      name: "Editor",
      component: () => import("@/views/demo/editor/index.vue"),
      meta: {
        title: $t("menus.pureEditor"),
        keepAlive: true
      }
    },
    {
      path: "/error/403",
      name: "403",
      component: () => import("@/views/demo/error/403.vue"),
      meta: {
        title: $t("menus.pureFourZeroOne")
      }
    },
    {
      path: "/error/404",
      name: "404",
      component: () => import("@/views/demo/error/404.vue"),
      meta: {
        title: $t("menus.pureFourZeroFour")
      }
    },
    {
      path: "/error/500",
      name: "500",
      component: () => import("@/views/demo/error/500.vue"),
      meta: {
        title: $t("menus.pureFive")
      }
    },
    {
      path: "/guide/index",
      name: "Guide",
      component: () => import("@/views/demo/guide/index.vue"),
      meta: {
        title: $t("menus.pureGuide")
      }
    },
    {
      path: "/form/index",
      name: "SchemaForm",
      component: () => import("@/views/demo/schema-form/index.vue"),
      meta: {
        title: $t("menus.pureSchemaForm"),
        extraIcon: "IF-pure-iconfont-new svg"
      }
    },
    {
      path: "/list/card",
      name: "CardList",
      component: () => import("@/views/demo/list/card/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: $t("menus.pureCardList"),
        showParent: true
      }
    },
    {
      path: "/menuoverflow/index",
      name: "MenuOverflow",
      component: () => import("@/views/demo/menuoverflow/index.vue"),
      meta: {
        title: $t("menus.pureChildMenuOverflow"),
        showParent: true
      }
    },
    {
      path: "/result/success",
      name: "Success",
      component: () => import("@/views/demo/result/success.vue"),
      meta: {
        title: $t("menus.pureSuccess")
      }
    },
    {
      path: "/result/fail",
      name: "Fail",
      component: () => import("@/views/demo/result/fail.vue"),
      meta: {
        title: $t("menus.pureFail")
      }
    }
  ]
} satisfies RouteConfigsTable;
