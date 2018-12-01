import { composeFiltersActionType } from "../reducers/table-filters.reducer";

export const updateFilters = (filters, actionType) => {
  const filterActionType = composeFiltersActionType(actionType);
  return {
    type: filterActionType,
    filters
  };
};
