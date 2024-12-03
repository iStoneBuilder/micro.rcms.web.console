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
