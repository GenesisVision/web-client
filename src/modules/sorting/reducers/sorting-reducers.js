import { composeSortingActionType } from "../helpers/sorting-helpers";
import { composeClearDataActionType } from "../../../shared/actions/clear-data.factory";

export const dafaultState = {
  value: "",
  defaultValue: ""
};

const sortingReducerFactory = ({ type, sorting, childReducer }) => {
  const sortingActionType = composeSortingActionType(type);
  const clearDataActionType = composeClearDataActionType(sortingActionType);
  const initialState = {
    ...dafaultState,
    ...sorting
  };
  return (state = initialState, action) => {
    switch (action.type) {
      case sortingActionType: {
        return {
          ...state,
          value: action.payload
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

export default sortingReducerFactory;
