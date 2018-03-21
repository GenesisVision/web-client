import { composeFilteringActionType } from "../helpers/filtering-helpers";

const filteringReducerFactory = ({ type, filters }) => {
  const filteringActionType = composeFilteringActionType(type);
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
      default:
        return state;
    }
  };
};

export default filteringReducerFactory;
