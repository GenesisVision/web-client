import { NextPageContext } from "next";
import { getCookie, setCookie } from "utils/cookie";
import { NextPageWithReduxContext } from "utils/types";

type CookieServiceCreatorArgsType<T> = {
  ctx?: NextPageWithReduxContext | NextPageContext;
  parse?: boolean;
  key: string;
  initialState?: T;
};

const defaultEmptyState = "";
const emptyParseState = JSON.stringify({});

export const cookieServiceCreator = <T = string>({
  ctx,
  parse,
  key,
  initialState = (defaultEmptyState as unknown) as T
}: CookieServiceCreatorArgsType<T>) => {
  const get = (funcCtx?: NextPageWithReduxContext | NextPageContext): T => {
    const cookieValue = getCookie(key, ctx || funcCtx);
    return parse
      ? JSON.parse(cookieValue || emptyParseState)
      : cookieValue || initialState;
  };

  const set = (value: T): void => {
    const setValue = parse ? JSON.stringify(value) : value;
    setCookie(key, String(setValue));
  };

  const clear = (): void => {
    const setValue = parse ? JSON.stringify(emptyParseState) : initialState;
    setCookie(key, String(setValue) || defaultEmptyState);
  };
  return { get, set, clear };
};
