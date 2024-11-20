import { http } from "@/utils/http";
import type { ResultPage } from "./types";

export const getItemList = (classifyCode: string) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/base/classify/item/records/${classifyCode}/zh_cn`
  );
};
