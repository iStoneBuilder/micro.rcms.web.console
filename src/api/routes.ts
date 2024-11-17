import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};
export const getAsyncRoutes = () => {
  return http.request<Result>("get", "/get-async-routes");
};
// export const getAsyncRoutes = () => {
//   return http.request<Result>(
//     "get",
//     "/test/services/rcms/menu/records/tree/router"
//   );
// };
