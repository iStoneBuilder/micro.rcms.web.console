import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getAccountPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/api/base/account/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};
export const createAccount = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/api/base/account/records",
    {
      data
    }
  );
};
export const updateAccount = (code: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/api/base/account/records/${code}`,
    {
      data
    }
  );
};
export const deleteAccount = (code?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/api/base/role/records/${code}`
  );
};
