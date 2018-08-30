import { composeClearDataActionType } from "../../../shared/actions/clear-data.factory";
import { composeSortingActionType } from "../helpers/sorting-helpers";

export const dafaultState = "";

const sortingReducerFactory = ({
  type,
  sorting = dafaultState,
  childReducer
}) => {
  const sortingActionType = composeSortingActionType(type);
  const clearDataActionType = composeClearDataActionType(sortingActionType);
  const initialState = sorting;
  return (state = initialState, action) => {
    switch (action.type) {
      case sortingActionType: {
        return action.payload;
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
