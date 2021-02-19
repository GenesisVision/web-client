import { GetServerSidePropsContext, NextPageContext } from "next";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import { NextPageWithReduxContext } from "utils/types";

export interface CookieProvider {
  getCookie: (
    name: string,
    ctx?: NextPageContext | GetServerSidePropsContext
  ) => string | undefined;
  setCookie: (name: string, value: string) => void;
  removeCookie: (name: string) => void;
}

type CookieServiceCreatorArgsType<T> = {
  cookieProvider?: CookieProvider;
  ctx?: NextPageWithReduxContext | NextPageContext | GetServerSidePropsContext;
  parse?: boolean;
  key: string;
  initialState?: T;
};

export const CookieServiceDefaultEmptyState = "";
export const CookieServiceDefaultEmptyParseState = {};

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
  initialState = (parse
    ? CookieServiceDefaultEmptyParseState
    : (CookieServiceDefaultEmptyState as unknown)) as T
}: CookieServiceCreatorArgsType<T>) => {
  const get = (
    funcCtx?:
      | NextPageWithReduxContext
      | NextPageContext
      | GetServerSidePropsContext
  ): T => {
    const cookieValue = cookieProvider.getCookie(key, ctx || funcCtx);
    if (!cookieValue) return initialState;
    return parse ? JSON.parse(cookieValue) : cookieValue;
  };

  const set = (value: T): void => {
    if (value === null || value === undefined) return;
    const setValue = parse ? JSON.stringify(value) : value;
    cookieProvider.setCookie(key, String(setValue));
  };

  const clear = (): void => {
    const value = parse ? JSON.stringify(initialState) : String(initialState);
    cookieProvider.setCookie(key, value);
  };
  return { get, set, clear };
};
