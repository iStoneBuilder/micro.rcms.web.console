import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getCornTaskPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/corn/services/rcms/quzrtz/task/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createCornTask = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/corn/services/rcms/quzrtz/task/records",
    {
      data
    }
  );
};
export const updateCornTask = (code: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/corn/services/rcms/quzrtz/task/records/${code}`,
    {
      data
    }
  );
};
export const deleteCornTask = (code?: string) => {
  return http.request<ResultData>(
    "delete",
    `/corn/services/rcms/quzrtz/task/records/${code}`
  );
};
