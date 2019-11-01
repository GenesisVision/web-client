// @ts-ignore
import cookie from "js-cookie";

export const getCookie = (cookieName: string): string | undefined => {
  const name = encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, "\\$&");
  const regExp = new RegExp(
    `(?:(?:^|.*;)\\s*${name}\\s*\\=\\s*([^;]*).*$)|^.*$`
  );
  const cookie = document.cookie.replace(regExp, "$1");
  return decodeURIComponent(cookie) || undefined;
};

export const setCookie = (name: string, value: string) => {
  cookie.set(name, value, {
    expires: 1000
  });
};
