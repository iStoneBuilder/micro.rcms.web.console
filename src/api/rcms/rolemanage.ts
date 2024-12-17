import { http } from "@/utils/http";
import type { ResultArray, ResultData } from "../types";

export const getRoleList = (params?: object) => {
  return http.request<ResultArray>(
    "get",
    "/test/services/api/base/role/records",
    {
      params
    }
  );
};
export const createRole = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/api/base/role/records",
    {
      data
    }
  );
};
export const updateRole = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/api/base/role/records/${id}`,
    {
      data
    }
  );
};
export const deleteRole = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/api/base/role/records/${id}`
  );
};

export const getEnterpriseRoleList = (params?: object) => {
  return http.request<ResultArray>(
    "get",
    "/test/services/api/base/role/records/list",
    {
      params
    }
  );
};
export const getRolePermissionList = (roleId?: string) => {
  return http.request<ResultArray>(
    "get",
    `/test/services/api/base/role/records/${roleId}/permissions`
  );
};
export const authorizeRolePerm = (roleId: string, data?: Array<any>) => {
  return http.request<ResultData>(
    "post",
    `/test/services/api/base/role/records/${roleId}/permissions`,
    {
      data
    }
  );
};
export const getRoleMenuList = (roleId?: string) => {
  return http.request<ResultArray>(
    "get",
    `/test/services/api/base/role/records/${roleId}/menus`
  );
};
export const authorizeRoleMenuPerm = (roleId: string, data?: Array<any>) => {
  return http.request<ResultData>(
    "post",
    `/test/services/api/base/role/records/${roleId}/menus`,
    {
      data
    }
  );
};
