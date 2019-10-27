import * as uuid from "uuid";

import { ToType } from "./link";

export const pushHistoryState = (to: ToType) => {
  window.history.pushState(
    { options: { from: to.state }, as: to.as, url: to.pathname },
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
  const role = process.env.REACT_ROOT_ROUTE // TODO remove after union
    ? `/process.env.REACT_ROOT_ROUTE`
    : "";
  return `${role}${url}`;
};
