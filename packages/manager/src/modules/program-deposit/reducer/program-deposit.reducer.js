import {
  FETCH_DEPOSIT_PROGRAM_INFO,
  INVEST_TO_PROGRAM_BY_ID
} from "modules/program-deposit/program-deposit.constants";
import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";
const programDepositReducer = apiReducerFactory({
  apiType: FETCH_DEPOSIT_PROGRAM_INFO
});
const investSumbitReducer = apiReducerFactory({
  apiType: INVEST_TO_PROGRAM_BY_ID
});

export default combineReducers({
  info: programDepositReducer,
  submit: investSumbitReducer
});
