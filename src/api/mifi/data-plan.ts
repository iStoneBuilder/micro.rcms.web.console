import { http } from "@/utils/http";
import type { ResultData } from "../types";

export const updateRecordSell = (id: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/rcms/mifi/data-plan/records/${id}/sell`,
    {
      data
    }
  );
};
