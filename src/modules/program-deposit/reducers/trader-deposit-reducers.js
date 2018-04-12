import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import {
  PROGRAM_DEPOSIT,
  PROGRAM_DEPOSIT_SUBMIT
} from "../actions/program-deposit-actions.constants";

const programDepositReducer = combineReducers({
  requestData: apiReducerFactory({ apiType: PROGRAM_DEPOSIT }),
  submitData: apiReducerFactory({ apiType: PROGRAM_DEPOSIT_SUBMIT })
});
export default programDepositReducer;
