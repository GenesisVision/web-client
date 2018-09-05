import { composeClearDataActionType } from "../../../shared/actions/clear-data.factory";
import { composeFilteringActionType } from "../helpers/filtering-helpers";

const filteringReducerFactory = ({ type, filters }) => {
  const filteringActionType = composeFilteringActionType(type);
  const clearDataActionType = composeClearDataActionType(filteringActionType);
  const initialState = filters;
  return (state = initialState, action) => {
    switch (action.type) {
      case filteringActionType: {
        const { name, value } = action.payload;
        const existingFilterValue = state[name];
        if (JSON.stringify(existingFilterValue !== JSON.stringify(value))) {
          return {
            ...state,
            ...{ [name]: value }
          };
        }

        return state;
      }
      case clearDataActionType:
        return initialState;
      default:
        return state;
    }
  };
};

export default filteringReducerFactory;
