import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getPageRecordList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/mifi/device-type/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createRecord = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/mifi/device-type/records",
    {
      data
    }
  );
};

export const updateRecord = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/mifi/device-type/records/${id}`,
    {
      data
    }
  );
};
export const deleteRecord = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/mifi/device-type/records/${id}`
  );
};
