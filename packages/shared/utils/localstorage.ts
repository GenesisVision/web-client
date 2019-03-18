export const loadData = <T>(key: string): T | undefined => {
  try {
    const serializedSettings = localStorage.getItem(key);
    return JSON.parse(serializedSettings || "");
  } catch (e) {
    return undefined;
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
