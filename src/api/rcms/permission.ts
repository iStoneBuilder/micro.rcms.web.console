import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getPermissionPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/base/permission/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};
export const refreshPerm = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/base/permission/records/refresh",
    {
      data
    }
  );
};
export const authorizeAppPerm = (appId: string, data?: Array<any>) => {
  return http.request<ResultData>(
    "post",
    `/test/services/rcms/base/permission/records/authorize/${appId}`,
    {
      data
    }
  );
};
