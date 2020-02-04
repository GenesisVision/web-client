import defaultReducer from "reducers/reducer-creators/default-reducer";

import { SET_FUND_ID } from "../fund-details.constants";
import { SetFundIdAction } from "../fund-details.types";

export type FundIdState = string;

const initialState = "";
const fundIdReducer = (
  state: FundIdState = initialState,
  action: SetFundIdAction
): string =>
  defaultReducer<SetFundIdAction, string>(
    action,
    state,
    initialState,
    SET_FUND_ID
  );

export default fundIdReducer;
