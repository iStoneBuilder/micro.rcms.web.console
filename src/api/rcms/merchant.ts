import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getMerchantPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/mifi/merchant/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createMerchant = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/mifi/merchant/records",
    {
      data
    }
  );
};

export const updateMerchant = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/mifi/merchant/records/${id}`,
    {
      data
    }
  );
};
export const deleteMerchant = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/mifi/merchant/records/${id}`
  );
};
export const getMerchantCarrierList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/mifi/merchant/carrier/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createMerchantCarrier = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/mifi/merchant/carrier/records",
    {
      data
    }
  );
};

export const updateMerchantCarrier = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/mifi/merchant/carrier/records/${id}`,
    {
      data
    }
  );
};
export const deleteMerchantCarrier = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/mifi/merchant/carrier/records/${id}`
  );
};
