import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getCornGroupPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/cron/services/api/quzrtz/group/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createCronGroup = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/cron/services/api/quzrtz/group/records",
    {
      data
    }
  );
};
export const updateCronGroup = (code: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/cron/services/api/quzrtz/group/records/${code}`,
    {
      data
    }
  );
};
export const deleteCronGroup = (code?: string) => {
  return http.request<ResultData>(
    "delete",
    `/cron/services/api/quzrtz/group/records/${code}`
  );
};
