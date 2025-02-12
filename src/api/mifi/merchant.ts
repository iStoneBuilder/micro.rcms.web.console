import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getMerchantPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/api/mifi-sim/merchant/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createMerchant = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/api/mifi-sim/merchant/records",
    {
      data
    }
  );
};

export const updateMerchant = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/api/mifi-sim/merchant/records/${id}`,
    {
      data
    }
  );
};
export const deleteMerchant = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/api/mifi-sim/merchant/records/${id}`
  );
};
export const getMerchantCarrierList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/api/mifi-sim/merchant/carrier/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const createMerchantCarrier = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/api/mifi-sim/merchant/carrier/records",
    {
      data
    }
  );
};

export const updateMerchantCarrier = (
  merCode: string,
  id: string,
  data?: object
) => {
  return http.request<ResultData>(
    "put",
    `/test/services/api/mifi-sim/merchant/carrier/records/${merCode}/${id}`,
    {
      data
    }
  );
};
export const deleteMerchantCarrier = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/api/mifi-sim/merchant/carrier/records/${id}`
  );
};
