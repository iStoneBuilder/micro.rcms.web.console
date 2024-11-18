import { http } from "@/utils/http";
import type { ResultPage } from "./types";

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
