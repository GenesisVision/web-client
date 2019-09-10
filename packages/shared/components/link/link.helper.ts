import * as uuid from "uuid";

import { ToType } from "./link";

export const pushHistoryState = (to: ToType) => {
  window.history.pushState(
    { options: { from: to.state } },
    uuid.v4(),
    to.as || to.pathname
  );
};

export const normalizeTo = (to: ToType | string): ToType => {
  return typeof to === "string"
    ? { pathname: normalizeUrlString(to) }
    : {
        ...to,
        as: to.as && normalizeUrlString(to.as),
        pathname: normalizeUrlString(to.pathname)
      };
};

export const normalizeUrlString = (url: string): string => {
  const role = process.env.REACT_APP_BASENAME;
  const env = process.env.NODE_ENV;

  if (env !== "production") {
    return url;
  }
  return `/${role}${url}`;
};
