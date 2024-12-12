import { ref } from "vue";
import type { PlusColumn } from "plus-pro-components";
import { getBussList } from "@/api/rcms/fram-common";
import { getTenantId } from "@/utils/common";
import { useDetail } from "@/utils/toDetail";
import { addDrawer, closeDrawer } from "@/components/ReDrawer";
import DetailForm from "../form/detail.vue";
export function terminalManage() {
  const pageInfo = { page: 1, pageSize: 15 };
  const loading = ref(false);
  const selectData = ref([]);
  const { toDetail } = useDetail();
  const tableColumns: PlusColumn[] = [
    {
      label: "设备SN",
      prop: "deviceSn",
      width: 200,
      tableColumnProps: {
        fixed: true
      },
      render(value) {
        return (
          <el-link
            onClick={() => {
              toDetail({ deviceSn: value }, "query", {
                path: "/device/detail",
                name: "DeviceDetail",
                meta: { title: "详情｜设备SN：" + value }
              });
            }}
            type="primary"
          >
            {value}
          </el-link>
        );
      }
    },
    {
      label: "设备类型",
      prop: "deviceType",
      minWidth: 100,
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/mifi/device-type/records",
        "typeName",
        "typeCode",
        {}
      )
    },
    {
      label: "商户",
      prop: "enterpriseId",
      minWidth: 300,
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/base/enterprise/records",
        "name",
        "id",
        { id: getTenantId() }
      )
    },
    {
      label: "入库批次",
      prop: "batchNo",
      minWidth: 100
    }
  ];
  const divideColumns: PlusColumn[] = [
    {
      label: "分发批次号",
      prop: "divideId",
      width: 160,
      tableColumnProps: {
        fixed: true
      },
      render: (value, { row }) => {
        return (
          <el-link
            style="color: var(--el-color-primary)"
            onClick={() => {
              addDrawer({
                title: "分发详情",
                size: "50%",
                class: "rcms-drawer",
                contentRenderer: ({}) => (
                  <DetailForm currentRow={row} tableColumns={divideColumns} />
                ),
                footerButtons: [
                  {
                    label: "关闭",
                    size: "default",
                    type: "primary",
                    plain: true,
                    btnClick: ({ drawer: { options, index } }) => {
                      closeDrawer(options, index);
                    }
                  }
                ]
              });
            }}
          >
            {value}
          </el-link>
        );
      }
    },
    {
      label: "处理数量",
      prop: "divideNum",
      width: 100,
      hideInSearch: true
    },
    {
      label: "原商户",
      prop: "orgMch",
      minWidth: 200,
      hideInSearch: true,
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/base/enterprise/records",
        "name",
        "id",
        { id: getTenantId() }
      )
    },
    {
      label: "目标商户",
      prop: "targetMch",
      minWidth: 200,
      hideInSearch: true,
      valueType: "select",
      options: getBussList(
        "/test/services/rcms/base/enterprise/records",
        "name",
        "id",
        { id: getTenantId() }
      )
    },
    {
      label: "已分发-设备SN",
      prop: "deviceSns",
      minWidth: 200,
      hideInSearch: true,
      hideInTable: true
    },
    {
      label: "分发结果",
      prop: "divideStatus",
      width: 100,
      hideInSearch: true
    },
    {
      label: "操作者",
      prop: "divideUser",
      width: 200
    },
    {
      label: "操作时间",
      prop: "divideTime",
      width: 160,
      hideInSearch: true,
      valueType: "date-picker"
    }
  ];
  return {
    pageInfo,
    loading,
    tableColumns,
    divideColumns,
    selectData
  };
}
