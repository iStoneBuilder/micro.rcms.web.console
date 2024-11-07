import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getEnterpriseList = (data?: object) => {
  return http.request<Result>(
    "get",
    "/test/services/rcms/enterprise/records?id=100000000000",
    {
      data
    }
  );
};
