import { http } from "@/utils/http";
import type { ResultPage, ResultData } from "../types";

export const getSimPageList = (
  curPage: number,
  pageSize: number,
  params?: object
) => {
  return http.request<ResultPage>(
    "get",
    `/test/services/api/mifi/sim/records/page/${curPage}/${pageSize}`,
    {
      params
    }
  );
};

export const importSim = (data?: Array<any>) => {
  return http.request<ResultData>(
    "post",
    "/test/services/api/mifi/sim/records",
    {
      data
    }
  );
};

export const updateSim = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/api/mifi/sim/records/${id}`,
    {
      data
    }
  );
};
export const deleteSim = (id?: string) => {
  return http.request<ResultData>(
    "delete",
    `/test/services/api/mifi/sim/records/${id}`
  );
};

export const checkSimDp = (iccid: string, data: any) => {
  return http.request<ResultData>(
    "put",
    `/test/services/api/mifi/sim/records/${iccid}/sync-dp`,
    {
      data
    }
  );
};
export const getSimDetail = (iccid: string, params?: any) => {
  return http.request<ResultData>(
    "get",
    `/test/services/api/mifi/sim/records/${iccid}`,
    { params }
  );
};
