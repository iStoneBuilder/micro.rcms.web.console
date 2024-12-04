import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getPageRecordList = (
  service: string,
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/mifi/${service}/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createRecord = (service: string, data?: object) => {
  return http.request<ResultData>(
    "post",
    `/test/services/rcms/mifi/${service}/records`,
    {
      data
    }
  );
};

export const updateRecord = (service: string, id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/mifi/${service}/records/${id}`,
    {
      data
    }
  );
};
export const deleteRecord = (service: string, id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/mifi/${service}/records/${id}`
  );
};
