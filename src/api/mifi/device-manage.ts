import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getPageRecordList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/mifi/device-manage/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const importRecords = (data?: Array<any>) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/mifi/device-manage/records",
    {
      data
    }
  );
};

export const updateRecord = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/mifi/device-manage/records/${id}`,
    {
      data
    }
  );
};
export const updateRecordGroup = (data?: Array<any>) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/mifi/device-manage/records/group`,
    {
      data
    }
  );
};
export const deleteRecord = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/mifi/device-manage/records/${id}`
  );
};
