import { ActionType } from "utils/types";

import { SET_FUND_ID } from "./fund-details.constants";
import { FundIdState } from "./reducers/id.reducer";

export interface SetFundIdAction extends ActionType<FundIdState> {
  type: typeof SET_FUND_ID;
}
