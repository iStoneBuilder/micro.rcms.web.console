import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "./types";

export const getAccountPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/account/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};
export const createAccount = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/account/records",
    {
      data
    }
  );
};
