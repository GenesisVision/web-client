import { LOCATION_CHANGE } from "connected-react-router";
import { AnyAction, Reducer } from "redux";

const clearableReducer = <S = {}>(
  reducer: Reducer,
  clearActionType: string = LOCATION_CHANGE
): Reducer => (state: S, action: AnyAction) => {
  if (action.type === clearActionType) {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

export default clearableReducer;
