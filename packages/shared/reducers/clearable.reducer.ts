import { Reducer } from "redux";
import { ActionType } from "shared/utils/types";

const LOCATION_CHANGE = "LOCATION_CHANGE"; //TODO

const clearableReducer = <S = {}>(
  reducer: Reducer<any, ActionType>,
  clearActionType: string = LOCATION_CHANGE
): Reducer<any, ActionType> => (state: S, action: ActionType) => {
  if (action.type === clearActionType) {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

export default clearableReducer;
