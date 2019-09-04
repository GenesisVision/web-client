import * as uuid from "uuid";

import { ROLE_ENV } from "../../constants/constants";
import { ToType } from "./link";

export const pushHistoryState = (to: ToType) => {
  window.history.pushState(
    { options: { from: to.state } },
    uuid.v4(),
    to.as || to.pathname
  );
};

export const normalizeTo = (to: ToType | string): ToType => {
  const role = ROLE_ENV;
  const env = process.env.NODE_ENV;

  if (env === "development") {
    return typeof to === "string" ? { pathname: to } : to;
  }

  return typeof to === "string"
    ? { pathname: `\\${role}${to}` }
    : {
        ...to,
        pathname: `\\${role}${to.pathname}`
      };
};
