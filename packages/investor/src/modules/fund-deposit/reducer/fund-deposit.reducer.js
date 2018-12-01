import {
  FETCH_DEPOSIT_FUND_INFO,
  INVEST_TO_FUND_BY_ID
} from "modules/fund-deposit/fund-deposit.constants";
import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";
const fundDepositReducer = apiReducerFactory({
  apiType: FETCH_DEPOSIT_FUND_INFO
});
const investFundSumbitReducer = apiReducerFactory({
  apiType: INVEST_TO_FUND_BY_ID
});

export default combineReducers({
  info: fundDepositReducer,
  submit: investFundSumbitReducer
});
