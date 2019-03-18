import { ProgramInvestInfo } from "gv-api-web";
import {
  FETCH_DEPOSIT_PROGRAM_INFO,
  INVEST_TO_PROGRAM_BY_ID
} from "modules/program-deposit/program-deposit.constants";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";
import { DeepReadonly } from "utility-types";

const programDepositReducer = apiReducerFactory<ProgramInvestInfo>({
  apiType: FETCH_DEPOSIT_PROGRAM_INFO
});

const investSubmitReducer = apiReducerFactory<any>({
  apiType: INVEST_TO_PROGRAM_BY_ID
});

export type ProgramsDepositState = DeepReadonly<{
  info: IApiState<ProgramInvestInfo>;
  submit: IApiState<any>;
}>;

export default combineReducers<ProgramsDepositState>({
  info: programDepositReducer,
  submit: investSubmitReducer
});
