import { composeFilteringActionType } from "../helpers/filtering-helpers";
import { composeClearDataActionType } from "../../../shared/actions/clear-data.factory";

export const dafaultState = {
  filters: [],
  defaultFilters: []
};

const filteringReducerFactory = ({
  type,
  filters,
  updateReducer,
  childReducer
}) => {
  const filteringActionType = composeFilteringActionType(type);
  const clearDataActionType = composeClearDataActionType(filteringActionType);
  const initialState = {
    ...dafaultState,
    ...filters
  };
  return (state = initialState, action) => {
    switch (action.type) {
      case filteringActionType: {
        if (updateReducer) {
          return updateReducer(state, action);
        }

        if (state.filters.some(x => x.name === action.payload.name)) {
          return {
            ...state,
            filters: state.filters.map(x => {
              if (x.name === action.payload.name) {
                return action.payload;
              }

              return x;
            })
          };
        }

        return {
          ...state,
          filters: [...state.filters, action.payload]
        };
      }
      case clearDataActionType:
        return initialState;
      default:
        if (childReducer) {
          return childReducer(state, action);
        }
        return state;
    }
  };
};

export default filteringReducerFactory;
