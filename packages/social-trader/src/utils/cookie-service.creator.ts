import { NextPageContext } from "next";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import { NextPageWithReduxContext } from "utils/types";

interface CookieProvider {
  getCookie: (name: string, ctx?: NextPageContext) => string | undefined;
  setCookie: (name: string, value: string) => void;
  removeCookie: (name: string) => void;
}

type CookieServiceCreatorArgsType<T> = {
  cookieProvider?: CookieProvider;
  ctx?: NextPageWithReduxContext | NextPageContext;
  parse?: boolean;
  key: string;
  initialState?: T;
};

const defaultEmptyState = "";
const emptyParseState = JSON.stringify({});

const defaultCookieProvider: CookieProvider = {
  removeCookie,
  getCookie,
  setCookie
};

export const cookieServiceCreator = <T = string>({
  cookieProvider = defaultCookieProvider,
  ctx,
  parse,
  key,
  initialState = (defaultEmptyState as unknown) as T
}: CookieServiceCreatorArgsType<T>) => {
  const get = (funcCtx?: NextPageWithReduxContext | NextPageContext): T => {
    const cookieValue = cookieProvider.getCookie(key, ctx || funcCtx);
    return parse
      ? JSON.parse(cookieValue || emptyParseState)
      : cookieValue || initialState;
  };

  const set = (value: T): void => {
    const setValue = parse ? JSON.stringify(value) : value;
    cookieProvider.setCookie(key, String(setValue));
  };

  const clear = (): void => {
    const setValue = parse ? JSON.stringify(emptyParseState) : initialState;
    cookieProvider.setCookie(key, String(setValue) || defaultEmptyState);
  };
  return { get, set, clear };
};
