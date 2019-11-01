import { ProgramWithdrawInfoOld } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";

import {
  FETCH_WITHDRAW_PROGRAM_INFO,
  WITHDRAW_SUBMIT_BY_ID
} from "../program-withdraw.constants";

const programWithdrawReducer = apiReducerFactory<ProgramWithdrawInfoOld>({
  apiType: FETCH_WITHDRAW_PROGRAM_INFO
});

const withdrawSubmitReducer = apiReducerFactory<any>({
  apiType: WITHDRAW_SUBMIT_BY_ID
});

export type IProgramWithdrawState = Readonly<{
  info: IApiState<ProgramWithdrawInfoOld>;
  submit: IApiState<any>;
}>;

export default combineReducers<IProgramWithdrawState>({
  info: programWithdrawReducer,
  submit: withdrawSubmitReducer
});
