import { ProgramWithdrawInfo } from "gv-api-web";
import {
  FETCH_WITHDRAW_PROGRAM_INFO,
  WITHDRAW_SUBMIT_BY_ID
} from "modules/program-withdraw/program-withdraw-constants";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

const programWithdrawReducer = apiReducerFactory<ProgramWithdrawInfo>({
  apiType: FETCH_WITHDRAW_PROGRAM_INFO
});

const withdrawSubmitReducer = apiReducerFactory<any>({
  apiType: WITHDRAW_SUBMIT_BY_ID
});

export type IProgramWithdrawState = Readonly<{
  info: IApiState<ProgramWithdrawInfo>;
  submit: IApiState<any>;
}>;

export default combineReducers<IProgramWithdrawState>({
  info: programWithdrawReducer,
  submit: withdrawSubmitReducer
});
