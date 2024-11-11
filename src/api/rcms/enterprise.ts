import { http } from "@/utils/http";
import type { ResultArray, ResultData } from "./types";

export const getEnterpriseList = (params?: object) => {
  return http.request<ResultArray>(
    "get",
    "/test/services/rcms/enterprise/records",
    {
      params
    }
  );
};
export const createEnterprise = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/enterprise/records",
    {
      data
    }
  );
};
