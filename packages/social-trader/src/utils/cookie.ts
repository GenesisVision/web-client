import cookie from "js-cookie";
import { GetServerSidePropsContext, NextPageContext } from "next";
import nextCookie from "next-cookies";

export const getCookie = (
  name: string,
  ctx?: NextPageContext | GetServerSidePropsContext
): string | undefined => {
  return ctx ? nextCookie(ctx)[name] : cookie.get(name);
};

export const setCookie = (name: string, value: string) => {
  cookie.set(name, value, {
    expires: 1000
  });
};

export const removeCookie = (name: string) => {
  cookie.remove(name);
};
