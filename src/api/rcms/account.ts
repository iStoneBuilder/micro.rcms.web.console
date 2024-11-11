import { http } from "@/utils/http";
import type { ResultArray, ResultData } from "./types";

export const getAccountList = (data?: object) => {
  return http.request<ResultArray>(
    "get",
    "/test/services/rcms/account/records",
    {
      data
    }
  );
};
export const createAccount = (data?: object) => {
  return http.request<ResultData>(
    "post",
    "/test/services/rcms/account/records",
    {
      data
    }
  );
};
