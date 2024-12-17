import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getCornTaskPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/cron/services/api/quzrtz/task/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createCornTask = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/cron/services/api/quzrtz/task/records",
    {
      data
    }
  );
};
export const updateCornTask = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/cron/services/api/quzrtz/task/records/${id}`,
    {
      data
    }
  );
};
export const deleteCornTask = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/cron/services/api/quzrtz/task/records/${id}`
  );
};

export const opertionCornTask = (op: string, id: string) => {
  return http.request<ResultData>(
    "post",
    `/cron/services/api/quzrtz/task/records/${op}/${id}`
  );
};

export const getCornJobPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/cron/services/api/quzrtz/job/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};
