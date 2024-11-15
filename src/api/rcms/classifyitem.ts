import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "./types";

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

export const createClassify = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/classify/records",
    {
      data
    }
  );
};

export const updateClassify = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/classify/records/${id}`,
    {
      data
    }
  );
};
