import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import {
  PROGRAM_WITHDRAW,
  PROGRAM_WITHDRAW_SUBMIT
} from "../actions/program-withdraw-actions.constants";

const programWithdrawReducer = combineReducers({
  requestData: apiReducerFactory({ apiType: PROGRAM_WITHDRAW }),
  submitData: apiReducerFactory({ apiType: PROGRAM_WITHDRAW_SUBMIT })
});
export default programWithdrawReducer;
