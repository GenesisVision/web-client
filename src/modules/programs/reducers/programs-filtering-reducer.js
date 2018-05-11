import { normalizeFilteringSelector } from "../../filtering/selectors/filtering-selectors";
import filteringReducerFactory from "../../filtering/reducers/filtering-reducers";

import { PROGRAMS } from "../actions/programs-actions.constants";
import { PROGRAMS_DEFAULT_FILTERS } from "../programs.constants";

const updateFilter = (state, filter) => {
  if (state.filters.some(x => x.name === filter.name)) {
    return {
      ...state,
      filters: state.filters.map(x => {
        if (x.name === filter.name) {
          return filter;
        }
        return x;
      })
    };
  }
  return {
    ...state,
    filters: [...state.filters, filter]
  };
};

const removeFilter = (state, filter) => {
  return {
    ...state,
    filters: state.filters.filter(x => x.name !== filter.name)
  };
};

const updateFilterReducer = (state, action) => {
  const newFilter = action.payload;
  const filtering = normalizeFilteringSelector({ filtering: state });

  const newFilterJson = JSON.stringify(newFilter.value);
  const defaulFilterJson = JSON.stringify(
    filtering.defaultFilters[newFilter.name]
  );
  if (newFilterJson === defaulFilterJson) {
    return removeFilter(state, newFilter);
  }
  return updateFilter(state, newFilter);
};

const programsFilteringReducer = filteringReducerFactory({
  type: PROGRAMS,
  filters: {
    defaultFilters: PROGRAMS_DEFAULT_FILTERS
  },
  updateFilterReducer
});

export default programsFilteringReducer;
