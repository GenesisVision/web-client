import defaultReducer from "reducers/reducer-creators/default-reducer";

import { SET_ACCOUNT_ID } from "../account-details.constants";
import { SetAccountIdAction } from "../actions/account-details.actions";

export type AccountIdState = string;

const initialState = "";

const accountIdReducer = (
  state: AccountIdState = initialState,
  action: SetAccountIdAction
): string =>
  defaultReducer<SetAccountIdAction, string>(
    action,
    state,
    initialState,
    SET_ACCOUNT_ID
  );

export default accountIdReducer;
