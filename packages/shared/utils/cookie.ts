import cookie from "js-cookie";
import { NextPageContext } from "next";
import nextCookie from "next-cookies";

export const getCookie = (
  name: string,
  ctx?: NextPageContext
): string | undefined => {
  return ctx ? nextCookie(ctx)[name] : cookie.get(name);
};

export const setCookie = (name: string, value: string) => {
  cookie.set(name, value, {
    secure: process.env.NODE_ENV === "production",
    expires: 1000
  });
};

export const removeCookie = (name: string) => {
  cookie.remove(name);
};
