import { composeClearDataActionType } from "shared/actions/clear-data.factory";
import { merge as mergeFunc } from "shared/utils/helpers";
import { ActionType } from "shared/utils/types";

const defaultReducer = <T extends ActionType<U>, U>(
  action: T,
  state: U,
  initialState: U,
  type: string,
  merge?: boolean
): U => {
  switch (action.type) {
    case type:
      // @ts-ignore
      if (merge) return mergeFunc(state, action.payload); // TODO how?
      return action.payload;
    case composeClearDataActionType(type):
      return initialState;
    default:
      return state;
  }
};

export default defaultReducer;
