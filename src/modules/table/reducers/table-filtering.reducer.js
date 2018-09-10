const defaultState = {};

const tableFilteringReducer = ({ type, filters = {} }) => {
  const initialState = { ...defaultState, ...filters };
  return (state = initialState, action) => {
    switch (action.type) {
      case type: {
        return updateFilter(state, action.payload);
      }

      default:
        return state;
    }
  };
};

export const updateFilter = (oldFilters, newFilter) => {
  const { name, value } = newFilter;
  const existingFilterValue = oldFilters[name];
  if (JSON.stringify(existingFilterValue !== JSON.stringify(value))) {
    return {
      ...oldFilters,
      ...{ [name]: value }
    };
  }

  return oldFilters;
};

export default tableFilteringReducer;
