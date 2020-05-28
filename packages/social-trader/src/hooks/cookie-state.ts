import { NextPageContext } from "next";
import { cookieServiceCreator } from "utils/cookie-service.creator";

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
  return cookieServiceCreator({
    initialState,
    ctx,
    key,
    parse: true
  });
};
