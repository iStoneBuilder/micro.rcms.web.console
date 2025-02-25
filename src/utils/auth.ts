import Cookies from "js-cookie";
import { h } from "vue";
import { ElButton } from "element-plus";
import { useUserStoreHook } from "@/store/modules/user";
import { storageLocal, isString, isIncludeAllChildren } from "@pureadmin/utils";

export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 头像 */
  avatar?: string;
  /** 用户名 */
  username?: string;
  /** 昵称 */
  nickname?: string;
  /** 当前登录用户的角色 */
  roles?: Array<string>;
  /** 当前登录用户的按钮级别权限 */
  permissions?: Array<string>;
  /** 账户企业信息 */
  extraInfo?: {
    tenantId: string;
    id: string;
    code: string;
    name: string;
    type: string;
  };
}

export const userKey = "user-info";
export const TokenKey = "authorized-token";
/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const multipleTabsKey = "multiple-tabs";

/** 获取`token` */
export function getToken(): DataInfo<number> {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageLocal().getItem(userKey);
}

export function getUserInfo(): DataInfo<number> {
  return Cookies.get(userKey)
    ? JSON.parse(Cookies.get(userKey))
    : storageLocal().getItem(userKey);
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`、`refreshToken`这三条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`avatar`、`username`、`nickname`、`roles`、`permissions`、`refreshToken`、`expires`这七条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */
export function setToken(data: DataInfo<Date>) {
  let expires = 0;
  const { accessToken, refreshToken } = data;
  const { isRemembered, loginDay } = useUserStoreHook();
  // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，
  // 然后把上面的DataInfo < Date > 改成DataInfo < number > 即可
  expires = new Date(data.expires).getTime();
  const cookieString = JSON.stringify({ accessToken, expires, refreshToken });

  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: (expires - Date.now()) / 86400000
      })
    : Cookies.set(TokenKey, cookieString);

  Cookies.set(
    multipleTabsKey,
    "true",
    isRemembered
      ? {
          expires: loginDay
        }
      : {}
  );

  function setUserKey({
    avatar,
    username,
    nickname,
    roles,
    permissions,
    extraInfo
  }) {
    useUserStoreHook().SET_AVATAR(avatar);
    useUserStoreHook().SET_USERNAME(username);
    useUserStoreHook().SET_NICKNAME(nickname);
    useUserStoreHook().SET_ROLES(roles);
    useUserStoreHook().SET_PERMS(permissions);
    useUserStoreHook().SET_EXTRA(extraInfo);
    storageLocal().setItem(userKey, {
      refreshToken,
      expires,
      avatar,
      username,
      nickname,
      roles,
      permissions,
      extraInfo
    });
  }

  if (data.username && data.roles && data.extraInfo) {
    const { username, roles, extraInfo } = data;
    setUserKey({
      avatar: data?.avatar ?? "",
      username,
      nickname: data?.nickname ?? "",
      roles,
      permissions: data?.permissions ?? [],
      extraInfo: extraInfo
    });
  } else {
    const avatar =
      storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "";
    const username =
      storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "";
    const nickname =
      storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "";
    const roles =
      storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [];
    const permissions =
      storageLocal().getItem<DataInfo<number>>(userKey)?.permissions ?? [];
    const extraInfo =
      storageLocal().getItem<DataInfo<number>>(userKey)?.extraInfo ?? {};
    setUserKey({
      avatar,
      username,
      nickname,
      roles,
      permissions,
      extraInfo
    });
  }
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken() {
  Cookies.remove(TokenKey);
  Cookies.remove(multipleTabsKey);
  storageLocal().removeItem(userKey);
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return token;
};

/** 是否有按钮级别的权限（根据登录接口返回的`permissions`字段进行判断）*/
export const hasPerms = (value: string | Array<string>): boolean => {
  if (!value) return false;
  const allPerms = "*:*:*";
  const { permissions } = useUserStoreHook();
  if (!permissions) return false;
  if (permissions.length === 1 && permissions[0] === allPerms) return true;
  const isAuths = isString(value)
    ? permissions.includes(value)
    : isIncludeAllChildren(value, permissions);
  return isAuths ? true : false;
};
/** 先判断操作权限，再判断数据权限 */
export const hasDataPerms = (
  value: string | Array<string>,
  level?: string
): boolean => {
  // 没有配置不需要判断操作权限
  if (!value) return true;
  // 不需要数据权限判断，直接判断操作权限
  if (!level) {
    return hasPerms(value);
  } else {
    if (hasPerms(value)) {
      // tenantId,enterpriseId,person: 租户级，商户级，创建者级
      const userInfo = getUserInfo();
      const tenantId = userInfo.extraInfo.tenantId;
      const enterpriseId = userInfo.extraInfo.id;
      const username = userInfo.username;
      if (level.startsWith("t:")) {
        return level === "t:" + tenantId;
      }
      if (level.startsWith("m:")) {
        return level === "m:" + enterpriseId;
      }
      if (level.startsWith("c:")) {
        return level === "c:" + username;
      }
    }
  }
  return false;
};

export type btn = {
  name: string;
  type: any;
  perm: string;
  icon: object;
};
export type renderBtns = Array<btn>;

export const renderPermBtn = (
  buttons: renderBtns,
  handleClickButton: Function,
  value: PointerEvent,
  index: number,
  row: any
) => {
  const CustomButton = buttons.map(item => {
    if (item.perm === null || item.perm === "" || hasPerms(item.perm)) {
      return h(
        ElButton,
        {
          type: item.type,
          plain: true,
          link: true,
          disabled: false,
          icon: item.icon,
          onClick: e => handleClickButton(e, value, index, row, item)
        },
        () => item.name
      );
    }
    return h("", {}, "");
  });
  return CustomButton;
};
