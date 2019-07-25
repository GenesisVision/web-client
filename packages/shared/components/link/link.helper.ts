import * as uuid from "uuid";

import { ToType } from "./link";

export const pushState = (state: any) => {
  window.history.pushState(state, uuid.v4());
};

export const normalizeTo = (to: ToType | string): ToType => {
  return typeof to === "string" ? { pathname: to } : to;
};
