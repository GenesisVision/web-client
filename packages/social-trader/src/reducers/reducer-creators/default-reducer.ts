import { composeClearDataActionType } from "actions/clear-data.factory";
import { merge as mergeFunc } from "utils/helpers";
import { ActionType } from "utils/types";

const defaultReducer = <T extends ActionType<U>, U>(
  action: T,
  state: U,
  initialState: U,
  type: string,
  merge?: boolean
): U => {
  switch (action.type) {
    case type:
      // @ts-ignore TODO correct types
      if (merge) return mergeFunc<U>(state, action.payload) as U;
      // @ts-ignore TODO correct types
      return action.payload;
    case composeClearDataActionType(type):
      return initialState;
    default:
      return state;
  }
};

export default defaultReducer;
