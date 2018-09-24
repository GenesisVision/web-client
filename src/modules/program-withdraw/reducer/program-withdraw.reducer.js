import {
  FETCH_WITHDRAW_PROGRAM_INFO,
  WITHDRAW_SUBMIT_BY_ID
} from "modules/program-withdraw/program-withdraw-constants";
import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

const programWithdrawReducer = apiReducerFactory({
  apiType: FETCH_WITHDRAW_PROGRAM_INFO
});
const withdrawSumbitReducer = apiReducerFactory({
  apiType: WITHDRAW_SUBMIT_BY_ID
});

export default combineReducers({
  info: programWithdrawReducer,
  submit: withdrawSumbitReducer
});
