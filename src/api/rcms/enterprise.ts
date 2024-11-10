import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

type Result2 = {
  success: boolean;
  data: any;
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
export const createEnterprise = (data?: object) => {
  return http.request<Result2>(
    "post",
    "/test/services/rcms/enterprise/records",
    {
      data
    }
  );
};
