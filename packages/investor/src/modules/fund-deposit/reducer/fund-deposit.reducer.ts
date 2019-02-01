import { FundInvestInfo } from "gv-api-web";
import {
  FETCH_DEPOSIT_FUND_INFO,
  INVEST_TO_FUND_BY_ID
} from "modules/fund-deposit/fund-deposit.constants";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";
import { DeepReadonly } from "utility-types";

const depositInfo = apiReducerFactory<FundInvestInfo>({
  apiType: FETCH_DEPOSIT_FUND_INFO
});
const investFundSubmitReducer = apiReducerFactory<any>({
  apiType: INVEST_TO_FUND_BY_ID
});

export type FundDepositState = DeepReadonly<{
  info: IApiReducerFactory<FundInvestInfo>;
  submit: IApiReducerFactory<any>;
}>;

const fundDepositReducer = combineReducers<FundDepositState>({
  info: depositInfo,
  submit: investFundSubmitReducer
});

export default fundDepositReducer;
