import { LOCATION_CHANGE } from "connected-react-router";
import { Reducer } from "redux";
import { ActionType } from "shared/utils/types";

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
