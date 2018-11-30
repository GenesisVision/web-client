import { getCookie } from "./cookie";
import { loadData } from "./localstorage";

export const getRef = () => {
  const ref = loadData("ref");
  if (ref) {
    return ref.value;
  }
  return getCookie("ref");
};
