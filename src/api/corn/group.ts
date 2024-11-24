import { http } from "@/utils/http";
import type { ResultPage } from "../types";

export const getCornGroupPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/corn/services/rcms/quzrtz/group/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};
