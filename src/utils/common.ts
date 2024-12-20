import Cookies from "js-cookie";
import { getUserInfo, getToken } from "@/utils/auth";
import { message } from "@/utils/message";
import { reLogin } from "./login";
import { useUserStoreHook } from "@/store/modules/user";

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

function checkExpiredTime() {
  const data = getToken();
  if (data) {
    const now = new Date().getTime();
    const expired = now - parseInt(data.expires);
    return expired > 5000000;
  }
  return true;
}

export function handleRequestError(code: number, data: Object, uri: string) {
  // 刷新登录也无法实现则重新登录
  if (code === 401) {
    if (uri.endsWith("user/refresh/login")) {
      message("登录信息失效，请重新登录", {
        duration: 3000,
        customClass: "el",
        type: "warning"
      });
      if (checkExpiredTime()) {
        useUserStoreHook().logOut();
      } else {
        reLogin();
      }
    }
    if (JSON.stringify(data).concat("This subject is anonymous")) {
      useUserStoreHook().logOut();
    }
  } else {
    const errorMessage: string =
      ((data as HttpError)?.data?.message || "服务异常，请稍后重试！") +
      " (" +
      code +
      ")";
    message(errorMessage, {
      duration: 3000,
      customClass: "el",
      type: "warning"
    });
  }
}

export function findSelected(options, id) {
  for (let option of options) {
    if (option.id === id) {
      return option;
    }
    if (option.children) {
      const selectedChild = findSelected(option.children, id);
      if (selectedChild) {
        return selectedChild;
      }
    }
  }
  return null;
}

export function getEnterpriseId() {
  const userInfo = getUserInfo();
  return userInfo?.extraInfo?.id ?? "000000000000";
}

export function getTenantId() {
  const userInfo = getUserInfo();
  return userInfo?.extraInfo?.tenantId ?? "000000000000";
}
export function getEType() {
  const userInfo = getUserInfo();
  return userInfo?.extraInfo?.type ?? "enterprise";
}
