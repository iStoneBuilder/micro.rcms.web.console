import { http } from "@/utils/http";
import type { ResultData } from "../types";

export const syncDeviceSimName = (iccid: string, data?: object) => {
  return http.request<ResultData>(
    "put",
    `/test/services/api/mifi/device-name/records/${iccid}/sync`,
    {
      data
    }
  );
};
