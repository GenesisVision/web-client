export const loadData = <T>(key: string): T | undefined => {
  try {
    const item = localStorage.getItem(key);
    const data = item ? JSON.parse(item) : null;
    return key in data ? data[key] : data;
  } catch (e) {
    return undefined;
  }
};

export const saveData = (
  key: string,
  value: object | string | number
): void => {
  try {
    const serializedValue = JSON.stringify(
      typeof value === "object" ? value : { [key]: value }
    );
    localStorage.setItem(key, serializedValue);
  } catch (e) {}
};
