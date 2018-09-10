export const loadData = key => {
  try {
    const serializedSettings = localStorage.getItem(key);
    if (serializedSettings === null) {
      return undefined;
    }
    return JSON.parse(serializedSettings);
  } catch (e) {
    return undefined;
  }
};

export const saveData = (key, settings) => {
  try {
    const serializedSettings = JSON.stringify(settings);
    localStorage.setItem(key, serializedSettings);
  } catch (e) {}
};
