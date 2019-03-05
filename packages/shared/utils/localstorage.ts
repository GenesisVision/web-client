import { Nullable } from "./types";

export const loadData = (key: string): Nullable<{ [keys: string]: any }> => {
  try {
    const serializedSettings = localStorage.getItem(key);
    return JSON.parse(serializedSettings || "");
  } catch (e) {
    return null;
  }
};

export const saveData = (key: string, settings: object): void => {
  try {
    const serializedSettings = JSON.stringify(settings);
    localStorage.setItem(key, serializedSettings);
  } catch (e) {}
};
