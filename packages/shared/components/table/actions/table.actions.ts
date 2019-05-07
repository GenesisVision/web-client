import { ComposeFiltersType } from "../components/filtering/filter.type";
import { composeFiltersActionType } from "../reducers/table-filters.reducer";

export const updateFilters = (filters: ComposeFiltersType, actionType: string) => {
  const filterActionType = composeFiltersActionType(actionType);
  return {
    type: filterActionType,
    filters
  };
};
