import { getCookie } from "./cookie";

export const getRef = (): string | undefined => {
  return getCookie("ref");
};
