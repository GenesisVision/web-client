import { REF_PARAM_NAME } from "constants/constants";

import { getCookie, setCookie } from "./cookie";

export const getRef = (): string | undefined => {
  return getCookie(REF_PARAM_NAME);
};

export const setRef = (value: string) => {
  return setCookie(REF_PARAM_NAME, value);
};
