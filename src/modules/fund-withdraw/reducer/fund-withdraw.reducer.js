import {
  FETCH_WITHDRAW_FUND_INFO,
  WITHDRAW_SUBMIT_BY_ID
} from "modules/fund-withdraw/fund-withdraw-constants";
import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

const fundWithdrawReducer = apiReducerFactory({
  apiType: FETCH_WITHDRAW_FUND_INFO
});
const withdrawSumbitReducer = apiReducerFactory({
  apiType: WITHDRAW_SUBMIT_BY_ID
});

export default combineReducers({
  info: fundWithdrawReducer,
  submit: withdrawSumbitReducer
});
