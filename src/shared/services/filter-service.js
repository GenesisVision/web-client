export const composeFilter = (queryParams, defaultParams) => {
  const defaults = {};
  Object.keys(defaultParams).forEach(x => {
    defaults[x] = queryParams[x] || defaultParams[x];
  });

  return defaults;
};

export const filterCompare = (filter1, filter2) => {
  return JSON.stringify(filter1) === JSON.stringify(filter2);
};
