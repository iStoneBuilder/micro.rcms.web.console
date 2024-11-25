import { http } from "@/utils/http";
import type { ResultPage } from "../types";

export const getItemList = async (classifyCode: string) => {
  const { data } = await http.request<ResultPage>(
    "get",
    `/test/services/rcms/base/classify/item/records/${classifyCode}/zh-CN`
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
  (data as unknown as Array<any>).forEach(item => {
    itemOptions.push({
      label: item[name],
      value: item[value]
    });
  });
  return itemOptions;
};
