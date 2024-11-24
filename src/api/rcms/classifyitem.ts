import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getClassifyPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/base/classify/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createClassify = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/base/classify/records",
    {
      data
    }
  );
};

export const updateClassify = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/base/classify/records/${id}`,
    {
      data
    }
  );
};
export const deleteClassify = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/base/classify/records/${id}`
  );
};
export const getClassifyItemList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/base/classify/item/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createClassifyItem = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/base/classify/item/records",
    {
      data
    }
  );
};

export const updateClassifyItem = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/base/classify/item/records/${id}`,
    {
      data
    }
  );
};
export const deleteClassifyItem = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/base/classify/item/records/${id}`
  );
};
