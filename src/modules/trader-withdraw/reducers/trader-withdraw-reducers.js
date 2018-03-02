import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import {
  TRADER_WITHDRAW,
  TRADER_WITHDRAW_SUBMIT
} from "../actions/trader-withdraw-actions.constants";

const traderWithdrawReducer = combineReducers({
  traderWithdraw: apiReducerFactory({ apiType: TRADER_WITHDRAW }),
  traderWithdrawSubmit: apiReducerFactory({ apiType: TRADER_WITHDRAW_SUBMIT })
});
export default traderWithdrawReducer;
