import { http } from "@/utils/http";
import type { ResultArray, ResultData } from "../types";

export const getRoleList = (params?: object) => {
  return http.request<ResultArray>(
    "get",
    "/test/services/rcms/base/role/records",
    {
      params
    }
  );
};
export const createRole = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/base/role/records",
    {
      data
    }
  );
};
export const updateRole = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/base/role/records/${id}`,
    {
      data
    }
  );
};
export const deleteRole = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/base/role/records/${id}`
  );
};

export const getEnterpriseRoleList = (params?: object) => {
  return http.request<ResultArray>(
    "get",
    "/test/services/rcms/base/role/records/list",
    {
      params
    }
  );
};
export const getRolePermissionList = (roleId?: string) => {
  return http.request<ResultArray>(
    "get",
    `/test/services/rcms/base/role/records/${roleId}/permissions`
  );
};
export const authorizeRolePerm = (roleId: string, data?: Array<any>) => {
  return http.request<ResultData>(
    "post",
    `/test/services/rcms/base/role/records/${roleId}/authorize`,
    {
      data
    }
  );
};
