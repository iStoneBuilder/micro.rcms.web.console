import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getPageRecordList = (
  service: string,
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/api/${service}/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createRecord = (service: string, data?: object) => {
  return http.request<ResultData>(
    "post",
    `/test/services/api/${service}/records`,
    {
      data
    }
  );
};

export const updateRecord = (service: string, id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/api/${service}/records/${id}`,
    {
      data
    }
  );
};
export const deleteRecord = (service: string, id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/api/${service}/records/${id}`
  );
};
export const getRecord = (service: string, id?: string) => {
  return http.request<ResultData>(
    "get",
    `/test/services/api/${service}/records/${id}`
  );
};

export const getItemList = async (classifyCode: string) => {
  const { data } = await http.request<ResultPage>(
    "get",
    `/test/services/api/base/classify/item/records/${classifyCode}/zh-CN`
  );
  const itemOptions = [];
  (data as unknown as Array<any>).forEach(item => {
    itemOptions.push({
      label: item.itemName,
      value: item.itemCode
    });
  });
  return itemOptions;
};

export const getBussList = async (
  url: string,
  name: string,
  value: string,
  params?: object
) => {
  const { data } = await http.request<ResultPage>("get", url, { params });
  const itemOptions = [];
  const names = name.split(",");
  (data as unknown as Array<any>).forEach(item => {
    itemOptions.push({
      label:
        names.length > 1
          ? item[names[0]] + " (" + item[names[1]] + ")"
          : item[name],
      value: item[value]
    });
  });
  return itemOptions;
};
