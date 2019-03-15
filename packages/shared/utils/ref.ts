import { getCookie } from "./cookie";
import { loadData } from "./localstorage";

type RefType = {
  value: string;
};

export const getRef = (): string | undefined => {
  const ref = loadData<RefType>("ref");
  if (ref && ref.value) {
    return ref.value;
  }
  return getCookie("ref");
};
