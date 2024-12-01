import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getTerminalPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/rcms/mifi/sim/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const importTerminal = (data?: Array<any>) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/mifi/sim/records",
    {
      data
    }
  );
};

export const updateTerminal = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/mifi/sim/records/${id}`,
    {
      data
    }
  );
};
export const deleteTerminal = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/rcms/mifi/sim/records/${id}`
  );
};
