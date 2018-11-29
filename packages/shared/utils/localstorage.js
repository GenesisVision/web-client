export const getItem = key => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

export const loadData = key => {
  try {
    const serializedSettings = localStorage.getItem(key);
    return JSON.parse(serializedSettings);
  } catch (e) {
    return null;
  }
};

export const saveData = (key, settings) => {
  try {
    const serializedSettings = JSON.stringify(settings);
    localStorage.setItem(key, serializedSettings);
  } catch (e) {}
};
