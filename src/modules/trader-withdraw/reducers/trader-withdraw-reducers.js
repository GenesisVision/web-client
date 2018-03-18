import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import {
  TRADER_WITHDRAW,
  TRADER_WITHDRAW_SUBMIT
} from "../actions/trader-withdraw-actions.constants";

const traderWithdrawReducer = combineReducers({
  requestData: apiReducerFactory({ apiType: TRADER_WITHDRAW }),
  submitData: apiReducerFactory({ apiType: TRADER_WITHDRAW_SUBMIT })
});
export default traderWithdrawReducer;
