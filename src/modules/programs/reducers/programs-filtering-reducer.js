import { PLATFORM_SETTINGS } from "../../../actions/platform-actions";
import { SUCCESS_SUFFIX } from "../../../shared/reducers/api-reducer/api-reducer";
import filteringReducerFactory from "../../filtering/reducers/filtering-reducers";
import { normalizeFilteringSelector } from "../../filtering/selectors/filtering-selectors";
import { PROGRAMS } from "../actions/programs-actions";
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

const constructDefaultFilterReducer = (state, action) => {
  switch (action.type) {
    case `${PLATFORM_SETTINGS}_${SUCCESS_SUFFIX}`: {
      const defaultFilterNames = Object.keys(MAP_DEFAULT_FILTERS_FROM_SERVER);
      let defaultFilters = state.defaultFilters;
      defaultFilterNames.forEach(x => {
        const mappedFilter = MAP_DEFAULT_FILTERS_FROM_SERVER[x];
        const filter = defaultFilters.find(f => f.name === mappedFilter.name);

        const value = JSON.parse(JSON.stringify(filter.value));
        const newValue = mappedFilter.variableName
          ? ((value[mappedFilter.variableName] = action.payload[x]), value)
          : action.payload[x];

        defaultFilters = defaultFilters.map(df => {
          if (df.name === filter.name)
            return {
              ...filter,
              value: newValue
            };
          return df;
        });
      });

      return {
        ...state,
        defaultFilters: defaultFilters
      };
    }
    default:
      return state;
  }
};

const programsFilteringReducer = filteringReducerFactory({
  type: PROGRAMS,
  filters: {
    defaultFilters: PROGRAMS_DEFAULT_FILTERS
  },
  updateReducer: updateFilterReducer,
  childReducer: constructDefaultFilterReducer
});

export default programsFilteringReducer;
