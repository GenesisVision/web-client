import { ProgramWithdrawInfo } from "gv-api-web";
import {
  FETCH_WITHDRAW_PROGRAM_INFO,
  WITHDRAW_SUBMIT_BY_ID
} from "modules/program-withdraw/program-withdraw-constants";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";
import { DeepReadonly } from "utility-types";

const programWithdrawReducer = apiReducerFactory<ProgramWithdrawInfo>({
  apiType: FETCH_WITHDRAW_PROGRAM_INFO
});

const withdrawSubmitReducer = apiReducerFactory<any>({
  apiType: WITHDRAW_SUBMIT_BY_ID
});

export type IProgramWithdrawState = DeepReadonly<{
  info: IApiReducerFactory<ProgramWithdrawInfo>;
  submit: IApiReducerFactory<any>;
}>;

export default combineReducers<IProgramWithdrawState>({
  info: programWithdrawReducer,
  submit: withdrawSubmitReducer
});
