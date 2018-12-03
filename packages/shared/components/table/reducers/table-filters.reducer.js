const FILTER_ACTION_SUFFIX = "FILTER";
export const composeFiltersActionType = (
  actionType,
  suffix = FILTER_ACTION_SUFFIX
) => `${actionType}_${suffix}`;

const tableFiltersReducer = ({ type, filters = {} }) => {
  const initialState = { ...filters };
  const filterActionType = composeFiltersActionType(type);
  return (state = initialState, action) => {
    switch (action.type) {
      case filterActionType: {
        return { ...state, ...action.filters };
      }

      default:
        return state;
    }
  };
};

export default tableFiltersReducer;
