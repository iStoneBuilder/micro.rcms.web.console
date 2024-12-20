import { http } from "@/utils/http";
import type { ResultArray, ResultData } from "../types";

export const getEnterpriseList = (params?: object) => {
  return http.request<ResultArray>(
    "get",
    "/test/services/api/base/enterprise/records",
    {
      params
    }
  );
};
export const createEnterprise = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/api/base/enterprise/records",
    {
      data
    }
  );
};
export const deleteEnterprise = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/api/base/enterprise/records/${id}`
  );
};
export const updateEnterprise = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/api/base/enterprise/records/${id}`,
    {
      data
    }
  );
};

export const getEnterpriseListByPid = (params?: object) => {
  return http.request<ResultArray>(
    "get",
    "/test/services/api/base/enterprise/records/list",
    {
      params
    }
  );
};
