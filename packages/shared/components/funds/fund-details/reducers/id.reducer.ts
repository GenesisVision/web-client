import defaultReducer from "shared/reducers/reducer-creators/default-reducer";

import { SET_FUND_ID, SetFundIdAction } from "../actions/fund-details.actions";

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
