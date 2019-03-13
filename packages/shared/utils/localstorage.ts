import { Nullable } from "./types";

export const loadData = (
  key: string
): Nullable<{ [keys: string]: any } | string> => {
  try {
    const serializedSettings = localStorage.getItem(key);
    return JSON.parse(serializedSettings || "");
  } catch (e) {
    return null;
  }
};

export const saveData = (
  key: string,
  value: object | string | number
): void => {
  try {
    const serializedSettings = JSON.stringify(value);
    localStorage.setItem(key, serializedSettings);
  } catch (e) {}
};
