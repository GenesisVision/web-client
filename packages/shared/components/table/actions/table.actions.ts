import { composeFiltersActionType } from "../reducers/table-filters.reducer";

export const updateFilters = (filters: Object, actionType: string) => {
  const filterActionType = composeFiltersActionType(actionType);
  return {
    type: filterActionType,
    filters
  };
};
