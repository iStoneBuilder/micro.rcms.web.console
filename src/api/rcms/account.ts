import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getAccountPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/base/account/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};
export const createAccount = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/base/account/records",
    {
      data
    }
  );
};
export const updateAccount = (code: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/base/account/records/${code}`,
    {
      data
    }
  );
};
export const deleteAccount = (code?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/base/role/records/${code}`
  );
};
