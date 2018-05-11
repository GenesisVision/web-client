import { GENERAL_FILTER_TYPE, RANGE_FILTER_TYPE } from "../filtering.constants";

export const composeFilteringActionType = actionType =>
  `${actionType}_FILTERING`;

export const composeFormikFiltering = (filterType, filterName, filtering) => {
  const { filters, defaultFilters } = filtering;
  switch (filterType) {
    case RANGE_FILTER_TYPE:
      return {
        min:
          (filters[filterName] && filters[filterName].min) ||
          defaultFilters[filterName].min,
        max:
          (filters[filterName] && filters[filterName].max) ||
          defaultFilters[filterName].max
      };
    case GENERAL_FILTER_TYPE:
    default:
      return filters[filterName] || defaultFilters[filterName];
  }
};

export const composeApiFiltering = filtering => {
  return filtering.filters.reduce((prev, curr) => {
    prev[curr.name] = curr.value;
    return prev;
  }, {});
};
