import { http } from "@/utils/http";
import type { ResultArray, ResultData } from "../types";

export const getMenuList = (params?: object) => {
  return http.request<ResultArray>(
    "get",
    "/test/services/api/base/menu/records",
    {
      params
    }
  );
};

export const createMenu = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/api/base/menu/records",
    {
      data
    }
  );
};
export const deleteMenu = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/api/base/menu/records/${id}`
  );
};
export const updateMenu = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/api/base/menu/records/${id}`,
    {
      data
    }
  );
};
