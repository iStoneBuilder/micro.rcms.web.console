import { http } from "@/utils/http";
import type { ResultPage } from "./types";

export const getClassifyPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/classify/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};
