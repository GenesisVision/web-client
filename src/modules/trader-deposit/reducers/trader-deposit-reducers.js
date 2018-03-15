import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import {
  TRADER_DEPOSIT,
  TRADER_DEPOSIT_SUBMIT
} from "../actions/trader-deposit-actions.constants";

const traderDepositReducer = combineReducers({
  requestData: apiReducerFactory({ apiType: TRADER_DEPOSIT }),
  submitData: apiReducerFactory({ apiType: TRADER_DEPOSIT_SUBMIT })
});
export default traderDepositReducer;
