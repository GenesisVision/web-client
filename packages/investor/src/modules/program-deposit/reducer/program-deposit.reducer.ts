import { ProgramInvestInfo } from "gv-api-web";
import {
  FETCH_DEPOSIT_PROGRAM_INFO,
  INVEST_TO_PROGRAM_BY_ID
} from "modules/program-deposit/program-deposit.constants";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

const programDepositReducer = apiReducerFactory<ProgramInvestInfo>({
  apiType: FETCH_DEPOSIT_PROGRAM_INFO
});

const investSubmitReducer = apiReducerFactory<any>({
  apiType: INVEST_TO_PROGRAM_BY_ID
});

export interface IProgramsDepositReducer {
  info: IApiReducerFactory<ProgramInvestInfo>;
  submit: IApiReducerFactory<any>;
}

export default combineReducers<IProgramsDepositReducer>({
  info: programDepositReducer,
  submit: investSubmitReducer
});
