import { getCookie } from "./cookie";
import { getItem } from "./localstorage";

export const getRef = () => {
  const ref = getItem("ref");
  if (ref) {
    return ref;
  }
  return getCookie("ref");
};
