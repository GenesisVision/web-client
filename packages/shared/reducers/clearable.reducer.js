import { LOCATION_CHANGE } from "connected-react-router";

const clearableReducer = (reducer, clearActionType = LOCATION_CHANGE) => (
  state,
  action
) => {
  if (action.type === clearActionType) {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

export default clearableReducer;
