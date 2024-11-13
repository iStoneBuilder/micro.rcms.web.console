import { http } from "@/utils/http";
import type { ResultArray, ResultData } from "./types";

export const getRoleList = (params?: object) => {
  return http.request<ResultArray>("get", "/test/services/rcms/role/records", {
    params
  });
};
export const createRole = (data?: object) => {
  return http.request<ResultData>("post", "/test/services/rcms/role/records", {
    data
  });
};
export const updateRole = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/role/records/${id}`,
    {
      data
    }
  );
};
export const deleteRole = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/role/records/${id}`
  );
};

export const getEnterpriseRoleList = (params?: object) => {
  return http.request<ResultArray>(
    "get",
    "/test/services/rcms/role/records/list",
    {
      params
    }
  );
};
