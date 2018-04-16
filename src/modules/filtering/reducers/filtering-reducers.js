import { composeFilteringActionType } from "../helpers/filtering-helpers";
import { composeClearDataActionType } from "../../../shared/actions/clear-data.factory";

const filteringReducerFactory = ({ type, filters }) => {
  const filteringActionType = composeFilteringActionType(type);
  const clearDataActionType = composeClearDataActionType(filteringActionType);
  const initialState = {
    ...filters
  };
  return (state = initialState, action) => {
    switch (action.type) {
      case filteringActionType:
        return {
          ...state,
          ...action.filtering
        };
      case clearDataActionType:
        return initialState;
      default:
        return state;
    }
  };
};

export default filteringReducerFactory;
