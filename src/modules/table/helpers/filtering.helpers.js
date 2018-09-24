export const RANGE_FILTER_TYPE = "RANGE_FILTER_TYPE";
export const GENERAL_FILTER_TYPE = "GENERAL_FILTER_TYPE";

export const FilterType = {
  general: "general",
  range: "range",
  custom: "custom"
};

export const composeFilteringActionType = actionType =>
  `${actionType}_FILTERING`;

export const composeFilters = (allFilters, filtering) => {
  if (!allFilters) return {};
  const composedFilters = allFilters.reduce((accum, cur) => {
    const { name, type, composeRequestValue } = cur;
    const processedFilterValue = processFilterValue({
      name,
      type,
      composeRequestValue,
      value: filtering[name]
    });
    if (processedFilterValue !== undefined) {
      accum = { ...accum, ...processedFilterValue };
    }

    return accum;
  }, {});
  return composedFilters;
};

const processFilterValue = filter => {
  let requestValue = undefined;
  switch (filter.type) {
    case FilterType.range:
      if (filter.value !== undefined) {
        requestValue = {
          [`${filter.name}Min`]: filter.value[0],
          [`${filter.name}Max`]: filter.value[1]
        };
      }
      break;
    case FilterType.custom:
      const requestValues = filter.composeRequestValue(filter.value);
      if (requestValues !== undefined) {
        requestValue = { ...requestValues };
      }
      break;
    case FilterType.general:
      requestValue = { [filter.name]: filter.value };
      break;
    default:
      if (filter.value !== undefined) {
        requestValue = filter.value;
      }
  }
  return requestValue;
};
