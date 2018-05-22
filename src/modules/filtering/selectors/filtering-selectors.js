import { createSelector } from "reselect";

const filteringSelector = state => state.filtering;
export const normalizeFilteringSelector = createSelector(
  filteringSelector,
  filtering => {
    const { filters, defaultFilters } = filtering;
    const normalizedFilters = filters.reduce((prev, curr) => {
      prev[curr.name] = curr.value;
      return prev;
    }, {});

    const normalizedDefaultFilters = defaultFilters.reduce((prev, curr) => {
      prev[curr.name] = curr.value;
      return prev;
    }, {});

    return {
      filters: normalizedFilters,
      defaultFilters: normalizedDefaultFilters
    };
  }
);
