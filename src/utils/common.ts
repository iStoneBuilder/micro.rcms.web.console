import Cookies from "js-cookie";

import { message } from "@/utils/message";
import { reLogin } from "./login";

export function setCookieByKey(key: string, value: string) {
  Cookies.set(key, value);
}
export function getCookieByKey(key: string) {
  return Cookies.get(key) ? Cookies.get(key) : "N-cookie";
}

export interface ErrorData {
  code: number;
  message: string;
  data: Object;
  timestamp: number;
}
export interface HttpError {
  data: ErrorData;
}

export function handleRequestError(code: number, data: Object) {
  // 刷新登录也无法实现则重新登录
  if (code === 401) {
    message("登录信息失效，请重新登录", {
      duration: 3000,
      customClass: "el",
      type: "warning"
    });
    reLogin();
  } else {
    const errorMessage: string =
      (data as HttpError)?.data?.message || "服务异常，请稍后重试！";
    message(errorMessage, {
      duration: 3000,
      customClass: "el",
      type: "warning"
    });
  }
}
