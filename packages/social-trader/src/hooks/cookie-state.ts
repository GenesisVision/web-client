import { NextPageContext } from "next";
import { getCookie, setCookie } from "utils/cookie";

const defaultEmptyCookie = "";

export type UseCookieStateInputType<T> = {
  ctx?: NextPageContext;
  key: string;
  initialState: T;
};
export type UseCookieStateOutputType<T> = {
  set: (state: T) => void;
  get: () => T;
  clear: VoidFunction;
};

export const useCookieState = <T>({
  initialState,
  ctx,
  key
}: UseCookieStateInputType<T>): UseCookieStateOutputType<T> => {
  const clear = () => {
    setCookie(key, JSON.stringify(initialState) || defaultEmptyCookie);
  };

  const set = (state: T) => {
    const JSONState = JSON.stringify(state);
    setCookie(key, JSONState);
  };

  const get = (): T => {
    const JSONState = getCookie(key, ctx);
    return JSONState ? JSON.parse(JSONState) : initialState;
  };
  return { clear, set, get };
};
