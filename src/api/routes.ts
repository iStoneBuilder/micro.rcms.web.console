import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};
// return http.request<Result>("get", "/get-async-routes");
export const getAsyncRoutes = () => {
  return http.request<Result>("get", "/test/services/api/admin/home");
};
